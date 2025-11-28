import Link from "next/link";
import { Region } from "@prisma/client";
import { NavbarServer } from "@/components/navigation/navbar-server";
import { getServiceCategories } from "@/lib/queries";

type ServiceIndexProps = {
  region: Region;
  regionPrefix: string;
};

export async function ServiceIndex({ region, regionPrefix }: ServiceIndexProps) {
  const categories = await getServiceCategories(region);

  return (
    <div className="min-h-screen bg-white">
      <NavbarServer region={region} />
      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">Services</p>
          <h1 className="text-4xl font-semibold text-zinc-900">
            Region-specific services curated by the Taxlegit admin panel
          </h1>
          <p className="text-base text-zinc-600">
            Categories, slug structure, FAQs, and media are all stored in the database and rendered dynamically.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`${regionPrefix}/services/${category.slug}`}
              className="rounded-3xl border border-zinc-100 p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">{category.slug}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-zinc-900">{category.title}</h2>
                </div>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                  {category.services.length} services
                </span>
              </div>
              <p className="mt-3 text-sm text-zinc-600">{category.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-indigo-600">
                {category.services.slice(0, 4).map((service) => (
                  <span key={service.id} className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
                    {service.title}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

