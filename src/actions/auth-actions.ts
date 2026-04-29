"use server";

import axios from "axios";
import { cookies } from "next/headers";

import api from "@/libs/axios";
import { API_URL } from "@/libs/constant";
import { AuthenticationResponseType } from "@/models/authentication/AuthenticationResponseType";
import { LoginFormType } from "@/models/authentication/LoginFormType";
import { UserType } from "@/models/user/UserType";
import { redirect } from "next/navigation";

export async function login({
  email,
  password,
}: LoginFormType): Promise<AuthenticationResponseType> {
  const response = await api.post(`/auth/login`, {
    email,
    password,
  });
  const { accessToken, refreshToken } = response.data;

  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return { accessToken, refreshToken };
}

export async function refreshToken(): Promise<AuthenticationResponseType> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const responseRefresh = await axios.post(
    `${API_URL}/auth/refresh-token`,
    undefined,
    { headers: { Authorization: `Bearer ${refreshToken}` } },
  );
  return {
    accessToken: responseRefresh.data.accessToken,
    refreshToken: responseRefresh.data.refreshToken,
  };
}

export async function getMyProfile(): Promise<UserType> {
  const res = await api.get("/auth/profile");
  return res.data;
}

export async function logout() {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Logout from server failed", error);
  } finally {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    redirect("/management/login");
  }
}
