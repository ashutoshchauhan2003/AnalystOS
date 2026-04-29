import { NextResponse } from "next/server";
import { mockProjects } from "@/data/cohort-accounts";

export async function GET() {
  return NextResponse.json({
    projects: mockProjects,
    count: mockProjects.length,
  });
}
