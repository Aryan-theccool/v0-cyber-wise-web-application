"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must not exceed 64 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  mobile: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/i, "10-15 digits, optional +"),
  parentMobile: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/i, "10-15 digits, optional +"),
});

const signInSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must not exceed 64 characters"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;
type SignInFormValues = z.infer<typeof signInSchema>;

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold">
              <span
                className="bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                CyberWise
              </span>
            </span>
          </div>
          <p className="text-muted-foreground">Your safe space for cyber awareness and protection</p>
        </div>

        <div className="border border-blue-100 dark:border-slate-700 rounded-2xl p-8 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>

            <TabsContent value="signin">
              <SignInForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function SignUpForm() {
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [serverErr, setServerErr] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormValues>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (values: SignUpFormValues) => {
    setServerMsg(null);
    setServerErr(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerErr(data?.error || "Signup failed");
      } else {
        setServerMsg("Account created successfully! You can now sign in.");
        reset();
      }
    } catch (e) {
      setServerErr("Network error");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create your account</h2>

      {serverErr && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 rounded-lg" role="alert">
          {serverErr}
        </div>
      )}
      {serverMsg && (
        <div className="mb-4 p-3 text-sm text-teal-700 bg-teal-50 border border-teal-200 dark:bg-teal-900/20 dark:border-teal-800 rounded-lg" role="status">
          {serverMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Username</label>
          <input
            {...register("username")}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent bg-white dark:bg-slate-700 transition-all"
            placeholder="johndoe"
            autoComplete="username"
          />
          {errors.username && (
            <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent bg-white dark:bg-slate-700 transition-all"
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Must include uppercase, lowercase, number, and special character</p>
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Your mobile number</label>
          <input
            {...register("mobile")}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent bg-white dark:bg-slate-700 transition-all"
            placeholder="+911234567890"
            autoComplete="tel"
          />
          {errors.mobile && (
            <p className="text-sm text-red-600 mt-1">{errors.mobile.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Parent's mobile number</label>
          <input
            {...register("parentMobile")}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent bg-white dark:bg-slate-700 transition-all"
            placeholder="+911234567891"
            autoComplete="tel"
          />
          {errors.parentMobile && (
            <p className="text-sm text-red-600 mt-1">{errors.parentMobile.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] text-white rounded-lg py-3 font-semibold disabled:opacity-60 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

function SignInForm() {
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [serverErr, setServerErr] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInFormValues>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (values: SignInFormValues) => {
    setServerMsg(null);
    setServerErr(null);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerErr(data?.error || "Sign in failed");
      } else {
        setServerMsg("Welcome back! Redirecting...");
        reset();
        // Redirect to dashboard or main app after successful login
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      }
    } catch (e) {
      setServerErr("Network error");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Welcome back</h2>

      {serverErr && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 rounded-lg" role="alert">
          {serverErr}
        </div>
      )}
      {serverMsg && (
        <div className="mb-4 p-3 text-sm text-teal-700 bg-teal-50 border border-teal-200 dark:bg-teal-900/20 dark:border-teal-800 rounded-lg" role="status">
          {serverMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Username</label>
          <input
            {...register("username")}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent bg-white dark:bg-slate-700 transition-all"
            placeholder="johndoe"
            autoComplete="username"
          />
          {errors.username && (
            <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent bg-white dark:bg-slate-700 transition-all"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] text-white rounded-lg py-3 font-semibold disabled:opacity-60 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
