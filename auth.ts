import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

import { db } from "./lib/db"

import { UserRole } from "@prisma/client"

import { getuserById } from "@/data/user";
 
export const { auth, handlers: {GET, POST}, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    // async signIn({user}){
    //   if (!user.id) return false;
    //   const exsistingUser = await getuserById(user.id);
    //   if (!exsistingUser || !exsistingUser.emailVerified) return false;
    //   return true;
    // },
    async session({ session, token }) {
      console.log({token });
      if ( token.sub && session.user ) {  
        session.user.id = token.sub;
      }

      if (token.role && session.user) { 
        session.user.role = token.role as UserRole;
      } 

      return session;
    },
    async jwt({ token}) {
      if (!token.sub) return token;

      const exsistingUser = await getuserById(token.sub);
      if (!exsistingUser) {
        return token;
      }

      token.role = exsistingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
})