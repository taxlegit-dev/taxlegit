import { Region } from "@prisma/client";
import { CategoryDetail } from "@/components/services/category-detail";

type UsCategoryPageProps = {
  params: Promise<{ category: string }>;
};

export default async function UsCategoryPage({ params }: UsCategoryPageProps) {
  const { category } = await params;
  return <CategoryDetail region={Region.US} regionPrefix="/us" slug={category} />;
}

