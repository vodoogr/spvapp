"use client";

import { Card } from "@chakra-ui/react";
import type { Layout, PlotData } from "plotly.js";
import { PlotlyClient } from "./plotly-client";

export function ChartCard({ title, data, layout }: { title: string; data: Partial<PlotData>[]; layout?: Partial<Layout> }) {
  return (
    <Card.Root borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
      <Card.Header>
        <Card.Title fontSize="sm">{title}</Card.Title>
      </Card.Header>
      <Card.Body pt={0}>
        <PlotlyClient data={data} layout={layout} />
      </Card.Body>
    </Card.Root>
  );
}
