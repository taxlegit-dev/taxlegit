import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Login | Taxlegit Admin",
};

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrlParam = params?.callbackUrl;
  const callbackUrl = Array.isArray(callbackUrlParam) ? callbackUrlParam[0] : callbackUrlParam;

  if (session?.user?.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-50 px-4 py-12">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">Admin Portal</p>
          <h1 className="text-3xl font-semibold text-zinc-900">Sign in to Taxlegit</h1>
          <p className="text-sm text-zinc-500">Manage regions, services, blogs, and navigation from one place.</p>
        </div>
        <LoginForm redirectTo={callbackUrl} />
      </div>
    </div>
  );
}

