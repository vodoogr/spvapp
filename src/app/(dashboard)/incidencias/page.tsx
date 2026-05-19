"use client";

import { Badge, Box, Button, Card, Heading, Input, InputGroup, NativeSelect, SimpleGrid, Stack, Table, Text } from "@chakra-ui/react";
import { Filter, Search } from "lucide-react";
import { demoCriticalIncidents } from "@/data/demo";

export default function IncidentsPage() {
  return (
    <Stack gap={6}>
      <Box>
        <Text textStyle="sm" fontWeight="medium" color="blue.600" _dark={{ color: "blue.300" }}>
          Incidencias
        </Text>
        <Heading size="2xl" letterSpacing="0">
          Bandeja de postventa
        </Heading>
      </Box>
      <Card.Root borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
        <Card.Header>
          <Card.Title fontSize="sm">Filtros principales</Card.Title>
        </Card.Header>
        <Card.Body>
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={3}>
            <InputGroup startElement={<Search size={16} />}>
              <Input placeholder="Buscar incidencia, proveedor o cliente" />
            </InputGroup>
            <NativeSelect.Root>
              <NativeSelect.Field defaultValue="all">
                <option value="all">Todos los estados</option>
                <option value="open">Abiertas</option>
                <option value="resolved">Finalizadas</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <NativeSelect.Root>
              <NativeSelect.Field defaultValue="all">
                <option value="all">Todas las tiendas</option>
                <option value="sevilla">Sevilla</option>
                <option value="malaga">Malaga</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Button colorPalette="blue">
              <Filter size={16} />
            Filtrar
            </Button>
          </SimpleGrid>
        </Card.Body>
      </Card.Root>
      <Box overflowX="auto" rounded="lg" borderWidth="1px" borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
        <Table.Root minW="760px" size="sm">
          <Table.Header bg="blue.50" _dark={{ bg: "blue.950" }}>
            <Table.Row>
              <Table.ColumnHeader>Incidencia</Table.ColumnHeader>
              <Table.ColumnHeader>Tienda</Table.ColumnHeader>
              <Table.ColumnHeader>Proveedor</Table.ColumnHeader>
              <Table.ColumnHeader>Estado</Table.ColumnHeader>
              <Table.ColumnHeader>Gravedad</Table.ColumnHeader>
              <Table.ColumnHeader>Coordinador</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {demoCriticalIncidents.map((incident) => (
              <Table.Row key={incident.id}>
                <Table.Cell fontWeight="medium">{incident.id}</Table.Cell>
                <Table.Cell>{incident.store}</Table.Cell>
                <Table.Cell>{incident.supplier}</Table.Cell>
                <Table.Cell>
                  <Badge colorPalette="orange">Abierta</Badge>
                </Table.Cell>
                <Table.Cell>{incident.severity}</Table.Cell>
                <Table.Cell>{incident.coordinator}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Stack>
  );
}
