"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spin } from "antd";

import { useAuthentication } from "@/providers/AuthenticationProvider";

function UnAuthenGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isUserLoading, isAuthenticated } = useAuthentication();

  useEffect(() => {
    if (isAuthenticated && !isUserLoading) {
      router.replace("/management/orders");
    }
  }, [isAuthenticated, isUserLoading, router]);

  if (!isAuthenticated && !isUserLoading) {
    return <>{children}</>;
  }

  return (
    <Spin description="Loading..." size="large">
      <div className="w-dvw h-dvh" />
    </Spin>
  );
}

export default UnAuthenGuard;
