import { Region, PageKey } from "@prisma/client";
import { Navbar } from "@/components/navigation/navbar";
import { getStaticPage } from "@/lib/queries";
import { RichContent } from "@/components/rich-text/rich-content";
import type { RichTextDocument } from "@/types/rich-text";

export default async function AboutPage() {
  const page = await getStaticPage(Region.INDIA, PageKey.ABOUT);
  const content = page?.content as RichTextDocument | null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar region={Region.INDIA} />
      <main className="mx-auto w-full max-w-3xl px-6 py-12 space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">About</p>
        <h1 className="text-4xl font-semibold text-zinc-900">{page?.title ?? "About Taxlegit India"}</h1>
        {content && (
          <div className="rounded-3xl border border-zinc-100 p-6 shadow-sm">
            <RichContent document={content} />
          </div>
        )}
      </main>
    </div>
  );
}

