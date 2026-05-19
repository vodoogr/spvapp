import { NextResponse } from "next/server";
import { getAvailableReports } from "@/services/reportService";

export async function GET() {
  return NextResponse.json({ reports: await getAvailableReports() });
}

