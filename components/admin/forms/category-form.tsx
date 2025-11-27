"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createCategorySchema } from "@/lib/validators";

const formSchema = createCategorySchema.extend({
  order: z.preprocess((value) => Number(value ?? 0), z.number().int().min(0)),
  summary: z.preprocess(
    (value) => (typeof value === "string" && value.length === 0 ? undefined : value),
    createCategorySchema.shape.summary,
  ),
});

type CategoryFormValues = z.infer<typeof formSchema>;

export function CategoryForm({ region }: { region: "INDIA" | "US" }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      order: 0,
      region,
    },
  });

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      setMessage(null);
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.error ?? "Something went wrong");
        return;
      }

      reset({ title: "", slug: "", summary: "", order: 0, region });
      setMessage("Category created");
      router.refresh();
    });
  });

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm space-y-4">
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
      <div className="space-y-1">
        <label className="text-sm font-semibold text-zinc-800">Summary</label>
        <textarea
          className="w-full rounded-2xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          rows={3}
          {...register("summary")}
        />
        {errors.summary && <p className="text-xs text-red-500">{errors.summary.message}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-zinc-800">Order</label>
        <input
          type="number"
          className="w-full rounded-2xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          {...register("order")}
        />
      </div>
      <input type="hidden" value={region} {...register("region")} />
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-70"
      >
        {isPending ? "Saving..." : "Create category"}
      </button>
      {message && <p className="text-center text-xs text-zinc-500">{message}</p>}
    </form>
  );
}

