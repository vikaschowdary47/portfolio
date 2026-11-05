import type { MetadataRoute } from "next";
import { PROJECTS, ME } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: ME.site, lastModified: new Date(), priority: 1 },
    ...PROJECTS.map((p) => ({ url: `${ME.site}/projects/${p.slug}`, lastModified: new Date(), priority: 0.8 })),
  ];
}
