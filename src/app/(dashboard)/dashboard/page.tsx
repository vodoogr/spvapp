"use client";

import { Box, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { TrendingUp } from "lucide-react";
import { ChartCard } from "@/components/charts/chart-card";
import { KpiCard } from "@/components/kpi/kpi-card";
import { CriticalIncidentsTable } from "@/components/tables/simple-table";
import {
  demoCriticalIncidents,
  demoIncidentsByStore,
  demoKpis,
  demoStatusBreakdown,
  demoSupplierRanking,
} from "@/data/demo";

export default function DashboardPage() {
  const summary = {
    kpis: demoKpis,
    statusBreakdown: demoStatusBreakdown,
    incidentsByStore: demoIncidentsByStore,
    supplierRanking: demoSupplierRanking,
    criticalIncidents: demoCriticalIncidents,
  };

  const statusData = [
    {
      type: "pie" as const,
      hole: 0.62,
      labels: summary.statusBreakdown.map((item) => item.name),
      values: summary.statusBreakdown.map((item) => item.value),
      marker: { colors: ["#1d4ed8", "#38bdf8"] },
    },
  ];

  const storeData = [
    {
      type: "bar" as const,
      x: summary.incidentsByStore.map((item) => item.name),
      y: summary.incidentsByStore.map((item) => item.value),
      marker: { color: "#2563eb" },
    },
  ];

  const supplierData = [
    {
      type: "bar" as const,
      orientation: "h" as const,
      x: summary.supplierRanking.map((item) => item.value).reverse(),
      y: summary.supplierRanking.map((item) => item.name).reverse(),
      marker: { color: "#1e40af" },
    },
  ];

  return (
    <Stack gap={6}>
      <Box>
        <Text textStyle="sm" fontWeight="medium" color="blue.600" _dark={{ color: "blue.300" }}>
          Dashboard Postventa
        </Text>
        <Heading size="2xl" letterSpacing="0">
          Control operativo de incidencias CHS
        </Heading>
        <Text mt={2} maxW="3xl" textStyle="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Vista ejecutiva para seguimiento de abiertas, finalizadas, costes, criticidad y calidad de cruce con salidas.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap={4}>
        <KpiCard title="Abiertas" value={String(summary.kpis.openIncidents)} helper="Pendientes de resolucion" icon="clock" />
        <KpiCard
          title="Finalizadas"
          value={String(summary.kpis.resolvedIncidents)}
          helper={`${summary.kpis.resolutionRate}% de resolucion`}
          icon="check"
        />
        <KpiCard title="Coste total" value={`${summary.kpis.totalCost.toLocaleString("es-ES")} EUR`} helper="Coste acumulado" icon="euro" />
        <KpiCard title="Criticas" value={String(summary.kpis.criticalIncidents)} helper="Requieren seguimiento" icon="alert" />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, xl: 3 }} gap={4}>
        <ChartCard title="Abiertas vs finalizadas" data={statusData} layout={{ showlegend: true }} />
        <ChartCard title="Incidencias por tienda" data={storeData} />
        <ChartCard title="Ranking proveedores" data={supplierData} layout={{ margin: { l: 120, r: 18, t: 14, b: 38 } }} />
      </SimpleGrid>

      <Stack gap={3}>
        <HStack gap={2}>
          <TrendingUp size={20} color="#2563eb" />
          <Heading size="md">Incidencias abiertas criticas</Heading>
        </HStack>
        <CriticalIncidentsTable rows={summary.criticalIncidents} />
      </Stack>
    </Stack>
  );
}
