import { NextResponse } from "next/server";
import { mockUserProgress } from "@/data/cohort-accounts";

export async function GET() {
  return NextResponse.json(mockUserProgress);
}
