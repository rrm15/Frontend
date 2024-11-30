import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "../ui/button";
import Link from "next/link";

interface SideBarHeaderProps {
  heading: string;
  text?: string;
}

export function SideBarHeader({ heading, text }: SideBarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 mb-6">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-wide text-primary">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <ThemeToggle />
    </div>
  );
}
