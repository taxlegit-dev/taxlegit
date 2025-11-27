import { Region } from "@prisma/client";
import { ServiceDetail } from "@/components/services/service-detail";

type ServicePageProps = {
  params: Promise<{ category: string; service: string }>;
};

export default async function ServicePage({ params }: ServicePageProps) {
  const { category, service } = await params;
  return <ServiceDetail region={Region.INDIA} regionPrefix="" categorySlug={category} serviceSlug={service} />;
}

