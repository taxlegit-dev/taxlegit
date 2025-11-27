import { ContentStatus, PageKey, Region } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getStaticPage(region: Region, key: PageKey) {
  return prisma.staticPage.findUnique({
    where: {
      key_region: {
        key,
        region,
      },
    },
  });
}

export async function getServiceCategories(region: Region) {
  return prisma.serviceCategory.findMany({
    where: { region },
    orderBy: { order: "asc" },
    include: {
      services: {
        where: {
          status: ContentStatus.PUBLISHED,
        },
        orderBy: {
          title: "asc",
        },
      },
    },
  });
}

export async function getServiceBySlugs(region: Region, categorySlug: string, serviceSlug: string) {
  return prisma.service.findFirst({
    where: {
      region,
      slug: serviceSlug,
      category: {
        slug: categorySlug,
      },
    },
    include: {
      category: true,
    },
  });
}

export async function getServicesByCategory(region: Region, categorySlug: string) {
  return prisma.service.findMany({
    where: {
      region,
      status: ContentStatus.PUBLISHED,
      category: {
        slug: categorySlug,
      },
    },
    orderBy: {
      title: "asc",
    },
  });
}

export async function getBlogs(region: Region) {
  return prisma.blog.findMany({
    where: { region, status: ContentStatus.PUBLISHED },
    orderBy: {
      publishedAt: "desc",
    },
  });
}

export async function getBlogBySlug(region: Region, slug: string) {
  return prisma.blog.findUnique({
    where: {
      slug_region: {
        slug,
        region,
      },
    },
  });
}

