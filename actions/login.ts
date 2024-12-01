"use server";

import { z } from "zod";
import { LoginSchema } from "@/schemas";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

type LoginSchemaType = z.infer<typeof LoginSchema>;

export const login = async (values: LoginSchemaType) => {
    console.log("Login attempt with values:", values);

    const validatedFields = LoginSchema.safeParse(values);
  
    if (!validatedFields.success) {
      console.error("Validation failed:", validatedFields.error);
      return {
        error: "Invalid credentials",
      };
    }
  
    const { email, password } = validatedFields.data;
    try {
      console.log("Attempting to sign in with email:", email);
      const result = await signIn("credentials", { 
        email, 
        password, 
        // redirectTo: DEFAULT_LOGIN_REDIRECT 
      });
  
      console.log("Sign in result:", result);
  
      return { 
        success: "Login successful!", 
        redirect: DEFAULT_LOGIN_REDIRECT 
      };
    }
    catch(error) {
      console.error("Login error:", error);
      if(error instanceof AuthError) {
        switch(error.type) {
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