"use client";

import { ShieldCheck } from "lucide-react";
import { Badge, Box, Card, Heading, HStack, Stack, Text } from "@chakra-ui/react";

export default function CoordinatorsPage() {
  return (
    <Stack gap={6}>
      <Box>
        <Text textStyle="sm" fontWeight="medium" color="blue.600" _dark={{ color: "blue.300" }}>
          Coordinadores
        </Text>
        <Heading size="2xl" letterSpacing="0">
          Reglas de asignacion
        </Heading>
      </Box>
      <Card.Root borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
        <Card.Header>
          <Card.Title fontSize="sm">
            <HStack>
              <ShieldCheck size={20} color="#2563eb" />
            MVP Tienda a Coordinador
            </HStack>
          </Card.Title>
        </Card.Header>
        <Card.Body gap={3}>
          {["Sevilla -> Ana Ruiz", "Malaga -> Luis Marquez", "Cordoba -> Marta Leon"].map((rule) => (
            <HStack key={rule} justify="space-between" rounded="md" borderWidth="1px" borderColor="blue.100" px={3} py={2} textStyle="sm" _dark={{ borderColor: "blue.900" }}>
              <Text>{rule}</Text>
              <Badge colorPalette="green">Activa</Badge>
            </HStack>
          ))}
        </Card.Body>
      </Card.Root>
    </Stack>
  );
}
