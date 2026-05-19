import type { CoordinatorAssignmentInput } from "@/types/domain";

export interface CoordinatorAssignmentRule {
  id: string;
  priority: number;
  active: boolean;
  coordinatorId: string;
  storeId?: string;
  supplierId?: string;
  brandId?: string;
  incidentType?: string;
  severity?: string;
}

export function assignCoordinator(input: CoordinatorAssignmentInput, rules: CoordinatorAssignmentRule[]) {
  return rules
    .filter((rule) => rule.active)
    .sort((a, b) => a.priority - b.priority)
    .find((rule) => matchesRule(input, rule))?.coordinatorId;
}

function matchesRule(input: CoordinatorAssignmentInput, rule: CoordinatorAssignmentRule) {
  return (
    (!rule.storeId || rule.storeId === input.storeId) &&
    (!rule.supplierId || rule.supplierId === input.supplierId) &&
    (!rule.brandId || rule.brandId === input.brandId) &&
    (!rule.incidentType || rule.incidentType === input.incidentType) &&
    (!rule.severity || rule.severity === input.severity)
  );
}

