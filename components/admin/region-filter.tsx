"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SupportedRegion, supportedRegions } from "@/lib/regions";

type RegionFilterProps = {
  value: SupportedRegion;
};

export function RegionFilter({ value }: RegionFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (region: SupportedRegion) => {
    const next = new URLSearchParams(searchParams?.toString() ?? "");
    next.set("region", region);
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">
      {supportedRegions.map((regionOption) => (
        <button
          key={regionOption.value}
          type="button"
          onClick={() => handleChange(regionOption.value)}
          className={`rounded-full px-3 py-1 transition ${
            regionOption.value === value ? "bg-indigo-600 text-white" : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          {regionOption.label}
        </button>
      ))}
    </div>
  );
}

