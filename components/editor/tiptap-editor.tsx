"use client";

import { useEffect } from "react";
import { EditorContent, useEditor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import type { RichTextDocument } from "@/types/rich-text";

type TipTapEditorProps = {
  value?: RichTextDocument;
  onChange: (value: RichTextDocument) => void;
  placeholder?: string;
};

const defaultDoc: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Describe the offering here...",
        },
      ],
    },
  ],
};

export function TipTapEditor({ value = defaultDoc, onChange, placeholder }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Start typing...",
      }),
      Link.configure({
        openOnClick: true,
      }),
      Image,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "min-h-[200px] w-full rounded-2xl border border-zinc-200 bg-white p-4 text-sm focus:border-indigo-500 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const serializedCurrent = JSON.stringify(editor.getJSON());
    const serializedIncoming = JSON.stringify(value ?? defaultDoc);
    if (serializedCurrent !== serializedIncoming) {
      editor.commands.setContent(value ?? defaultDoc);
    }
  }, [editor, value]);

  if (!editor) {
    return <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-400">Loading editor…</div>;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-500">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="rounded-full border border-zinc-200 px-2 py-1">
          Bold
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="rounded-full border border-zinc-200 px-2 py-1">
          Italic
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="rounded-full border border-zinc-200 px-2 py-1">
          List
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className="rounded-full border border-zinc-200 px-2 py-1">
          Code
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

