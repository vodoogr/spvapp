"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { CsvImportWorkspace } from "@/components/uploads/csv-import-workspace";

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
      <CsvImportWorkspace />
    </Stack>
  );
}
