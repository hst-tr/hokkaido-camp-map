import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isPublic =
    process.env.SITE_PUBLIC === "true";

  if (!isPublic) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap:
      "https://hokkaido-camp-map.vercel.app/sitemap.xml",
  };
}