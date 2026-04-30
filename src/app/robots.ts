import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.length > 0
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://analystos.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/case-studies/",
          "/employers",
          "/roadmap",
          "/diagnostic",
          "/paths",
          "/labs",
          "/jobs",
          "/u/",
        ],
        disallow: ["/dashboard", "/lab", "/portfolio", "/review", "/submissions"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
