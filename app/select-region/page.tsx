"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { setRegionAndRedirect } from "./actions";
import Link from "next/link";

export default function SelectRegionPage() {
  // const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedRegion, setSelectedRegion] = useState<"INDIA" | "US">("INDIA");
  const [isPending, startTransition] = useTransition();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-zinc-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error message if not logged in or not admin, but don't redirect automatically
  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-50 px-4 py-12">
        <div className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm text-center">
          <h1 className="text-xl font-semibold text-zinc-900">Access Denied</h1>
          <p className="text-sm text-zinc-600">Please login to continue</p>
          <Link
            href="/login"
            className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Only allow ADMIN users to access region selection
  if (session.user.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-50 px-4 py-12">
        <div className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm text-center">
          <h1 className="text-xl font-semibold text-zinc-900">Access Denied</h1>
          <p className="text-sm text-zinc-600">
            This page is only for administrators
          </p>
          <Link
            href="/dashboard"
            className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleContinue = () => {
    startTransition(async () => {
      await setRegionAndRedirect(selectedRegion, session.user.role);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-zinc-900">
            Select Your Region
          </h1>
          <p className="text-sm text-zinc-600">
            Choose your preferred region to continue
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setSelectedRegion("INDIA")}
            disabled={isPending}
            className={`w-full rounded-lg border-2 p-4 text-left transition ${
              selectedRegion === "INDIA"
                ? "border-indigo-600 bg-indigo-50"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            } ${
              isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-zinc-900">India 🇮🇳</p>
                <p className="mt-1 text-sm text-zinc-600">
                  Access India-specific services and content
                </p>
              </div>
              {selectedRegion === "INDIA" && (
                <div className="h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center">
                  <svg
                    className="h-3 w-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRegion("US")}
            disabled={isPending}
            className={`w-full rounded-lg border-2 p-4 text-left transition ${
              selectedRegion === "US"
                ? "border-indigo-600 bg-indigo-50"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            } ${
              isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-zinc-900">United States 🇺🇸</p>
                <p className="mt-1 text-sm text-zinc-600">
                  Access US-specific services and content
                </p>
              </div>
              {selectedRegion === "US" && (
                <div className="h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center">
                  <svg
                    className="h-3 w-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </button>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={isPending}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
