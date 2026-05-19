"use client";

import { Badge, Box, Card, HStack, Stack, Text } from "@chakra-ui/react";
import { AlertTriangle, Link2Off } from "lucide-react";
import type { DataQualityFinding } from "@/types/domain";

const labels: Record<DataQualityFinding["type"], string> = {
  missing_delivery: "Sin albaran",
  unmatched_delivery: "Sin cruce",
  unnormalized_supplier: "Proveedor sin normalizar",
  duplicated_seller: "Vendedor duplicado",
  duplicated_installer: "Montador duplicado",
};

export function DataQualityList({ findings }: { findings: DataQualityFinding[] }) {
  return (
    <Card.Root borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
      <Card.Header>
        <Card.Title fontSize="sm">Alertas de calidad</Card.Title>
      </Card.Header>
      <Card.Body>
        <Stack gap={3}>
          {findings.map((finding) => (
            <HStack key={finding.id} align="flex-start" gap={3} rounded="md" borderWidth="1px" borderColor="blue.100" p={3} _dark={{ borderColor: "blue.900" }}>
              <Box color={finding.type === "unmatched_delivery" ? "orange.500" : "blue.500"}>
                {finding.type === "unmatched_delivery" ? <Link2Off size={20} /> : <AlertTriangle size={20} />}
              </Box>
              <Box flex="1">
                <HStack mb={1}>
                  <Badge colorPalette={finding.type === "unmatched_delivery" ? "orange" : "blue"}>{labels[finding.type]}</Badge>
                  {finding.entityId ? <Text textStyle="xs">{finding.entityId}</Text> : null}
                </HStack>
                <Text textStyle="sm" color="gray.700" _dark={{ color: "gray.300" }}>
                  {finding.message}
                </Text>
              </Box>
            </HStack>
          ))}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}

