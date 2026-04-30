export type JobRole = "DA" | "BA" | "DS";
export type JobDifficulty = "entry" | "mid";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  role: JobRole;
  requiredSkills: string[];
  description: string;
  salaryRange: string;
  difficulty: JobDifficulty;
  createdAt: string;
}

export const mockJobs: Job[] = [
  {
    id: "growth-data-analyst-novalytics",
    title: "Growth Data Analyst",
    company: "Novalytics",
    location: "Bengaluru",
    role: "DA",
    requiredSkills: ["SQL", "Power BI", "Communication", "Cohort analysis"],
    description:
      "Analyze activation, retention, and revenue leakage patterns for a fast-growing SaaS team. The role needs strong SQL, dashboard judgment, and crisp business readouts.",
    salaryRange: "INR 6-10 LPA",
    difficulty: "entry",
    createdAt: "2026-04-12T09:00:00.000Z",
  },
  {
    id: "business-analyst-orbitpay",
    title: "Business Analyst - Product Operations",
    company: "OrbitPay",
    location: "Mumbai",
    role: "BA",
    requiredSkills: ["Requirements", "Excel", "Communication", "User stories"],
    description:
      "Convert ambiguous product operations needs into scoped requirements, acceptance criteria, and measurable delivery artifacts.",
    salaryRange: "INR 7-12 LPA",
    difficulty: "entry",
    createdAt: "2026-04-10T09:00:00.000Z",
  },
  {
    id: "junior-data-scientist-retainiq",
    title: "Junior Data Scientist",
    company: "RetainIQ",
    location: "Remote",
    role: "DS",
    requiredSkills: ["Python", "SQL", "EDA", "Communication"],
    description:
      "Support retention modeling and experimentation with exploratory notebooks, clean data handling, and business-readable interpretation.",
    salaryRange: "INR 8-14 LPA",
    difficulty: "entry",
    createdAt: "2026-04-08T09:00:00.000Z",
  },
  {
    id: "sales-operations-analyst-fieldstack",
    title: "Sales Operations Analyst",
    company: "FieldStack",
    location: "Gurugram",
    role: "DA",
    requiredSkills: ["Excel", "Power BI", "SQL", "Dashboard critique"],
    description:
      "Own pipeline reporting quality, executive metric hygiene, and weekly commercial insight packs for sales leadership.",
    salaryRange: "INR 7-11 LPA",
    difficulty: "mid",
    createdAt: "2026-04-07T09:00:00.000Z",
  },
  {
    id: "requirements-analyst-supplymesh",
    title: "Requirements Analyst",
    company: "SupplyMesh",
    location: "Pune",
    role: "BA",
    requiredSkills: ["Requirements", "Communication", "Excel", "Business relevance"],
    description:
      "Document workflow rules, clarify stakeholder needs, and prepare delivery-ready requirements for supply-chain tooling.",
    salaryRange: "INR 6-10 LPA",
    difficulty: "entry",
    createdAt: "2026-04-05T09:00:00.000Z",
  },
  {
    id: "product-data-analyst-cloudlane",
    title: "Product Data Analyst",
    company: "Cloudlane",
    location: "Hyderabad",
    role: "DA",
    requiredSkills: ["SQL", "Python", "Communication", "EDA"],
    description:
      "Use behavioral data to explain activation, retention, and feature adoption signals for a product-led growth team.",
    salaryRange: "INR 9-15 LPA",
    difficulty: "mid",
    createdAt: "2026-04-02T09:00:00.000Z",
  },
];

export function getJobs() {
  return mockJobs;
}

export function getJobsByRole(role: JobRole) {
  return mockJobs.filter((job) => job.role === role);
}

function mapJobRow(row: {
  id: string;
  title: string;
  company: string;
  location: string;
  role: JobRole;
  required_skills: string[];
  description: string;
  salary_range: string;
  difficulty: JobDifficulty;
  created_at: string;
}): Job {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    role: row.role,
    requiredSkills: row.required_skills,
    description: row.description,
    salaryRange: row.salary_range,
    difficulty: row.difficulty,
    createdAt: row.created_at,
  };
}

export async function getJobsFromBackend() {
  if (supabase) {
    const { data, error } = await supabase.from("jobs").select("*").order("created_at", {
      ascending: false,
    });

    if (!error && data && data.length > 0) {
      return data.map(mapJobRow);
    }
  }

  return mockJobs;
}

export async function getJobsByRoleFromBackend(role: JobRole) {
  if (supabase) {
    const { data, error } = await supabase.from("jobs").select("*").eq("role", role);

    if (!error && data) {
      return data.map(mapJobRow);
    }
  }

  return getJobsByRole(role);
}
import { supabase } from "@/lib/supabase/client";
