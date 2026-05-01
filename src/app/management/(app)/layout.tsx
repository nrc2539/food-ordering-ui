import AuthenGuard from "@/components/guards/AuthenGuard";
import RolePermissionGuard from "@/components/guards/RolePermissionGuard";
import NavBar from "@/components/layouts/NavBar";
import SidebarMenu from "@/components/layouts/SidebarMenu";

import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthenGuard>
      <RolePermissionGuard>
        <main className="flex items-start w-full h-dvh bg-white">
          <SidebarMenu className="w-full max-w-xs" />
          <section className="w-full h-full">
            <NavBar className="h-16" />
            <div className="p-4 tablet:p-5 h-[calc(100dvh-64px)] w-full bg-[#fbfbfb]">
              {children}
            </div>
          </section>
        </main>
      </RolePermissionGuard>
    </AuthenGuard>
  );
}
