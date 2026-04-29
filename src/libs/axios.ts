import axios, { AxiosError } from "axios";
import { API_URL } from "./constant";
import { cookies } from "next/headers";
import { refreshToken } from "@/actions/auth-actions";

type AxiosErrorType = AxiosError<{ code: number; message: string }>;

const api = axios.create({ baseURL: API_URL });

let isRefreshingToken = false;

api.interceptors.request.use(async (config) => {
  const token = (await cookies()).get("accessToken")?.value;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosErrorType) => {
    const originalRequest = error.config;
    const cookieStore = await cookies();
    if (!error.isAxiosError) {
      return Promise.reject(error);
    }
    if (!isAccessTokenExpired(error)) {
      return Promise.reject(error);
    }
    if (!isRefreshingToken) {
      // If not in refreshing state, then call API to refresh token
      isRefreshingToken = true;

      try {
        const res = await refreshToken();
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          res;

        // Update cookie with new access token and refresh token
        cookieStore.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
        cookieStore.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });

        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest); // Retry original request
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      } finally {
        isRefreshingToken = false;
      }
    }
    return Promise.reject(error);
  },
);

function isAccessTokenExpired(error: AxiosErrorType) {
  return (
    error.config &&
    error.config.url !== `/auth/refresh-token` &&
    error.response &&
    error.response.status === 401 &&
    error.response.data.message === "Unauthorized"
  );
}

export default api;
