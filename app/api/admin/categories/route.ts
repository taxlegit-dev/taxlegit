import { NextResponse } from "next/server";
import { Region } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCategorySchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = createCategorySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const category = await prisma.serviceCategory.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      summary: parsed.data.summary,
      region: parsed.data.region === "US" ? Region.US : Region.INDIA,
      order: parsed.data.order ?? 0,
    },
  });

  return NextResponse.json({ category });
}

