import NavBar from "@/components/layouts/NavBar";
import SidebarMenu from "@/components/layouts/SidebarMenu";

import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-start w-full h-dvh">
      <SidebarMenu className="w-full max-w-xs" />
      <section className="w-full h-full">
        <NavBar className="h-16" userName="Mock username" roleName="Admin" />
        <div className="p-4 tablet:p-5 h-[calc(100dvh-64px)] w-full bg-[#fbfbfb]">
          {children}
        </div>
      </section>
    </main>
  );
}
