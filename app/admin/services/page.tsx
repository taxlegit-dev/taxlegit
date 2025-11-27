import { Region } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { RegionFilter } from "@/components/admin/region-filter";
import { CategoryForm } from "@/components/admin/forms/category-form";
import { ServiceForm } from "@/components/admin/forms/service-form";

type AdminServicesPageProps = {
  searchParams?: { region?: string };
};

export default async function AdminServicesPage({ searchParams }: AdminServicesPageProps) {
  const selectedRegion = searchParams?.region === "US" ? Region.US : Region.INDIA;
  const categories = await prisma.serviceCategory.findMany({
    where: { region: selectedRegion },
    include: {
      services: true,
    },
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Services</p>
          <h1 className="text-3xl font-semibold text-slate-900">Dynamic categories & pages</h1>
        </div>
        <RegionFilter value={selectedRegion === Region.US ? "US" : "INDIA"} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryForm region={selectedRegion === Region.US ? "US" : "INDIA"} />
        <ServiceForm
          region={selectedRegion === Region.US ? "US" : "INDIA"}
          categories={categories.map((cat) => ({ slug: cat.slug, title: cat.title }))}
        />
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Existing catalog</h2>
        <div className="mt-4 space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{category.slug}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{category.title}</h3>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {category.services.length} services
                </span>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                {category.services.map((service) => (
                  <li key={service.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                    <span>{service.title}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{service.slug}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

