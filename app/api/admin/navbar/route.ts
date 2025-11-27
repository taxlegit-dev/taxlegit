import { NextResponse } from "next/server";
import { NavbarItemType, Region } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createNavItemSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = createNavItemSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const item = await prisma.navbarItem.create({
    data: {
      label: parsed.data.label,
      href: parsed.data.href,
      order: parsed.data.order ?? 0,
      type: navTypeMap[parsed.data.type],
      region: parsed.data.region === "US" ? Region.US : Region.INDIA,
      isLoginLink: parsed.data.isLoginLink ?? false,
    },
  });
const navTypeMap: Record<"LINK" | "DROPDOWN" | "BUTTON", NavbarItemType> = {
  LINK: NavbarItemType.LINK,
  DROPDOWN: NavbarItemType.DROPDOWN,
  BUTTON: NavbarItemType.BUTTON,
};

  return NextResponse.json({ item });
}

