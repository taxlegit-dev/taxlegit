import { Region } from "@prisma/client";
import { BlogDetail } from "@/components/blog/blog-detail";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  return <BlogDetail region={Region.INDIA} slug={slug} />;
}

