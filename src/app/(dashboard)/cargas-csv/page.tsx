"use client";

import { Box, Button, Card, Heading, NativeSelect, Stack, Text } from "@chakra-ui/react";
import { UploadCloud } from "lucide-react";

export default function CsvImportsPage() {
  return (
    <Stack gap={6}>
      <Box>
        <Text textStyle="sm" fontWeight="medium" color="blue.600" _dark={{ color: "blue.300" }}>
          Cargas CSV
        </Text>
        <Heading size="2xl" letterSpacing="0">
          Importacion con validacion
        </Heading>
      </Box>
      <Card.Root borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
        <Card.Header>
          <Card.Title fontSize="sm">Nuevo lote</Card.Title>
        </Card.Header>
        <Card.Body gap={4}>
          <NativeSelect.Root maxW="md">
            <NativeSelect.Field defaultValue="incidents">
              <option value="incidents">Incidencias</option>
              <option value="general_deliveries">Salidas generales</option>
              <option value="supplier_deliveries">Salidas fabricante</option>
              <option value="seller_deliveries">Salidas por vendedor</option>
              <option value="installer_deliveries">Salidas por montador</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Stack
            minH="44"
            align="center"
            justify="center"
            gap={3}
            rounded="lg"
            borderWidth="1px"
            borderStyle="dashed"
            borderColor="blue.200"
            bg="blue.50"
            p={6}
            textAlign="center"
            _dark={{ bg: "blue.950", borderColor: "blue.800" }}
          >
            <UploadCloud size={34} color="#2563eb" />
            <Box>
              <Text textStyle="sm" fontWeight="medium">
                Selecciona un CSV para validar
              </Text>
              <Text textStyle="xs" color="gray.600" _dark={{ color: "gray.400" }}>
                El procesamiento real se conectara al servicio de importacion.
              </Text>
            </Box>
            <Button variant="outline" colorPalette="blue">
              Elegir archivo
            </Button>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Stack>
  );
}
