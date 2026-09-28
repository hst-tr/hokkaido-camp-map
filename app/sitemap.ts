import type { MetadataRoute } from "next";
import { getCampgrounds } from "@/lib/campground";

export default function sitemap(): MetadataRoute.Sitemap {
  const isPublic =
    process.env.SITE_PUBLIC === "true";

  if (!isPublic) {
    return [];
  }

  const baseUrl = "https://hokkaido-camp-map.vercel.app";
  const campgrounds = getCampgrounds();

  const campgroundPages = campgrounds.map((campground) => ({
    url: `${baseUrl}/campground/${campground.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...campgroundPages,
  ];
}