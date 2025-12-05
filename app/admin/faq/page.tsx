import { Region } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { RegionFilter } from "@/components/admin/region-filter";
import { FAQManager } from "@/components/admin/faq-manager";

type AdminFAQPageProps = {
  searchParams?: Promise<{ region?: string; navbarItemId?: string }>;
};

export default async function AdminFAQPage({ searchParams }: AdminFAQPageProps) {
  const params = await searchParams;
  const selectedRegion = params?.region === "US" ? Region.US : Region.INDIA;
  const selectedNavbarItemId = params?.navbarItemId;

  // Fetch all navbar items for the selected region (only LINK type items with href)
  const navItems = await prisma.navbarItem.findMany({
    where: {
      region: selectedRegion,
      type: "LINK",
      href: { not: null },
      isActive: true,
    },
    orderBy: { order: "asc" },
  });

  // Fetch existing FAQ if navbarItemId is selected
  let existingFAQ = null;
  if (selectedNavbarItemId) {
    existingFAQ = await prisma.servicePageFAQ.findUnique({
      where: {
        navbarItemId: selectedNavbarItemId,
      },
      include: {
        questions: {
          orderBy: { order: "asc" },
        },
      },
    });
  }

  // Get navbar item details if FAQ exists
  let navbarItem = null;
  if (existingFAQ || selectedNavbarItemId) {
    navbarItem = await prisma.navbarItem.findUnique({
      where: { id: selectedNavbarItemId || existingFAQ?.navbarItemId || "" },
    });
  }

  // Fetch all FAQs for this region
  const allFAQs = await prisma.servicePageFAQ.findMany({
    where: { region: selectedRegion },
    include: {
      questions: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  // Get navbar items for all FAQs
  const faqsWithNavItems = await Promise.all(
    allFAQs.map(async (faq) => {
      const navItem = await prisma.navbarItem.findUnique({
        where: { id: faq.navbarItemId },
      });
      return { ...faq, navbarItem: navItem };
    })
  );

  return (
    <div className="space-y-8 text-black">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">FAQ Sections</p>
          <h1 className="text-3xl font-semibold text-slate-900">Add FAQ</h1>
          <p className="mt-2 text-sm text-slate-600">
            Create and manage FAQ sections for dynamic service pages
          </p>
        </div>
        <RegionFilter value={selectedRegion === Region.US ? "US" : "INDIA"} />
      </div>
      <FAQManager
        region={selectedRegion === Region.US ? "US" : "INDIA"}
        navItems={navItems}
        selectedNavbarItemId={selectedNavbarItemId || undefined}
        existingFAQ={existingFAQ}
        navbarItem={navbarItem}
        allFAQs={faqsWithNavItems}
      />
    </div>
  );
}

