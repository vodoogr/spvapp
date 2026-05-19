"use client";

import { Settings } from "lucide-react";
import { Badge, Box, Card, Flex, Heading, HStack, Text } from "@chakra-ui/react";

const roles = ["admin", "direccion", "coordinador_postventa", "importador", "consulta"];

export default function SettingsPage() {
  return (
    <Box display="grid" gap={6}>
      <Box>
        <Text textStyle="sm" fontWeight="medium" color="blue.600" _dark={{ color: "blue.300" }}>
          Configuracion
        </Text>
        <Heading size="2xl" letterSpacing="0">
          Roles y permisos
        </Heading>
      </Box>
      <Card.Root borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
        <Card.Header>
          <Card.Title fontSize="sm">
            <HStack>
              <Settings size={20} color="#2563eb" />
            Roles base
            </HStack>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Flex flexWrap="wrap" gap={2}>
          {roles.map((role) => (
            <Badge key={role} colorPalette="blue" variant="subtle">
              {role}
            </Badge>
          ))}
          </Flex>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
