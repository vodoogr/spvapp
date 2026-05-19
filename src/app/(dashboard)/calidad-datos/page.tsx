import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { DataQualityList } from "@/components/data-quality/data-quality-list";
import { getDataQualityFindings } from "@/services/dataQualityService";

export default async function DataQualityPage() {
  const findings = await getDataQualityFindings();

  return (
    <Stack gap={6}>
      <Box>
        <Text textStyle="sm" fontWeight="medium" color="blue.600" _dark={{ color: "blue.300" }}>
          Calidad de datos
        </Text>
        <Heading size="2xl" letterSpacing="0">
          Incidencias no cruzadas
        </Heading>
        <Text mt={2} maxW="3xl" textStyle="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Control de incidencias sin albaran, salidas no encontradas y catalogos pendientes de normalizacion.
        </Text>
      </Box>
      <DataQualityList findings={findings} />
    </Stack>
  );
}

