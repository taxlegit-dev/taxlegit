"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogSchema } from "@/lib/validators";
import { EditorJsEditor } from "@/components/editor/editorjs-editor";
import type { OutputData } from "@editorjs/editorjs";

const blogFormSchema = createBlogSchema.extend({
  tags: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

type BlogFormProps = {
  region: "INDIA" | "US";
};

export function BlogForm({ region }: BlogFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<OutputData | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      tags: "",
      region,
    },
  });

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      setMessage(null);
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          tags: values.tags
            ? values.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
            : [],
          content: editorContent ? JSON.stringify(editorContent) : "",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.error ?? "Unable to save blog");
        return;
      }

      reset({
        title: "",
        slug: "",
        excerpt: "",
        tags: "",
        region,
      });
      setEditorContent(null);
      setMessage("Blog published");
      router.refresh();
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
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
        <label className="text-sm font-semibold text-zinc-800">Featured excerpt</label>
        <textarea
          rows={3}
          className="w-full rounded-2xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          {...register("excerpt")}
        />
        {errors.excerpt && <p className="text-xs text-red-500">{errors.excerpt.message}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-zinc-800">Tags (comma separated)</label>
        <input
          type="text"
          className="w-full rounded-2xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          {...register("tags")}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-zinc-800">Content</label>
        <EditorJsEditor 
          value={editorContent ?? undefined} 
          onChange={setEditorContent} 
          placeholder="Write your article"
          onImageUpload={async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("region", region);
            const response = await fetch("/api/admin/upload", {
              method: "POST",
              body: formData,
            });
            const result = await response.json();
            if (!response.ok) {
              throw new Error(result.error || "Upload failed");
            }
            return result.url;
          }}
          region={region}
        />
      </div>
      <input type="hidden" value={region} {...register("region")} />
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-70"
      >
        {isPending ? "Publishing..." : "Publish blog"}
      </button>
      {message && <p className="text-center text-xs text-zinc-500">{message}</p>}
    </form>
  );
}

