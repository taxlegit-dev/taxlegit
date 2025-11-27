export type RichTextDocument = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  content?: RichTextDocument[];
  marks?: { type: string }[];
};

