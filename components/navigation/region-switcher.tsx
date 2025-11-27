"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supportedRegions, regionPathMap, SupportedRegion } from "@/lib/regions";

type RegionSwitcherProps = {
  currentRegion: SupportedRegion;
};

export function RegionSwitcher({ currentRegion }: RegionSwitcherProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (value: SupportedRegion) => {
    setIsLoading(true);
    await fetch("/api/region", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ region: value }),
    });
    router.push(regionPathMap[value]);
    router.refresh();
    setIsLoading(false);
  };

  return (
    <div className="relative inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium shadow-sm">
      <span className="text-zinc-500">Region</span>
      <select
        className="cursor-pointer bg-transparent text-zinc-900 outline-none"
        value={currentRegion}
        onChange={(event) => handleChange(event.target.value as SupportedRegion)}
        disabled={isLoading}
      >
        {supportedRegions.map((region) => (
          <option key={region.value} value={region.value}>
            {region.label}
          </option>
        ))}
      </select>
    </div>
  );
}

