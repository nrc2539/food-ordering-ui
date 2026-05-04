"use client";

import { cn } from "@/libs/utils";
import { NavBarProps } from "./interface";
import { useAuthentication } from "@/providers/AuthenticationProvider";

function NavBar({ className }: NavBarProps) {
  const { user } = useAuthentication();
  return (
    <nav className={cn("bg-white", className)}>
      <div className="px-4 py-3 w-full h-full bg-orange-50/50 flex items-center justify-end">
        <div className="flex flex-col items-end">
          <div className="text-base font-medium text-gray-700">
            {user?.name}
          </div>
          <p className="text-xs font-normal text-gray-500 capitalize">
            {user?.role.name}
          </p>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
