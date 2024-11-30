"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./PasswordInput";
import { AuthCard } from "./AuthCard";
import { SignInOption } from "./SignInOption";
import { FormError } from "../form/FormError";
import { FormWarning } from "../form/FormWarning";
import { FormSuccess } from "../form/FormSuccess";
import { login } from "@/actions/login";

import { LoginSchema } from "@/schemas";

export const LoginForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [feedback, setFeedback] = useState<{
      type: "success" | "error" | "warning";
      message: string | null;
    }>({ type: "success", message: null });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    type LoginSchemaType = z.infer<typeof LoginSchema>;

    const form = useForm<LoginSchemaType>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    async function onSubmit(values: LoginSchemaType) {
      setFeedback({ type: "warning", message: "Validating your credentials..." });
      setIsLoading(true);
      startTransition(() => {
        login(values).then((result) => {
          if (result.error) {
            setFeedback({ type: "error", message: result.error });
          } else {
            setFeedback({ type: "success", message: "Logged in successfully" });
          }
        });
        setIsLoading(false);
      });
    }

    const handleGoogleSignIn = async () => {
      try {
        await signIn("google", { callbackUrl: "/dashboard" });
      } catch (error) {
        setFeedback({ type: "error", message: "Google sign-in failed" });
      }
    };

    const handleGitHubSignIn = async () => {
      try {
        await signIn("github", { callbackUrl: "/dashboard" });
      } catch (error) {
        setFeedback({ type: "error", message: "GitHub sign-in failed" });
      }
    };

    return (
      <AuthCard title="Login" description="Login to your account to continue">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Enter your email"
                      {...field}
                      className="transition-all duration-300 ease-in-out hover:border-primary focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isPending}
              name="password"
              render={({ field }) => (
                <PasswordInput
                  field={field}
                  label="Password"
                  placeholder="Enter your password"
                  showPassword={showPassword}
                  onToggleVisibility={() => setShowPassword(!showPassword)}
                />
              )}
            />
            {/* Feedback Section */}
            {feedback.message && feedback.type === "error" && (
              <FormError message={feedback.message} />
            )}
            {feedback.message && feedback.type === "warning" && (
              <FormWarning message={feedback.message} />
            )}
            {feedback.message && feedback.type === "success" && (
              <FormSuccess message={feedback.message} />
            )}
            <Button
              type="submit"
              className="w-full bg-[#8A2BE2] hover:bg-[#7B27CC]"
              disabled={isLoading || isPending}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500 dark:bg-gray-800">Or continue with</span>
          </div>
        </div>

        <div className="space-y-2">
          <SignInOption provider="google" onClick={handleGoogleSignIn} />
          <SignInOption provider="github" onClick={handleGitHubSignIn} />
        </div>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </AuthCard>
    );
  };
