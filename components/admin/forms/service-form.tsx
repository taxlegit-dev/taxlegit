"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createServiceSchema } from "@/lib/validators";
import { TipTapEditor } from "@/components/editor/tiptap-editor";
import type { RichTextDocument } from "@/types/rich-text";

const serviceFormSchema = createServiceSchema.extend({
  region: z.enum(["INDIA", "US"]),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

type ServiceFormProps = {
  region: "INDIA" | "US";
  categories: { slug: string; title: string }[];
};

export function ServiceForm({ region, categories }: ServiceFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<RichTextDocument | null>(null);
  const [isPending, startTransition] = useTransition();
  const firstCategorySlug = categories[0]?.slug;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      categorySlug: firstCategorySlug ?? "",
      region,
    },
  });

  if (!firstCategorySlug) {
    return (
      <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-600">Add a category before creating services.</p>
      </div>
    );
  }

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      setMessage(null);
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          content: editorContent,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.error ?? "Unable to save service");
        return;
      }

      reset({
        title: "",
        slug: "",
        excerpt: "",
        categorySlug: firstCategorySlug,
        region,
      });
      setEditorContent(null);
      setMessage("Service saved");
      router.refresh();
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <label className="text-sm font-semibold text-zinc-800">Category</label>
        <select
          className="w-full rounded-2xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          {...register("categorySlug")}
        >
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-zinc-800">Title</label>
          <input
            type="text"
            className="w-full rounded-2xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            {...register("title")}
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-zinc-800">Slug</label>
          <input
            type="text"
            className="w-full rounded-2xl border border-zinc-200 px-3 py-2 text-sm lowercase outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            {...register("slug")}
          />
          {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-zinc-800">Excerpt</label>
        <textarea
          rows={3}
          className="w-full rounded-2xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          {...register("excerpt")}
        />
        {errors.excerpt && <p className="text-xs text-red-500">{errors.excerpt.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-zinc-800">Content</label>
        <TipTapEditor value={editorContent ?? undefined} onChange={setEditorContent} placeholder="Explain the deliverables" />
      </div>
      <input type="hidden" value={region} {...register("region")} />
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-70"
      >
        {isPending ? "Saving..." : "Create service"}
      </button>
      {message && <p className="text-center text-xs text-zinc-500">{message}</p>}
    </form>
  );
}

