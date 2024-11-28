"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[240px] sm:w-[300px] p-0">
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col space-y-4 p-6"
            >
              <NavLinks />
              <div className="flex flex-col space-y-3 pt-4">
                <Button variant="ghost" className="w-full tracking-wider brand-text">
                  Login
                </Button>
                <Button className="w-full tracking-wider brand-text bg-gradient-to-r from-[#8A2BE2] via-[#FF1493] to-[#FF8C00] text-white hover:opacity-90">
                  Sign Up
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}