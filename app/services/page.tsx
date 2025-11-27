import { Region } from "@prisma/client";
import { ServiceIndex } from "@/components/services/service-index";

export default function ServicesPage() {
  return <ServiceIndex region={Region.INDIA} regionPrefix="" />;
}

