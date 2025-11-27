import Link from "next/link";
import { Region } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { RegionSwitcher } from "@/components/navigation/region-switcher";
import { toSupportedRegion } from "@/lib/region-cookie";

type NavbarProps = {
  region: Region;
};

export async function Navbar({ region }: NavbarProps) {
  const [navItems, categories] = await Promise.all([
    prisma.navbarItem.findMany({
      where: { region, isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.serviceCategory.findMany({
      where: { region },
      orderBy: { order: "asc" },
      include: {
        services: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
          orderBy: { title: "asc" },
        },
      },
    }),
  ]);

  const mappedRegion = toSupportedRegion(region);
  const regionPrefix = region === Region.US ? "/us" : "";

  return (
    <header className="border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href={region === Region.US ? "/us" : "/"} className="text-lg font-semibold tracking-tight text-zinc-900">
          Taxlegit
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex">
          {navItems.map((item) => {
            if (item.type === "DROPDOWN") {
              return (
                <div key={item.id} className="group relative">
                  <button className="flex items-center gap-1 text-zinc-700 transition hover:text-zinc-900">
                    {item.label}
                    <svg
                      className="h-3 w-3 text-zinc-500 transition group-hover:text-zinc-900"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.25 4.5L6 8.25L9.75 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div className="invisible absolute left-1/2 top-full z-20 mt-4 w-[320px] -translate-x-1/2 rounded-2xl border border-zinc-100 bg-white p-4 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                    <div className="space-y-4">
                      {categories.map((category) => (
                        <div key={category.id}>
                          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{category.title}</p>
                          <div className="mt-2 space-y-1">
                            {category.services.slice(0, 4).map((service) => (
                              <Link
                                key={service.id}
                                href={`${regionPrefix}/services/${category.slug}/${service.slug}`}
                                className="block rounded-lg px-2 py-1 text-sm text-zinc-600 transition hover:bg-indigo-50 hover:text-zinc-900"
                              >
                                {service.title}
                              </Link>
                            ))}
                            <Link
                              href={`${regionPrefix}/services/${category.slug}`}
                              className="block text-xs font-medium text-indigo-600"
                            >
                              View all
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href ?? "#"}
                className={`text-sm ${item.isLoginLink ? "rounded-full bg-indigo-600 px-3 py-1 text-white" : "text-zinc-600 transition hover:text-zinc-900"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <RegionSwitcher currentRegion={mappedRegion} />
          <Link
            href="/login"
            className="rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700 transition hover:border-indigo-500 hover:text-indigo-600"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

