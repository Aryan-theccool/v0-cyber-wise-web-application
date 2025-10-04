"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";

const schema = z.object({
  username: z.string().min(3, "At least 3 characters").max(50),
  password: z.string().min(6, "At least 6 characters").max(128),
  mobile: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/i, "10-15 digits, optional +"),
  parentMobile: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/i, "10-15 digits, optional +"),
});

type FormValues = z.infer<typeof schema>;

export default function SignUpPage() {
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [serverErr, setServerErr] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
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
        setServerMsg("Signup successful. You can now sign in.");
        reset();
      }
    } catch (e) {
      setServerErr("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md border rounded-lg p-6 shadow-sm bg-white/50 dark:bg-black/20">
        <h1 className="text-2xl font-semibold mb-2">Create an account</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Already have an account? <Link className="text-blue-600" href="/auth/sign-in">Sign in</Link>
        </p>

        {serverErr && (
          <div className="mb-4 text-red-600 text-sm" role="alert">{serverErr}</div>
        )}
        {serverMsg && (
          <div className="mb-4 text-green-700 text-sm" role="status">{serverMsg}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              {...register("username")}
              className="w-full border rounded px-3 py-2"
              placeholder="johndoe"
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full border rounded px-3 py-2"
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile number</label>
            <input
              {...register("mobile")}
              className="w-full border rounded px-3 py-2"
              placeholder="+911234567890"
              autoComplete="tel"
            />
            {errors.mobile && (
              <p className="text-sm text-red-600 mt-1">{errors.mobile.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Parent's mobile number</label>
            <input
              {...register("parentMobile")}
              className="w-full border rounded px-3 py-2"
              placeholder="+911234567891"
              autoComplete="tel"
            />
            {errors.parentMobile && (
              <p className="text-sm text-red-600 mt-1">{errors.parentMobile.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-2 disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
