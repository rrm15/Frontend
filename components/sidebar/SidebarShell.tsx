"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarNav } from "./SidebarNav";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";

interface SidebarShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarShell({ children, className, ...props }: SidebarShellProps) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 border-r bg-background">
        <div className="flex flex-col w-full">
          <div className="h-16 border-b flex items-center px-6">
            <Image
              src="/logo.png"
              alt="Wemace Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="brand-text gradient-text text-lg tracking-widest ml-3">
              WeMace
            </span>
          </div>
          <SidebarNav />
        </div>
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transform transition-transform duration-200 ease-in-out md:hidden",
          showMobileSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 border-b flex items-center px-6">
            <Image
              src="/logo.png"
              alt="Wemace Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="brand-text gradient-text text-lg tracking-widest ml-3">
              WeMace
            </span>
          </div>
          <SidebarNav />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="h-16 border-b md:hidden flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6" {...props}>
            {children}
          </div>
        </div>
      </main>

      {/* Mobile sidebar overlay */}
      {showMobileSidebar && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}
    </div>
  );
}