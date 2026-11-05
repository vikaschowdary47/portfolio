import type { MetadataRoute } from "next";
import { ME } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${ME.site}/sitemap.xml`,
    host: ME.site,
  };
}
