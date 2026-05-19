"use client";

import { Badge, Box, Table } from "@chakra-ui/react";

export interface CriticalIncidentRow {
  id: string;
  store: string;
  supplier: string;
  severity: string;
  openDays: number;
  coordinator: string;
}

export function CriticalIncidentsTable({ rows }: { rows: CriticalIncidentRow[] }) {
  return (
    <Box overflowX="auto" rounded="lg" borderWidth="1px" borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
      <Table.Root minW="680px" size="sm">
        <Table.Header bg="blue.50" _dark={{ bg: "blue.950" }}>
          <Table.Row>
            <Table.ColumnHeader>Incidencia</Table.ColumnHeader>
            <Table.ColumnHeader>Tienda</Table.ColumnHeader>
            <Table.ColumnHeader>Proveedor</Table.ColumnHeader>
            <Table.ColumnHeader>Gravedad</Table.ColumnHeader>
            <Table.ColumnHeader>Dias</Table.ColumnHeader>
            <Table.ColumnHeader>Coordinador</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell fontWeight="medium">{row.id}</Table.Cell>
              <Table.Cell>{row.store}</Table.Cell>
              <Table.Cell>{row.supplier}</Table.Cell>
              <Table.Cell>
                <Badge colorPalette={row.severity === "Critica" ? "red" : "orange"}>{row.severity}</Badge>
              </Table.Cell>
              <Table.Cell>{row.openDays}</Table.Cell>
              <Table.Cell>{row.coordinator}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
