import { cookies, headers } from "next/headers";
import { Region } from "@prisma/client";
import { REGION_COOKIE_NAME, SupportedRegion, getFallbackRegion } from "@/lib/regions";

export function resolveRegion(): Region {
  const cookieStore = cookies();
  const cookieRegion = cookieStore.get(REGION_COOKIE_NAME)?.value as SupportedRegion | undefined;
  const headerList = headers();
  const pathname = headerList.get("x-invoke-path") ?? headerList.get("referer") ?? "/";
  const fallback = getFallbackRegion(pathname);

  const normalized = cookieRegion ?? fallback;

  return normalized === "US" ? Region.US : Region.INDIA;
}

export function toSupportedRegion(region: Region): SupportedRegion {
  return region === Region.US ? "US" : "INDIA";
}

