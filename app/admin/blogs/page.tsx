import { Region } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { RegionFilter } from "@/components/admin/region-filter";
import { BlogForm } from "@/components/admin/forms/blog-form";

type AdminBlogsPageProps = {
  searchParams?: { region?: string };
};

export default async function AdminBlogsPage({ searchParams }: AdminBlogsPageProps) {
  const selectedRegion = searchParams?.region === "US" ? Region.US : Region.INDIA;
  const blogs = await prisma.blog.findMany({
    where: { region: selectedRegion },
    orderBy: {
      publishedAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Blogs</p>
          <h1 className="text-3xl font-semibold text-slate-900">TipTap powered blog system</h1>
        </div>
        <RegionFilter value={selectedRegion === Region.US ? "US" : "INDIA"} />
      </div>
      <BlogForm region={selectedRegion === Region.US ? "US" : "INDIA"} />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Published articles</h2>
        <div className="mt-4 space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{blog.slug}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{blog.title}</h3>
                </div>
                <span className="text-xs text-slate-500">
                  {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "Draft"}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{blog.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

