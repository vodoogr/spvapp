import { z } from "zod";

export const rawPayloadSchema = z.record(z.string(), z.unknown());

export const csvString = z
  .union([z.string(), z.number(), z.null(), z.undefined()])
  .transform((value) => (value === null || value === undefined ? undefined : String(value).trim()))
  .optional();

export const resolvedFlagSchema = z.union([z.literal("S"), z.literal("N")]);

