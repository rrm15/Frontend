import bcrypt from "bcryptjs";
import { getuserByEmail } from "@/data/user";

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import Credentials  from "next-auth/providers/credentials"

import { LoginSchema } from "@/schemas";
 
export default { providers: [
    Credentials({  
        async authorize(credentials, req) {
            const validatedFields = LoginSchema.safeParse(credentials);
            if (validatedFields.success) {
                const {email, password} = validatedFields.data;

                const user = await getuserByEmail(email);
                if (!user || !user.password) {  
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) { return user; }
            }

            return null;
            
        }
    })
] } satisfies NextAuthConfig