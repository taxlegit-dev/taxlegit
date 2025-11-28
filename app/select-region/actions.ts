"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setRegionAndRedirect(region: "INDIA" | "US", userRole: string) {
  const cookieStore = await cookies();
  cookieStore.set("taxlegit-region", region, { path: "/", maxAge: 31536000 });
  
  if (userRole === "ADMIN") {
    redirect(`/admin?region=${region}`);
  }
  redirect("/dashboard");
}

