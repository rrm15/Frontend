"use server";

import { z } from "zod";
import { LoginSchema } from "@/schemas";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

type LoginSchemaType = z.infer<typeof LoginSchema>;

export const login = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid credentials",
    };
  }

  const { email, password } = validatedFields.data;
  try{
    await signIn("credentials", { 
        email, 
        password, 
        redirectTo: DEFAULT_LOGIN_REDIRECT 
    });

    return { success: "Login successful! Redirecting..." };
  }
  catch(error){
    if(error instanceof AuthError){
        switch(error.type){
            case "CredentialsSignin":
                return {
                    error: "Invalid credentials!",
                };
            default:
                return {
                    error: "Something went wrong!",
                };
        }
    }
    throw error;
  }
};