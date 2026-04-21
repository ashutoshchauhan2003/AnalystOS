import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.length > 0
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://analyst-3d-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Analyst 3D",
    template: "%s | Analyst 3D",
  },
  description: "Premium analyst learning platform with cinematic depth, lab workflows, and recruiter-facing proof-of-skill.",
  applicationName: "Analyst 3D",
  keywords: [
    "business analyst portfolio",
    "data analyst learning platform",
    "analyst case study",
    "recruiter directory",
    "SQL analyst workspace",
  ],
  authors: [{ name: "Analyst 3D" }],
  creator: "Analyst 3D",
  publisher: "Analyst 3D",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Analyst 3D",
    description:
      "Premium analyst learning platform with cinematic depth, lab workflows, and recruiter-facing proof-of-skill.",
    siteName: "Analyst 3D",
    images: [
      {
        url: "/og-cover.svg",
        width: 1200,
        height: 630,
        alt: "Analyst 3D",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analyst 3D",
    description:
      "Premium analyst learning platform with cinematic depth, lab workflows, and recruiter-facing proof-of-skill.",
    images: ["/og-cover.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#03060d] text-slate-50 antialiased">{children}</body>
    </html>
  );
}
