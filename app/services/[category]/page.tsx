import { Region } from "@prisma/client";
import { CategoryDetail } from "@/components/services/category-detail";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  return <CategoryDetail region={Region.INDIA} regionPrefix="" slug={category} />;
}

