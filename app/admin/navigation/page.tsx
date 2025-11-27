import { Region } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { RegionFilter } from "@/components/admin/region-filter";
import { NavItemForm } from "@/components/admin/forms/nav-item-form";

type AdminNavigationPageProps = {
  searchParams?: { region?: string };
};

export default async function AdminNavigationPage({ searchParams }: AdminNavigationPageProps) {
  const selectedRegion = searchParams?.region === "US" ? Region.US : Region.INDIA;
  const navItems = await prisma.navbarItem.findMany({
    where: { region: selectedRegion },
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Navigation</p>
          <h1 className="text-3xl font-semibold text-slate-900">Region-based navbar</h1>
        </div>
        <RegionFilter value={selectedRegion === Region.US ? "US" : "INDIA"} />
      </div>
      <NavItemForm region={selectedRegion === Region.US ? "US" : "INDIA"} />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Current items</h2>
        <ul className="mt-4 divide-y divide-slate-100">
          {navItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500">{item.href ?? "—"}</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                <span>{item.type}</span>
                {item.isLoginLink && <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">Login</span>}
                <span className="text-slate-400">#{item.order}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

