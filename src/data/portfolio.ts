import { supabase } from "@/lib/supabase/client";

export interface Portfolio {
  userId: string;
  name: string;
  headline: string;
  role: string;
  bio: string;
  skills: string[];
  projects: string[];
  published: boolean;
  createdAt: string;
}

export type PortfolioUpdate = Partial<Omit<Portfolio, "userId" | "createdAt">> & {
  userId?: string;
};

const PORTFOLIO_STORAGE_KEY = "analystos.localPortfolio";

export const mockPortfolio: Portfolio = {
  userId: "demo-user",
  name: "Demo Analyst",
  headline: "Aspiring Data Analyst",
  role: "Data Analyst Candidate",
  bio:
    "Analytics learner building job-ready proof through SQL challenges, dashboard critique, and business-focused recommendations.",
  skills: ["SQL", "Dashboard critique", "Cohort analysis", "Insight storytelling"],
  projects: ["sub-sql-join-001", "sub-debug-sql-001"],
  published: false,
  createdAt: "2026-04-20T09:00:00.000Z",
};

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readStoredPortfolio() {
  if (!canUseStorage()) {
    return undefined;
  }

  const raw = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY);

  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(raw) as Portfolio;
  } catch {
    window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
    return undefined;
  }
}

function writeStoredPortfolio(portfolio: Portfolio) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
}

export async function getPortfolioByUser(userId: string) {
  if (supabase) {
    const [{ data: portfolioRow, error: portfolioError }, { data: profileRow }] =
      await Promise.all([
        supabase.from("portfolios").select("*").eq("user_id", userId).maybeSingle(),
        supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      ]);

    if (!portfolioError && portfolioRow) {
      return {
        userId: portfolioRow.user_id,
        name: profileRow?.name ?? mockPortfolio.name,
        headline: portfolioRow.headline,
        role: profileRow?.role ?? mockPortfolio.role,
        bio: portfolioRow.bio,
        skills: portfolioRow.skills,
        projects: portfolioRow.projects,
        published: portfolioRow.published,
        createdAt: portfolioRow.created_at,
      } satisfies Portfolio;
    }
  }

  const stored = readStoredPortfolio();

  if (stored?.userId === userId) {
    return stored;
  }

  return mockPortfolio.userId === userId ? mockPortfolio : undefined;
}

export async function updatePortfolio(data: PortfolioUpdate) {
  const userId = data.userId ?? mockPortfolio.userId;
  const current = (await getPortfolioByUser(userId)) ?? {
    ...mockPortfolio,
    userId,
    projects: [],
    createdAt: new Date().toISOString(),
  };

  const next: Portfolio = {
    ...current,
    ...data,
    userId,
    createdAt: current.createdAt,
  };

  if (supabase) {
    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: userId,
        name: next.name,
        email: `${userId}@analystos.local`,
        role: next.role,
      },
      { onConflict: "id" },
    );

    const { data: portfolioRow, error: portfolioError } = await supabase
      .from("portfolios")
      .upsert(
        {
          user_id: userId,
          headline: next.headline,
          bio: next.bio,
          skills: next.skills,
          projects: next.projects,
          published: next.published,
          created_at: next.createdAt,
        },
        { onConflict: "user_id" },
      )
      .select("*")
      .single();

    if (!profileError && !portfolioError && portfolioRow) {
      return {
        ...next,
        headline: portfolioRow.headline,
        bio: portfolioRow.bio,
        skills: portfolioRow.skills,
        projects: portfolioRow.projects,
        published: portfolioRow.published,
        createdAt: portfolioRow.created_at,
      };
    }
  }

  writeStoredPortfolio(next);
  return next;
}
