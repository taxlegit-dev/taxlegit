import Link from "next/link";
import { Region } from "@prisma/client";
import { NavbarServer } from "@/components/navigation/navbar-server";
import { getBlogs } from "@/lib/queries";

type BlogIndexProps = {
  region: Region;
  regionPrefix: string;
  heading: string;
  description: string;
};

export async function BlogIndex({ region, regionPrefix, heading, description }: BlogIndexProps) {
  const blogs = await getBlogs(region);

  return (
    <div className={`min-h-screen ${region === Region.US ? "bg-slate-950 text-white" : "bg-white"}`}>
      <NavbarServer region={region} />
      <main className="mx-auto w-full max-w-6xl px-6 py-12 space-y-8">
        <div className="space-y-4">
          <p className={`text-xs font-semibold uppercase tracking-[0.35em] ${region === Region.US ? "text-emerald-300" : "text-indigo-500"}`}>
            Blog
          </p>
          <h1 className="text-4xl font-semibold">{heading}</h1>
          <p className={`text-base ${region === Region.US ? "text-slate-300" : "text-zinc-500"}`}>{description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`${regionPrefix}/blog/${blog.slug}`}
              className={`flex flex-col gap-3 rounded-3xl border p-5 shadow-sm transition ${
                region === Region.US
                  ? "border-white/10 bg-white/5 hover:bg-white/10"
                  : "border-zinc-100 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg"
              }`}
            >
              <p className={`text-xs uppercase tracking-[0.3em] ${region === Region.US ? "text-slate-400" : "text-zinc-400"}`}>
                {blog.publishedAt
                  ? blog.publishedAt.toLocaleDateString(region === Region.US ? "en-US" : "en-IN", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Draft"}
              </p>
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className={`text-sm ${region === Region.US ? "text-slate-300" : "text-zinc-600"}`}>{blog.excerpt}</p>
              <span className={`text-sm font-semibold ${region === Region.US ? "text-emerald-300" : "text-indigo-600"}`}>Read →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

