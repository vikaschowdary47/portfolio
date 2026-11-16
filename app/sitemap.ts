import type { MetadataRoute } from "next";
import { PROJECTS, ME } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: ME.site, lastModified: new Date(), priority: 1 },
    { url: `${ME.site}/projects`, lastModified: new Date(), priority: 0.9 },
    ...PROJECTS.map((p) => ({ url: `${ME.site}/projects/${p.slug}`, lastModified: new Date(), priority: 0.8 })),
  ];
}
