"use client";

import { Box, Button, Card, Heading, HStack, NativeSelect, SimpleGrid, Text } from "@chakra-ui/react";
import { Download, FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <Box display="grid" gap={6}>
      <Box>
        <Text textStyle="sm" fontWeight="medium" color="blue.600" _dark={{ color: "blue.300" }}>
          Informes
        </Text>
        <Heading size="2xl" letterSpacing="0">
          Constructor de informes
        </Heading>
      </Box>
      <Card.Root borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
        <Card.Header>
          <Card.Title fontSize="sm">Parametros</Card.Title>
        </Card.Header>
        <Card.Body>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={3} alignItems="center">
            <NativeSelect.Root>
              <NativeSelect.Field defaultValue="general">
                <option value="general">General postventa</option>
                <option value="coordinator">Por coordinador</option>
                <option value="supplier">Por proveedor</option>
                <option value="quality">Calidad de datos</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <HStack gap={2} color="gray.600" _dark={{ color: "gray.400" }}>
              <FileText size={16} />
            Filtros persistentes por fecha, tienda, proveedor, marca, vendedor, montador y gravedad.
            </HStack>
            <Button colorPalette="blue">
              <Download size={16} />
              Generar
            </Button>
          </SimpleGrid>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
