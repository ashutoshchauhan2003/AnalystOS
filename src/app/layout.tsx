import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.length > 0
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://analystos.vercel.app";

const siteDescription =
  "AnalystOS is a free-core job-ready analytics lab where learners practise real analyst tasks, build portfolio-ready proof, and become discoverable to recruiters.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AnalystOS",
    template: "%s | AnalystOS",
  },
  description: siteDescription,
  applicationName: "AnalystOS",
  keywords: [
    "AnalystOS",
    "business analyst portfolio",
    "data analyst learning platform",
    "analyst case study",
    "recruiter directory",
    "SQL analyst workspace",
  ],
  authors: [{ name: "AnalystOS" }],
  creator: "AnalystOS",
  publisher: "AnalystOS",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "AnalystOS",
    description: siteDescription,
    siteName: "AnalystOS",
    images: [
      {
        url: "/og-cover.svg",
        width: 1200,
        height: 630,
        alt: "AnalystOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnalystOS",
    description: siteDescription,
    images: ["/og-cover.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#03060d] text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
