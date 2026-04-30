"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/libs/utils";
import { permissions } from "@/components/guards/RolePermissionGuard";
import { useAuthentication } from "@/providers/AuthenticationProvider";

import { SidebarMenuItemProps } from "./interface";

function SidebarMenuItem({
  className,
  title,
  path,
  icon,
  feature,
}: SidebarMenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(path);
  const { user } = useAuthentication();
  return (
    <Link
      href={path}
      className={cn(
        "font-medium text-gray-700 px-4",
        {
          "text-orange-700 bg-amber-100 rounded-lg": isActive,
          "flex items-center space-x-2": !!icon,
          hidden:
            user &&
            !permissions[user.role.name as "admin" | "staff"].includes(feature),
        },
        className,
      )}
    >
      {icon}
      <p>{title}</p>
    </Link>
  );
}

export default SidebarMenuItem;
