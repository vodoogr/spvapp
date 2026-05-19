"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  Code,
  Field,
  Flex,
  HStack,
  Input,
  NativeSelect,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { AlertTriangle, CheckCircle2, FileSpreadsheet, UploadCloud } from "lucide-react";
import Papa from "papaparse";
import { useRef, useState } from "react";
import { getDuplicateHeaders, makeUniqueHeaders, normalizeHeader } from "@/lib/csv/headers";
import { detectDuplicatedHeaders, validateHeaders } from "@/services/csvValidationService";
import type { CsvValidationIssue } from "@/types/csv";
import type { CsvImportType, ImportBatchSummary } from "@/types/domain";

const importTypes: { value: CsvImportType; label: string }[] = [
  { value: "incidents", label: "Incidencias" },
  { value: "general_deliveries", label: "Salidas generales" },
  { value: "supplier_deliveries", label: "Salidas fabricante" },
  { value: "seller_deliveries", label: "Salidas por vendedor" },
  { value: "installer_deliveries", label: "Salidas por montador" },
];

type PreviewRow = Record<string, string>;

export function CsvImportWorkspace() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<CsvImportType>("incidents");
  const [fileName, setFileName] = useState<string>();
  const [headers, setHeaders] = useState<string[]>([]);
  const [uniqueHeaders, setUniqueHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<PreviewRow[]>([]);
  const [issues, setIssues] = useState<CsvValidationIssue[]>([]);
  const [batch, setBatch] = useState<ImportBatchSummary>();
  const [isCreatingBatch, setIsCreatingBatch] = useState(false);

  const errorCount = issues.filter((issue) => issue.severity === "error").length;
  const warningCount = issues.filter((issue) => issue.severity === "warning").length;

  function handleTypeChange(nextType: CsvImportType) {
    setType(nextType);
    if (headers.length > 0) {
      setIssues([...validateHeaders(nextType, headers), ...detectDuplicatedHeaders(headers)]);
    }
  }

  function parseFile(file: File) {
    setFileName(file.name);
    setBatch(undefined);

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      preview: 25,
      transformHeader: normalizeHeader,
      complete: (result) => {
        const parsedHeaders = result.meta.fields ?? [];
        const nextUniqueHeaders = makeUniqueHeaders(parsedHeaders);
        const previewRows = result.data.slice(0, 10);
        const nextIssues = [...validateHeaders(type, parsedHeaders), ...detectDuplicatedHeaders(parsedHeaders)];

        setHeaders(parsedHeaders);
        setUniqueHeaders(nextUniqueHeaders);
        setRows(previewRows);
        setIssues(nextIssues);
      },
      error: (error) => {
        setHeaders([]);
        setUniqueHeaders([]);
        setRows([]);
        setIssues([
          {
            rowNumber: 0,
            code: "csv_parse_error",
            message: error.message,
            severity: "error",
          },
        ]);
      },
    });
  }

  async function createBatch() {
    if (!fileName || errorCount > 0) {
      return;
    }

    setIsCreatingBatch(true);
    try {
      const response = await fetch("/api/imports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, fileName }),
      });

      if (!response.ok) {
        throw new Error("No se pudo crear el lote de importacion.");
      }

      setBatch((await response.json()) as ImportBatchSummary);
    } finally {
      setIsCreatingBatch(false);
    }
  }

  return (
    <Stack gap={5}>
      <Card.Root borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
        <Card.Header>
          <Card.Title fontSize="sm">Nuevo lote CSV</Card.Title>
        </Card.Header>
        <Card.Body gap={4}>
          <Flex gap={3} direction={{ base: "column", md: "row" }}>
            <Field.Root maxW={{ base: "full", md: "320px" }}>
              <Field.Label>Tipo de archivo</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field value={type} onChange={(event) => handleTypeChange(event.target.value as CsvImportType)}>
                  {importTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>

            <Field.Root flex="1">
              <Field.Label>Archivo</Field.Label>
              <Input
                ref={inputRef}
                type="file"
                accept=".csv,text/csv"
                display="none"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    parseFile(file);
                  }
                }}
              />
              <Button variant="outline" colorPalette="blue" alignSelf="flex-start" onClick={() => inputRef.current?.click()}>
                <UploadCloud size={16} />
                Elegir CSV
              </Button>
            </Field.Root>
          </Flex>

          <Box rounded="lg" borderWidth="1px" borderStyle="dashed" borderColor="blue.200" bg="blue.50" p={5} _dark={{ bg: "blue.950", borderColor: "blue.800" }}>
            <HStack gap={3} align="flex-start">
              <FileSpreadsheet size={24} color="#2563eb" />
              <Box>
                <Text fontWeight="medium">{fileName ?? "Ningun archivo seleccionado"}</Text>
                <Text textStyle="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                  Se validan cabeceras, duplicados y una vista previa antes de guardar el lote.
                </Text>
              </Box>
            </HStack>
          </Box>
        </Card.Body>
      </Card.Root>

      {headers.length > 0 ? (
        <Card.Root borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
          <Card.Header>
            <Flex justify="space-between" gap={3} direction={{ base: "column", md: "row" }}>
              <Box>
                <Card.Title fontSize="sm">Validacion y vista previa</Card.Title>
                <Text textStyle="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                  {headers.length} columnas detectadas, {rows.length} filas de muestra.
                </Text>
              </Box>
              <HStack>
                <Badge colorPalette={errorCount > 0 ? "red" : "green"}>{errorCount} errores</Badge>
                <Badge colorPalette={warningCount > 0 ? "orange" : "blue"}>{warningCount} avisos</Badge>
              </HStack>
            </Flex>
          </Card.Header>
          <Card.Body gap={4}>
            <Stack gap={2}>
              {issues.length === 0 ? (
                <HStack color="green.600">
                  <CheckCircle2 size={18} />
                  <Text textStyle="sm">Cabeceras compatibles para crear el lote.</Text>
                </HStack>
              ) : (
                issues.map((issue, index) => (
                  <HStack key={`${issue.code}-${issue.column}-${index}`} align="flex-start" color={issue.severity === "error" ? "red.600" : "orange.500"}>
                    <AlertTriangle size={18} />
                    <Text textStyle="sm">
                      <Code>{issue.code}</Code> {issue.message}
                    </Text>
                  </HStack>
                ))
              )}
            </Stack>

            {getDuplicateHeaders(headers).length > 0 ? (
              <Box rounded="md" bg="orange.50" p={3} textStyle="sm" _dark={{ bg: "orange.950" }}>
                Duplicados detectados: {getDuplicateHeaders(headers).join(", ")}. Internamente se preparan como{" "}
                <Code>{uniqueHeaders.filter((header) => header.includes("__")).join(", ")}</Code>.
              </Box>
            ) : null}

            <Box overflowX="auto" borderWidth="1px" borderColor="blue.100" rounded="lg" _dark={{ borderColor: "blue.900" }}>
              <Table.Root minW="900px" size="sm">
                <Table.Header bg="blue.50" _dark={{ bg: "blue.950" }}>
                  <Table.Row>
                    {headers.slice(0, 10).map((header) => (
                      <Table.ColumnHeader key={header}>{header}</Table.ColumnHeader>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {rows.slice(0, 8).map((row, rowIndex) => (
                    <Table.Row key={`row-${rowIndex}`}>
                      {headers.slice(0, 10).map((header) => (
                        <Table.Cell key={`${rowIndex}-${header}`} maxW="220px" truncate>
                          {row[header]}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>

            <Flex justify="space-between" gap={3} direction={{ base: "column", md: "row" }}>
              <Text textStyle="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                La importacion completa a base de datos se conectara en el siguiente bloque.
              </Text>
              <Button colorPalette="blue" disabled={!fileName || errorCount > 0} loading={isCreatingBatch} onClick={createBatch}>
                Crear lote
              </Button>
            </Flex>

            {batch ? (
              <Box rounded="md" borderWidth="1px" borderColor="green.200" bg="green.50" p={3} _dark={{ bg: "green.950", borderColor: "green.800" }}>
                <Text textStyle="sm" fontWeight="medium">
                  Lote creado: <Code>{batch.id}</Code>
                </Text>
              </Box>
            ) : null}
          </Card.Body>
        </Card.Root>
      ) : null}
    </Stack>
  );
}

