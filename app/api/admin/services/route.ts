import { NextResponse } from "next/server";
import { Region, ContentStatus } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createServiceSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = createServiceSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const region = parsed.data.region === "US" ? Region.US : Region.INDIA;

  const category = await prisma.serviceCategory.findUnique({
    where: {
      slug_region: {
        slug: parsed.data.categorySlug,
        region,
      },
    },
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const service = await prisma.service.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      region,
      status: ContentStatus.PUBLISHED,
      categoryId: category.id,
    },
  });

  return NextResponse.json({ service });
}

