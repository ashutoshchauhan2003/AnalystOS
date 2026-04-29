import { NextResponse } from "next/server";
import { executeCohortQuery } from "@/data/cohort-accounts";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { sql?: unknown };

    if (typeof body.sql !== "string" || body.sql.trim().length === 0) {
      return NextResponse.json(
        {
          status: "invalid",
          message: "Missing SQL query.",
          columns: [],
          rows: [],
          executionTimeMs: 0,
          summary: null,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(executeCohortQuery(body.sql));
  } catch {
    return NextResponse.json(
      {
        status: "invalid",
        message: "Unable to parse query request.",
        columns: [],
        rows: [],
        executionTimeMs: 0,
        summary: null,
      },
      { status: 400 },
    );
  }
}
