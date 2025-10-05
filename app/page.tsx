"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { LanguageSwitcher } from "@/components/language-switcher";

type SignUpFormValues = {
  username: string;
  password: string;
  mobile: string;
  parentMobile: string;
};

type SignInFormValues = {
  username: string;
  password: string;
};

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
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
                suppressHydrationWarning
              >
                CyberWise
              </span>
            </span>
          </div>
          <p className="text-muted-foreground">{t("landing.description")}</p>
        </div>

        <div className="border border-blue-100 dark:border-slate-700 rounded-2xl p-8 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signup">{t("auth.signUp")}</TabsTrigger>
              <TabsTrigger value="signin">{t("auth.signIn")}</TabsTrigger>
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
  const { t } = useTranslation();
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [serverErr, setServerErr] = useState<string | null>(null);

  const signUpSchema = z.object({
    username: z.string().min(3, t("auth.usernameMinLength")),
    password: z.string().min(6, t("auth.passwordMinLength")),
    mobile: z.string().min(10, t("auth.mobileMinLength")),
    parentMobile: z.string().min(10, t("auth.parentMobileMinLength")),
  });

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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      const data = await res.json();
      
      if (!res.ok) {
        setServerErr(data?.error || t("auth.signupFailed"));
      } else {
        setServerMsg(t("auth.accountCreated"));
        // Save username to localStorage for profile display
        localStorage.setItem('username', values.username);
        reset();
      }
    } catch (e: any) {
      if (e.name === 'AbortError') {
        setServerErr(t("auth.requestTimeout"));
      } else {
        setServerErr(t("auth.networkError"));
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t("auth.createAccount")}</h2>

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
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] bg-white dark:bg-slate-700"
            placeholder="johndoe"
            autoComplete="username"
          />
          {errors.username && (
            <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">{t("auth.password")}</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] bg-white dark:bg-slate-700"
            placeholder="••••••••"
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">{t("auth.mobile")}</label>
          <input
            {...register("mobile")}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] bg-white dark:bg-slate-700"
            placeholder="+911234567890"
            autoComplete="tel"
          />
          {errors.mobile && (
            <p className="text-sm text-red-600 mt-1">{errors.mobile.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">{t("auth.parentMobile")}</label>
          <input
            {...register("parentMobile")}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] bg-white dark:bg-slate-700"
            placeholder="+911234567891"
            autoComplete="tel"
          />
          {errors.parentMobile && (
            <p className="text-sm text-red-600 mt-1">{errors.parentMobile.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] text-white rounded-lg py-3 font-semibold disabled:opacity-60 hover:opacity-90"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("auth.creatingAccount") : t("auth.signUp")}
        </button>
      </form>
    </div>
  );
}

function SignInForm() {
  const { t } = useTranslation();
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [serverErr, setServerErr] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  const signInSchema = z.object({
    username: z.string().min(3, t("auth.usernameRequired")),
    password: z.string().min(6, t("auth.passwordRequired")),
  });

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
        setServerErr(data?.error || t("auth.signinFailed"));
      } else {
        setServerMsg(t("auth.welcomeMessage"));
        // Save username to localStorage for profile display
        localStorage.setItem('username', values.username);
        reset();
        // Redirect immediately
        window.location.href = "/home";
      }
    } catch (e) {
      setServerErr(t("auth.networkError"));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t("auth.welcomeBack")}</h2>

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
          <label className="block text-sm font-medium mb-1.5">{t("auth.username")}</label>
          <input
            {...register("username")}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] bg-white dark:bg-slate-700"
            placeholder="johndoe"
            autoComplete="username"
          />
          {errors.username && (
            <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium">{t("auth.password")}</label>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-xs text-[#1ABC9C] hover:underline"
            >
              {t("auth.forgotPassword")}
            </button>
          </div>
          <input
            type="password"
            {...register("password")}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] bg-white dark:bg-slate-700"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] text-white rounded-lg py-3 font-semibold disabled:opacity-60 hover:opacity-90"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("auth.signingIn") : t("auth.signIn")}
        </button>
      </form>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">{t("auth.resetPassword")}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t("auth.resetPasswordMessage")}
            </p>
            
            {resetMsg && (
              <div className="mb-4 p-3 text-sm text-teal-700 bg-teal-50 border border-teal-200 dark:bg-teal-900/20 dark:border-teal-800 rounded-lg">
                {resetMsg}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("auth.username")}</label>
                <input
                  type="text"
                  value={resetUsername}
                  onChange={(e) => setResetUsername(e.target.value)}
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] bg-white dark:bg-slate-700"
                  placeholder={t("auth.enterUsername")}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={async () => {
                    if (!resetUsername.trim()) {
                      setResetMsg(t("auth.pleaseEnterUsername"));
                      return;
                    }
                    // For now, just show a message (you can implement actual reset logic later)
                    setResetMsg(t("auth.resetPasswordSent"));
                    setResetUsername("");
                  }}
                  className="flex-1 bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] text-white rounded-lg py-2.5 font-semibold hover:opacity-90"
                >
                  {t("auth.sendResetLink")}
                </button>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetUsername("");
                    setResetMsg("");
                  }}
                  className="px-6 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  {t("common.cancel")}
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {t("auth.securityNote")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
