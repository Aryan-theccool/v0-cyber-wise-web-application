"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, User, Phone, Calendar, LogOut, Lock, Mail, Edit2 } from "lucide-react";
import Link from "next/link";
import { AppNav } from "@/components/app-nav";

type UserData = {
  id: string;
  username: string;
  mobile: string;
  parentMobile: string;
  createdAt: string;
  updatedAt: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          router.push("/");
        }
      })
      .catch(() => router.push("/"));
  }, [router]);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      try {
        // Call logout API
        await fetch("/api/auth/logout", { method: "POST" });
      } catch (error) {
        console.error("Logout API error:", error);
      }
      
      // Clear all local storage
      localStorage.removeItem('username');
      localStorage.clear();
      
      // Clear session cookie manually (backup)
      document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Redirect to home page
      window.location.href = "/";
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    // Validation
    if (passwordForm.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (!/[A-Z]/.test(passwordForm.newPassword)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(passwordForm.newPassword)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    }

    if (!/[0-9]/.test(passwordForm.newPassword)) {
      setPasswordError("Password must contain at least one number");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(passwordForm.newPassword)) {
      setPasswordError("Password must contain at least one special character");
      return;
    }

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.error || "Failed to change password");
      } else {
        setPasswordSuccess("Password changed successfully!");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => {
          setIsChangingPassword(false);
          setPasswordSuccess("");
        }, 2000);
      }
    } catch (error) {
      setPasswordError("Network error. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <AppNav />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Profile Information Card */}
            <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-xl p-6 border border-blue-100 dark:border-slate-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {user.username}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">User Profile</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-slate-700 pb-3">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <User className="h-3 w-3" />
                    Username
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{user.username}</p>
                </div>

                <div className="border-b border-gray-200 dark:border-slate-700 pb-3">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    Your Mobile
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{user.mobile}</p>
                </div>

                <div className="border-b border-gray-200 dark:border-slate-700 pb-3">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    Parent's Mobile
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{user.parentMobile}</p>
                </div>

                <div className="pb-3">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Member Since
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Security Settings Card */}
            <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-xl p-6 border border-blue-100 dark:border-slate-700">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security Settings
              </h2>

              {!isChangingPassword ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-blue-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Update your password</p>
                      </div>
                    </div>
                    <Edit2 className="h-4 w-4 text-gray-400" />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between p-4 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LogOut className="h-5 w-5 text-red-600" />
                      <div className="text-left">
                        <p className="font-medium text-red-600 dark:text-red-400">Logout</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Sign out of your account</p>
                      </div>
                    </div>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Current Password</label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                      }
                      className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] bg-white dark:bg-slate-700"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                      className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] bg-white dark:bg-slate-700"
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Min 8 chars, uppercase, lowercase, number, special char
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                      }
                      className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] bg-white dark:bg-slate-700"
                      required
                    />
                  </div>

                  {passwordError && (
                    <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 rounded-lg">
                      {passwordError}
                    </div>
                  )}

                  {passwordSuccess && (
                    <div className="p-3 text-sm text-teal-700 bg-teal-50 border border-teal-200 dark:bg-teal-900/20 dark:border-teal-800 rounded-lg">
                      {passwordSuccess}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] text-white rounded-lg py-2.5 font-semibold hover:opacity-90"
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordError("");
                        setPasswordSuccess("");
                        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      }}
                      className="px-6 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-xl p-6 border border-blue-100 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/home"
                className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-center"
              >
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="font-medium text-sm">Back to Home</p>
              </Link>
              <Link
                href="/chatbot"
                className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-center"
              >
                <svg className="h-6 w-6 mx-auto mb-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="font-medium text-sm">Get Support</p>
              </Link>
              <Link
                href="/journal"
                className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-center"
              >
                <svg className="h-6 w-6 mx-auto mb-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="font-medium text-sm">My Journal</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
