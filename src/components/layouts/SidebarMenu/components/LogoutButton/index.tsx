"use client";

import { Button } from "antd";

import { cn } from "@/libs/utils";
import { LogoutButtonProps } from "./interface";
import { useAuthentication } from "@/providers/AuthenticationProvider";

function LogoutButton({ className, children }: LogoutButtonProps) {
  const { logout } = useAuthentication();
  return (
    <Button
      htmlType="button"
      size="large"
      className={cn(
        "text-base text-gray-700 font-medium hover:border-red-500 hover:text-red-500",
        className,
      )}
      title="Logout"
      onClick={logout}
    >
      {children}
    </Button>
  );
}

export default LogoutButton;
