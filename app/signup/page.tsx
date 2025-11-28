import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign Up | Taxlegit",
};

export default async function SignupPage() {
  const session = await auth();

  // If already logged in, redirect based on role
  if (session?.user) {
    if (session.user.role === "ADMIN") {
      redirect("/select-region");
    } else if (session.user.role === "USER") {
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-50 px-4 py-12">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">Taxlegit India</p>
          <h1 className="text-3xl font-semibold text-zinc-900">Create your account</h1>
          <p className="text-sm text-zinc-500">Sign up to access your dashboard</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}

