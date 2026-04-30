"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useCallback } from "react";

import { UserType } from "@/models/user/UserType";
import { getProfile } from "@/actions/user-actions";
import { logout } from "@/actions/auth-actions";

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

export function AuthenticationProvider({ children }: React.PropsWithChildren) {
  const queryClient = useQueryClient();
  const router = useRouter();

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
    router.replace("/management/login");
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
