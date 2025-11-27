import "dotenv/config";
import { PrismaClient, Region, Role, ContentStatus, PageKey, NavbarItemType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Seed script cannot run.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

async function seedUsers() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@taxlegit.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Taxlegit Admin",
      role: Role.ADMIN,
      passwordHash,
    },
  });
}

async function seedStaticPages() {
  const defaults = [
    {
      key: PageKey.HOME,
      title: "Taxlegit India — Compliance Simplified",
      region: Region.INDIA,
    },
    {
      key: PageKey.ABOUT,
      title: "About Taxlegit India",
      region: Region.INDIA,
    },
    {
      key: PageKey.HOME,
      title: "Taxlegit US — Compliance for Founders",
      region: Region.US,
    },
    {
      key: PageKey.ABOUT,
      title: "About Taxlegit US",
      region: Region.US,
    },
  ];

  await Promise.all(
    defaults.map((page) =>
      prisma.staticPage.upsert({
        where: {
          key_region: {
            key: page.key,
            region: page.region,
          },
        },
        update: {},
        create: {
          key: page.key,
          region: page.region,
          title: page.title,
          content: {
            type: "doc",
            content: [
              {
                type: "hero",
                attrs: {
                  eyebrow: page.region === Region.INDIA ? "India" : "United States",
                  heading: page.title,
                  subheading:
                    page.region === Region.INDIA
                      ? "Registrations, compliance and legal ops for Indian startups."
                      : "Incorporation and compliance launchpad for US-bound founders.",
                  ctaLabel: "Book a strategy call",
                },
              },
            ],
          },
          status: ContentStatus.PUBLISHED,
        },
      }),
    ),
  );
}

async function seedNavigation() {
  const navs = [
    {
      region: Region.INDIA,
      items: [
        { label: "Home", href: "/", order: 0, type: NavbarItemType.LINK },
        { label: "Services", href: "/services", order: 1, type: NavbarItemType.DROPDOWN },
        { label: "Blog", href: "/blog", order: 2, type: NavbarItemType.LINK },
        { label: "About", href: "/about", order: 3, type: NavbarItemType.LINK },
        { label: "Login", href: "/login", order: 4, type: NavbarItemType.BUTTON, isLoginLink: true },
      ],
    },
    {
      region: Region.US,
      items: [
        { label: "US Home", href: "/us", order: 0, type: NavbarItemType.LINK },
        { label: "About", href: "/us/about", order: 1, type: NavbarItemType.LINK },
        { label: "Login", href: "/login", order: 2, type: NavbarItemType.BUTTON, isLoginLink: true },
      ],
    },
  ];

  for (const nav of navs) {
    for (const item of nav.items) {
      await prisma.navbarItem.upsert({
        where: {
          region_label: {
            region: nav.region,
            label: item.label,
          },
        },
        update: {
          order: item.order,
          href: item.href,
          type: item.type,
          isLoginLink: item.isLoginLink ?? false,
        },
        create: {
          label: item.label,
          href: item.href,
          order: item.order,
          region: nav.region,
          type: item.type,
          isLoginLink: item.isLoginLink ?? false,
        },
      });
    }
  }
}

async function seedServiceCatalog() {
  const catalog = [
    {
      region: Region.INDIA,
      title: "Company Registration",
      slug: "company-registration",
      summary: "Launch your company in India with entity selection support.",
      order: 0,
      services: [
        {
          title: "Private Limited Registration",
          slug: "private-limited-registration",
          excerpt: "2 directors, DSC, DIN, MoA, AoA, and compliance launch kit.",
          content: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Ideal for VC-ready startups that expect to raise capital.",
                  },
                ],
              },
            ],
          },
        },
        {
          title: "LLP Registration",
          slug: "llp-registration",
          excerpt: "Flexible structure for service firms and boutiques.",
          content: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "LLP compliance + drafting support for partner agreements.",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      region: Region.INDIA,
      title: "Government Registration",
      slug: "government-registration",
      summary: "GST, MSME, and other mandatory registrations.",
      order: 1,
      services: [
        {
          title: "GST Registration",
          slug: "gst-registration",
          excerpt: "GSTIN with advisory and first return filing.",
          content: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Get GST within 7 working days with dedicated compliance SPOC.",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      region: Region.US,
      title: "US Incorporation",
      slug: "us-incorporation",
      summary: "Delaware C-Corp incorporation for SaaS and AI founders.",
      order: 0,
      services: [
        {
          title: "Delaware C-Corp Launch",
          slug: "delaware-c-corp-launch",
          excerpt: "Stripe Atlas alternative with white-glove support.",
          content: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Includes EIN, registered agent, bylaws, cap table kickoff.",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ];

  for (const category of catalog) {
    const savedCategory = await prisma.serviceCategory.upsert({
      where: {
        slug_region: {
          slug: category.slug,
          region: category.region,
        },
      },
      update: {
        title: category.title,
        summary: category.summary,
        order: category.order ?? 0,
      },
      create: {
        title: category.title,
        slug: category.slug,
        region: category.region,
        summary: category.summary,
        order: category.order ?? 0,
      },
    });

    for (const service of category.services ?? []) {
      await prisma.service.upsert({
        where: {
          slug_region: {
            slug: service.slug,
            region: category.region,
          },
        },
        update: {
          title: service.title,
          excerpt: service.excerpt,
          content: service.content,
          status: ContentStatus.PUBLISHED,
          categoryId: savedCategory.id,
        },
        create: {
          title: service.title,
          slug: service.slug,
          excerpt: service.excerpt,
          content: service.content,
          status: ContentStatus.PUBLISHED,
          region: category.region,
          categoryId: savedCategory.id,
        },
      });
    }
  }
}

async function seedBlogs() {
  const posts = [
    {
      region: Region.INDIA,
      title: "How to choose the right entity in India",
      slug: "choose-right-entity-india",
      excerpt: "Pvt Ltd vs LLP vs OPC — a founder-first guide.",
    },
    {
      region: Region.US,
      title: "Incorporating in Delaware from India",
      slug: "delaware-from-india",
      excerpt: "Why YC companies still pick Delaware and how to stay compliant.",
    },
  ];

  for (const post of posts) {
    await prisma.blog.upsert({
      where: {
        slug_region: {
          slug: post.slug,
          region: post.region,
        },
      },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: post.excerpt,
                },
              ],
            },
          ],
        },
        status: ContentStatus.PUBLISHED,
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: post.excerpt,
                },
              ],
            },
          ],
        },
        tags: [],
        region: post.region,
        status: ContentStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });
  }
}

async function main() {
  await seedUsers();
  await seedStaticPages();
  await seedNavigation();
  await seedServiceCatalog();
  await seedBlogs();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

