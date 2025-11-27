import { NextResponse } from "next/server";
import { Region, ContentStatus } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createBlogSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = createBlogSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const region = parsed.data.region === "US" ? Region.US : Region.INDIA;

  const blog = await prisma.blog.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      tags: parsed.data.tags,
      region,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  return NextResponse.json({ blog });
}

