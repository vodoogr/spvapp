import { NextResponse } from "next/server";
import { getDataQualityFindings } from "@/services/dataQualityService";

export async function GET() {
  return NextResponse.json({ findings: await getDataQualityFindings() });
}

