"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext } from "react";

import { UserType } from "@/models/user/UserType";
import { getProfile } from "@/actions/user-actions";

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

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-profile"],
    queryFn: getProfile,
  });

  async function clearUserData() {
    // TODO: call server action to clear cookies
    await queryClient.clear();
  }

  function refetchProfile() {
    refetch();
  }

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
