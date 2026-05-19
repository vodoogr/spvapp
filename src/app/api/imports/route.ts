import { NextResponse } from "next/server";
import { z } from "zod";
import { createImportBatch } from "@/services/importService";

const createImportSchema = z.object({
  type: z.enum(["general_deliveries", "supplier_deliveries", "incidents", "seller_deliveries", "installer_deliveries"]),
  fileName: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createImportSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  }

  const batch = await createImportBatch(parsed.data.type, parsed.data.fileName);
  return NextResponse.json(batch, { status: 201 });
}

