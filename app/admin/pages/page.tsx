import { Region, PageKey } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { RegionFilter } from "@/components/admin/region-filter";
import { PageForm } from "@/components/admin/forms/page-form";
import type { RichTextDocument } from "@/types/rich-text";

type AdminPagesPageProps = {
  searchParams?: { region?: string };
};

export default async function AdminPagesPage({ searchParams }: AdminPagesPageProps) {
  const selectedRegion = searchParams?.region === "US" ? Region.US : Region.INDIA;

  const [home, about] = await Promise.all([
    prisma.staticPage.findUnique({
      where: {
        key_region: {
          key: PageKey.HOME,
          region: selectedRegion,
        },
      },
    }),
    prisma.staticPage.findUnique({
      where: {
        key_region: {
          key: PageKey.ABOUT,
          region: selectedRegion,
        },
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Pages</p>
          <h1 className="text-3xl font-semibold text-slate-900">Home & About editors</h1>
        </div>
        <RegionFilter value={selectedRegion === Region.US ? "US" : "INDIA"} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <PageForm
          region={selectedRegion === Region.US ? "US" : "INDIA"}
          pageKey="HOME"
          title={home?.title ?? "Home"}
          content={home?.content ? (typeof home.content === 'string' ? JSON.parse(home.content) : home.content) : undefined}
        />
        <PageForm
          region={selectedRegion === Region.US ? "US" : "INDIA"}
          pageKey="ABOUT"
          title={about?.title ?? "About"}
          content={about?.content ? (typeof about.content === 'string' ? JSON.parse(about.content) : about.content) : undefined}
        />
      </div>
    </div>
  );
}

