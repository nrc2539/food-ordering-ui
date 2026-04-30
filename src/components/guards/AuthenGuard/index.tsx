"use client";

import { Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useAuthentication } from "@/providers/AuthenticationProvider";

function AuthenGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isUserLoading, isAuthenticated } = useAuthentication();

  useEffect(() => {
    if (!isAuthenticated && !isUserLoading) {
      router.replace("/management/login");
    }
  }, [router, isAuthenticated, isUserLoading]);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Spin description="Loading..." size="large">
      <div className="w-dvw h-dvh" />
    </Spin>
  );
}

export default AuthenGuard;
