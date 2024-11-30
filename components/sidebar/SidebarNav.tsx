"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Wallet,
  Vote,
  MessageSquare
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Members",
    href: "/dashboard/members",
    icon: Users,
  },
  {
    title: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    title: "Governance",
    href: "/dashboard/governance",
    icon: Vote,
  },
  {
    title: "Community",
    href: "/dashboard/community",
    icon: MessageSquare,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ 
      callbackUrl: "/auth/login" 
    });
  };

  return (
    <div className="relative">
      <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
        <div className="flex flex-col gap-2 p-4">
          {sidebarNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === item.href && "bg-primary/10 hover:bg-primary/20"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}