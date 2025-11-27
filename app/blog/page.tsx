import { Region } from "@prisma/client";
import { BlogIndex } from "@/components/blog/blog-index";

export default function BlogPage() {
  return (
    <BlogIndex
      region={Region.INDIA}
      regionPrefix=""
      heading="Insights for Indian founders"
      description="Every blog post is written in the admin panel with TipTap and stored in PostgreSQL."
    />
  );
}

