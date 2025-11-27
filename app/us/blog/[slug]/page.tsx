import { Region } from "@prisma/client";
import { BlogDetail } from "@/components/blog/blog-detail";

type UsBlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function UsBlogDetailPage({ params }: UsBlogDetailPageProps) {
  const { slug } = await params;
  return <BlogDetail region={Region.US} slug={slug} />;
}

