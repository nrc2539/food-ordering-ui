"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spin } from "antd";

import { RoleType } from "@/models/user/RoleType";
import { useAlertMessage } from "@/hooks/useAlertMessage";
import { useAuthentication } from "@/providers/AuthenticationProvider";

import { FeatureEnum, RolePermissionGuardProps } from "./interface";

export const permissions = {
  admin: [
    FeatureEnum.ORDERS,
    FeatureEnum.TABLES,
    FeatureEnum.STAFF,
    FeatureEnum.CATEGORIES,
    FeatureEnum.MENUS,
  ],
  staff: [FeatureEnum.ORDERS, FeatureEnum.TABLES],
};

const excludePaths = {
  admin: [],
  staff: ["/management/orders/histories"],
};

function RolePermissionGuard({ children }: RolePermissionGuardProps) {
  const { user } = useAuthentication();
  const router = useRouter();
  const pathname = usePathname();
  const alertMessage = useAlertMessage();

  function hasPermission(role: RoleType) {
    const roleKey = role.name as "admin" | "staff";
    const userPermissions = permissions[roleKey];
    const userExcludePaths = excludePaths[roleKey];

    // Extract feature from pathname (e.g., /management/orders/* -> orders)
    const pathSegments = pathname.split("/").filter(Boolean);
    const managementIndex = pathSegments.indexOf("management"); // should be 0

    if (managementIndex === -1 || managementIndex + 1 >= pathSegments.length) {
      return false;
    }

    // Get the feature from the path (e.g., orders, tables, staff, categories, menus)
    const featureFromPath = pathSegments[managementIndex + 1];

    // Check if the feature from pathname is in user's permissions
    return (
      userPermissions.some((feature) => feature === featureFromPath) &&
      !userExcludePaths.some((path) => path === pathname)
    );
  }

  useEffect(() => {
    if (user && !hasPermission(user.role)) {
      alertMessage.error({ message: "You have no permission on this page." });
      setTimeout(() => {
        router.replace("/management/orders");
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user && hasPermission(user.role)) {
    return <>{children}</>;
  }

  return (
    <>
      <Spin description="Checking permission..." size="large">
        <div className="w-dvw h-dvh" />
      </Spin>
    </>
  );
}

export default RolePermissionGuard;
