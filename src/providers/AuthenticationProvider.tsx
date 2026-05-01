"use client";

import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useCallback } from "react";

import { UserType } from "@/models/user/UserType";
import { logout } from "@/libs/actions/auth-actions";

interface AuthenticationContextType {
  user?: UserType;
  isAuthenticated: boolean;
  isUserLoading: boolean;
  refetchProfile: () => void;
  logout: () => Promise<void>;
}

export const AuthenticationContext = createContext<AuthenticationContextType>(
  {} as AuthenticationContextType,
);

async function getProfile(): Promise<UserType> {
  const res = await axios.get("/api/profile");
  return res.data;
}

export function AuthenticationProvider({ children }: React.PropsWithChildren) {
  const queryClient = useQueryClient();

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-profile"],
    queryFn: getProfile,
  });

  async function clearUserData() {
    await logout();
    await queryClient.clear();
  }

  const refetchProfile = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    refetchProfile();
  }, [refetchProfile]);

  return (
    <AuthenticationContext.Provider
      value={{
        user: userData,
        isAuthenticated: !!userData,
        isUserLoading: isLoading,
        refetchProfile,
        logout: clearUserData,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
