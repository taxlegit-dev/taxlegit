import { Region } from "@prisma/client";
import { ServiceIndex } from "@/components/services/service-index";

export default function UsServicesPage() {
  return <ServiceIndex region={Region.US} regionPrefix="/us" />;
}

