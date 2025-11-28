"use client";

import React from "react";
import type { RichTextDocument } from "@/types/rich-text";

interface RichContentProps {
  document: RichTextDocument;
  theme?: "light" | "dark";
}

export function RichContent({ document, theme = "light" }: RichContentProps) {
  if (!document?.content) {
    return null;
  }

  const baseClass = theme === "dark" ? "prose prose-invert prose-emerald max-w-none" : "prose prose-indigo max-w-none";

  return <div className={baseClass}>{document.content.map((node, index) => renderNode(node, index, theme))}</div>;
}

function renderNode(node: RichTextDocument, index: number, theme: "light" | "dark"): React.ReactNode {
  switch (node.type) {
    case "paragraph":
      return (
        <p key={index} className={`text-base ${theme === "dark" ? "text-slate-200" : "text-zinc-600"}`}>
          {node.content?.map((child, idx) => renderNode(child, idx, theme))}
        </p>
      );
    case "text":
      if (!node.text) return null;
      if (node.marks?.some((mark) => mark.type === "bold")) {
        return (
          <strong key={index} className={`font-semibold ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
            {node.text}
          </strong>
        );
      }
      if (node.marks?.some((mark) => mark.type === "italic")) {
        return (
          <em key={index} className={`italic ${theme === "dark" ? "text-slate-200" : "text-zinc-700"}`}>
            {node.text}
          </em>
        );
      }
      return (
        <span key={index} className={theme === "dark" ? "text-slate-200" : "text-zinc-600"}>
          {node.text}
        </span>
      );
    case "heading":
      const level = node.attrs?.level ?? 2;
      const headingProps = {
        key: index,
        className: `font-semibold ${theme === "dark" ? "text-white" : "text-zinc-900"}`,
        children: node.content?.map((child, idx) => renderNode(child, idx, theme)),
      };
      switch (level) {
        case 1:
          return <h1 {...headingProps} />;
        case 2:
          return <h2 {...headingProps} />;
        case 3:
          return <h3 {...headingProps} />;
        case 4:
          return <h4 {...headingProps} />;
        case 5:
          return <h5 {...headingProps} />;
        case 6:
          return <h6 {...headingProps} />;
        default:
          return <h2 {...headingProps} />;
      }
    case "bulletList":
      return (
        <ul key={index} className={`list-disc pl-6 ${theme === "dark" ? "text-slate-200" : "text-zinc-600"}`}>
          {node.content?.map((child, idx) => renderNode(child, idx, theme))}
        </ul>
      );
    case "listItem":
      return (
        <li key={index} className="mb-1">
          {node.content?.map((child, idx) => renderNode(child, idx, theme))}
        </li>
      );
    case "codeBlock":
      return (
        <pre key={index} className="rounded-lg bg-zinc-900/90 p-4 text-sm text-white">
          {node.content?.map((child, idx) => renderNode(child, idx, theme))}
        </pre>
      );
    default:
      return null;
  }
}

