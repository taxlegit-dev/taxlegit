import Link from "next/link";
import { Region } from "@prisma/client";
import { Navbar } from "@/components/navigation/navbar";
import { getServiceCategories, getServicesByCategory } from "@/lib/queries";

type CategoryDetailProps = {
  region: Region;
  regionPrefix: string;
  slug: string;
};

export async function CategoryDetail({ region, regionPrefix, slug }: CategoryDetailProps) {
  const [categories, services] = await Promise.all([getServiceCategories(region), getServicesByCategory(region, slug)]);
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar region={region} />
        <main className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <p className="text-sm text-zinc-500">Category not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar region={region} />
      <main className="mx-auto w-full max-w-5xl px-6 py-12 space-y-8">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">Category</p>
          <h1 className="text-4xl font-semibold text-zinc-900">{category.title}</h1>
          <p className="text-base text-zinc-600">{category.summary}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`${regionPrefix}/services/${category.slug}/${service.slug}`}
              className="flex flex-col gap-4 rounded-3xl border border-zinc-100 p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              <div>
                <h2 className="text-xl font-semibold text-zinc-900">{service.title}</h2>
                <p className="mt-2 text-sm text-zinc-600">{service.excerpt}</p>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold text-indigo-600">
                View scope <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

