import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { REGION_COOKIE_NAME, SupportedRegion, regionPathMap } from "@/lib/regions";

export async function POST(request: Request) {
  const { region } = (await request.json().catch(() => ({}))) as { region?: SupportedRegion };

  if (!region || !Object.keys(regionPathMap).includes(region)) {
    return NextResponse.json({ error: "Unsupported region" }, { status: 400 });
  }

  const cookieStore = await cookies();
  cookieStore.set(REGION_COOKIE_NAME, region, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.json({ ok: true, redirectTo: regionPathMap[region] });
}

