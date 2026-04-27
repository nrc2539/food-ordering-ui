import NavBar from "@/components/layouts/NavBar";
import SidebarMenu from "@/components/layouts/SidebarMenu";

import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-start w-full h-dvh">
      <SidebarMenu className="w-full max-w-xs" />
      <section className="w-full h-full bg-red-200">
        <NavBar userName="Mock username" roleName="Admin" />
        {children}
      </section>
    </main>
  );
}
