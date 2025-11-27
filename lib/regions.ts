export const REGION_COOKIE_NAME = "taxlegit-region";

export type SupportedRegion = "INDIA" | "US";

export const supportedRegions: { value: SupportedRegion; label: string; localeLabel: string }[] = [
  { value: "INDIA", label: "India", localeLabel: "India 🇮🇳" },
  { value: "US", label: "United States", localeLabel: "United States 🇺🇸" },
];

export const regionPathMap: Record<SupportedRegion, string> = {
  INDIA: "/",
  US: "/us",
};

export function getFallbackRegion(pathname?: string): SupportedRegion {
  if (pathname?.startsWith("/us")) {
    return "US";
  }
  return "INDIA";
}

