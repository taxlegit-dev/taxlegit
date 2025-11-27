import { notFound } from "next/navigation";
import { Region } from "@prisma/client";
import { Navbar } from "@/components/navigation/navbar";
import { getBlogBySlug } from "@/lib/queries";
import { RichContent } from "@/components/rich-text/rich-content";
import type { RichTextDocument } from "@/types/rich-text";

type BlogDetailProps = {
  region: Region;
  slug: string;
};

export async function BlogDetail({ region, slug }: BlogDetailProps) {
  const blog = await getBlogBySlug(region, slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className={`min-h-screen ${region === Region.US ? "bg-slate-950 text-white" : "bg-white"}`}>
      <Navbar region={region} />
      <main className="mx-auto w-full max-w-3xl px-6 py-12 space-y-6">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.3em] ${
            region === Region.US ? "text-emerald-300" : "text-indigo-500"
          }`}
        >
          Blog
        </p>
        <h1 className="text-4xl font-semibold">{blog.title}</h1>
        {blog.excerpt && <p className={`text-base ${region === Region.US ? "text-slate-300" : "text-zinc-600"}`}>{blog.excerpt}</p>}
        <div
          className={`rounded-3xl border p-6 ${
            region === Region.US ? "border-white/10 bg-white/5" : "border-zinc-100 shadow-sm"
          }`}
        >
          <RichContent document={blog.content as RichTextDocument} theme={region === Region.US ? "dark" : "light"} />
        </div>
      </main>
    </div>
  );
}

