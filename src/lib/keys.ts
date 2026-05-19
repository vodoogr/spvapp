import type { DeliveryKeyParts } from "@/types/domain";

export function buildDeliveryKey(parts: DeliveryKeyParts) {
  if (!parts.company) {
    return [parts.fiscalYear, parts.series, parts.number].map(normalizeKeyPart).join("-");
  }

  return [parts.company, parts.fiscalYear, parts.series, parts.number]
    .map(normalizeKeyPart)
    .join("-");
}

export function buildIncidentDeliveryKey(parts: Omit<DeliveryKeyParts, "company">) {
  return [parts.fiscalYear, parts.series, parts.number].map(normalizeKeyPart).join("-");
}

function normalizeKeyPart(value: string) {
  return value.trim().replace(/\s+/g, "").toUpperCase();
}

