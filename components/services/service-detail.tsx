import Link from "next/link";
import { notFound } from "next/navigation";
import { Region } from "@prisma/client";
import { Navbar } from "@/components/navigation/navbar";
import { getServiceBySlugs } from "@/lib/queries";
import { RichContent } from "@/components/rich-text/rich-content";
import type { RichTextDocument } from "@/types/rich-text";

type ServiceDetailProps = {
  region: Region;
  regionPrefix: string;
  categorySlug: string;
  serviceSlug: string;
};

export async function ServiceDetail({ region, regionPrefix, categorySlug, serviceSlug }: ServiceDetailProps) {
  const service = await getServiceBySlugs(region, categorySlug, serviceSlug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar region={region} />
      <main className="mx-auto w-full max-w-4xl px-6 py-12 space-y-8">
        <div className="space-y-3">
          <Link href={`${regionPrefix}/services/${categorySlug}`} className="text-sm text-indigo-600">
            ← Back to {service.category.title}
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-400">Service</p>
          <h1 className="text-4xl font-semibold text-zinc-900">{service.title}</h1>
          {service.excerpt && <p className="text-base text-zinc-600">{service.excerpt}</p>}
        </div>
        <div className="rounded-3xl border border-zinc-100 p-6 shadow-sm">
          <RichContent document={service.content as RichTextDocument} />
        </div>
        {service.faq && (
          <div className="rounded-2xl border border-zinc-100 p-6">
            <pre className="text-sm text-zinc-600">{JSON.stringify(service.faq, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

