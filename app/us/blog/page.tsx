import { Region } from "@prisma/client";
import { BlogIndex } from "@/components/blog/blog-index";

export default function UsBlogPage() {
  return (
    <BlogIndex
      region={Region.US}
      regionPrefix="/us"
      heading="US launch playbooks"
      description="Stories, checklists, and compliance notes produced for the US region."
    />
  );
}

