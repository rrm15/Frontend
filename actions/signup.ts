"use server";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/schemas";

type SignupSchemaType = z.infer<typeof SignupSchema>;

export const signup = async (values: SignupSchemaType) => {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid credentials",
    };
  }

  return { success: "Signup successful! Redirecting..." };

  // Rest of your signup logic
  // For example:
  // const user = await createUser(values);
  // if (user) {
  //   // Send verification email
  // }
};