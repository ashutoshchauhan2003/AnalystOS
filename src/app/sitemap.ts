import type { MetadataRoute } from "next";
import { employerCandidates } from "@/content/employer-directory";
import { labs } from "@/content/labs";
import { analystPaths } from "@/content/paths";
import { getJobs } from "@/data/jobs";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.length > 0
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://analystos.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/case-studies/churn-retention-simulation`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/employers`,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/roadmap`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/diagnostic`,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: `${siteUrl}/paths`,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${siteUrl}/labs`,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${siteUrl}/jobs`,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: `${siteUrl}/recruiters`,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: `${siteUrl}/u/demo-user`,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    ...labs.map((lab) => ({
      url: `${siteUrl}/labs/${lab.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getJobs().map((job) => ({
      url: `${siteUrl}/jobs/${job.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.68,
    })),
    ...analystPaths.map((path) => ({
      url: `${siteUrl}/paths/${path.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
    ...employerCandidates.map((candidate) => ({
      url: `${siteUrl}${candidate.profileHref}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
