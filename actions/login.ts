"use server";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";

type LoginSchemaType = z.infer<typeof LoginSchema>;


export const login = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid credentials",
    };
  }

  return { success: "Login successful! Redirecting..." };

  // Rest of your login logic
  // For example:
  // const user = await findUserByEmail(values.email);
  // if (user) {
  //   // Verify password
  // }
};