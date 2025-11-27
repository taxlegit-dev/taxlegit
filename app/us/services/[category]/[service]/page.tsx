import { Region } from "@prisma/client";
import { ServiceDetail } from "@/components/services/service-detail";

type UsServicePageProps = {
  params: Promise<{ category: string; service: string }>;
};

export default async function UsServicePage({ params }: UsServicePageProps) {
  const { category, service } = await params;
  return <ServiceDetail region={Region.US} regionPrefix="/us" categorySlug={category} serviceSlug={service} />;
}

