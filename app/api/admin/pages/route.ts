import { NextResponse } from "next/server";
import { Region, ContentStatus } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateStaticPageSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = updateStaticPageSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const region = parsed.data.region === "US" ? Region.US : Region.INDIA;

  const page = await prisma.staticPage.upsert({
    where: {
      key_region: {
        key: parsed.data.key,
        region,
      },
    },
    update: {
      title: parsed.data.title,
      content: parsed.data.content,
      status: ContentStatus.PUBLISHED,
    },
    create: {
      key: parsed.data.key,
      region,
      title: parsed.data.title,
      content: parsed.data.content,
      status: ContentStatus.PUBLISHED,
    },
  });

  return NextResponse.json({ page });
}

