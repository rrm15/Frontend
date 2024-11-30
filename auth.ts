import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

import { db } from "./lib/db"
 
export const { auth, handlers: {GET, POST}, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
})