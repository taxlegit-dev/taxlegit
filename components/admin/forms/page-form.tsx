"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { RichTextDocument } from "@/types/rich-text";
import { TipTapEditor } from "@/components/editor/tiptap-editor";

type PageFormProps = {
  region: "INDIA" | "US";
  pageKey: "HOME" | "ABOUT";
  title: string;
  content?: RichTextDocument;
};

export function PageForm({ region, pageKey, title, content }: PageFormProps) {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState(title);
  const [editorContent, setEditorContent] = useState<RichTextDocument | undefined>(content);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      setMessage(null);
      const response = await fetch("/api/admin/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: pageKey,
          region,
          title: pageTitle,
          content: editorContent,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.error ?? "Unable to save page");
        return;
      }

      setMessage("Page updated");
      router.refresh();
    });
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-800">Title</label>
        <input
          type="text"
          value={pageTitle}
          onChange={(event) => setPageTitle(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800">Content</label>
        <TipTapEditor value={editorContent} onChange={setEditorContent} placeholder="Compose region-specific copy" />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-70"
      >
        {isPending ? "Saving..." : "Save page"}
      </button>
      {message && <p className="text-center text-xs text-slate-500">{message}</p>}
    </div>
  );
}

