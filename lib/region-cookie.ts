import { cookies, headers } from "next/headers";
import { Region } from "@prisma/client";
import { REGION_COOKIE_NAME, SupportedRegion, getFallbackRegion } from "@/lib/regions";

export async function resolveRegion(): Promise<Region> {
  const cookieStore = await cookies();
  const cookieRegion = cookieStore.get(REGION_COOKIE_NAME)?.value as SupportedRegion | undefined;
  const headerList = await headers();
  const pathname = headerList.get("x-invoke-path") ?? headerList.get("referer") ?? "/";
  const fallback = getFallbackRegion(pathname);

  const normalized = cookieRegion ?? fallback;

  return normalized === "US" ? Region.US : Region.INDIA;
}

