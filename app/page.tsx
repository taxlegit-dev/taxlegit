import Link from "next/link";
import { Region, PageKey } from "@prisma/client";
import { NavbarServer } from "@/components/navigation/navbar-server";
import { RichContent } from "@/components/rich-text/rich-content";
import { getBlogs, getServiceCategories, getStaticPage } from "@/lib/queries";
import type { RichTextDocument } from "@/types/rich-text";

export default async function IndiaHomePage() {
  const region = Region.INDIA;
  const [page, categories, blogs] = await Promise.all([
    getStaticPage(region, PageKey.HOME),
    getServiceCategories(region),
    getBlogs(region),
  ]);
  const heroContent = page?.content as RichTextDocument | null;

  return (
    <div className="min-h-screen bg-white text-black">
      <NavbarServer region={region} />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12">
        <section className="rounded-3xl border border-zinc-100 bg-gradient-to-br from-indigo-50 via-white to-slate-50 p-10 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-600">India Region</p>
              <h1 className="text-4xl font-semibold leading-tight text-zinc-900">
                {page?.title ?? "Taxlegit — Registrations and Compliance"}
              </h1>
              {heroContent && (
                <div className="max-w-2xl">
                  <RichContent document={heroContent} />
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                >
                  Explore services
                </Link>
                <Link
                  href="/blog"
                  className="rounded-full border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-700 transition hover:border-indigo-200 hover:text-indigo-600"
                >
                  Read insights
                </Link>
              </div>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-3 rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Snapshot</p>
              <div className="grid grid-cols-2 gap-3 text-sm font-medium text-zinc-700">
                <div className="rounded-2xl bg-indigo-50 p-4">
                  <p className="text-3xl font-semibold text-indigo-600">{categories.length}</p>
                  <p className="text-xs text-zinc-500">Service categories</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-3xl font-semibold text-slate-700">
                    {categories.reduce((acc, cat) => acc + cat.services.length, 0)}
                  </p>
                  <p className="text-xs text-zinc-500">Service pages</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-3xl font-semibold text-emerald-600">{blogs.length}</p>
                  <p className="text-xs text-zinc-500">Live blogs</p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-4">
                  <p className="text-3xl font-semibold text-amber-600">2</p>
                  <p className="text-xs text-zinc-500">Regions ready</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Dynamic services</p>
              <h2 className="text-2xl font-semibold text-zinc-900">Categories managed in admin</h2>
            </div>
            <Link href="/admin/services" className="text-sm font-semibold text-indigo-600">
              Manage services →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <div key={category.id} className="rounded-2xl border border-zinc-100 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">{category.slug}</p>
                    <h3 className="mt-1 text-xl font-semibold text-zinc-900">{category.title}</h3>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500">
                    {category.services.length} services
                  </span>
                </div>
                <p className="mt-3 text-sm text-zinc-600">{category.summary}</p>
                <div className="mt-4 space-y-2">
                  {category.services.slice(0, 3).map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${category.slug}/${service.slug}`}
                      className="flex items-center justify-between rounded-xl border border-zinc-100 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {service.title}
                      <span aria-hidden className="text-lg">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Latest articles</p>
              <h2 className="text-2xl font-semibold text-zinc-900">Blog powered by TipTap</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-indigo-600">
              View blog →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog.id}
                className="flex flex-col gap-3 rounded-2xl border border-zinc-100 p-4 shadow-sm transition hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg"
              >
                <p className="text-xs uppercase tracking-widest text-zinc-400">
                  {blog.publishedAt
                    ? blog.publishedAt.toLocaleDateString("en-IN", { month: "short", day: "numeric" })
                    : "Draft"}
                </p>
                <h3 className="text-lg font-semibold text-zinc-900">{blog.title}</h3>
                <p className="text-sm text-zinc-600">{blog.excerpt}</p>
                <span className="text-sm font-semibold text-indigo-600">Read post →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-zinc-100 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Taxlegit. All rights reserved.</p>
          <p className="font-medium text-zinc-700">India Region</p>
        </div>
      </footer>
    </div>
  );
}
