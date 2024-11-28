"use client";

import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { NavLinks } from "./NavLinks";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-3"
        >
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Wemace Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="brand-text gradient-text text-lg tracking-widest">
              WeMace
            </span>
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLinks />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-4"
        >
          <ThemeToggle />
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" className="h-9 px-4 tracking-wider brand-text">
              Login
            </Button>
            <Button className="h-9 px-4 tracking-wider brand-text bg-gradient-to-r from-[#8A2BE2] via-[#FF1493] to-[#FF8C00] text-white hover:opacity-90">
              Sign Up
            </Button>
          </div>
          <MobileNav />
        </motion.div>
      </div>
    </motion.header>
  );
}