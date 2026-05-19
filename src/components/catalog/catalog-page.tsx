"use client";

import { Search } from "lucide-react";
import { Box, Card, Heading, Input, InputGroup, Stack, Text } from "@chakra-ui/react";

export function CatalogPage({ title, description }: { title: string; description: string }) {
  return (
    <Stack gap={6}>
      <Box>
        <Text textStyle="sm" fontWeight="medium" color="blue.600" _dark={{ color: "blue.300" }}>
          Catalogos
        </Text>
        <Heading size="2xl" letterSpacing="0">
          {title}
        </Heading>
        <Text mt={2} maxW="2xl" textStyle="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          {description}
        </Text>
      </Box>
      <Card.Root borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
        <Card.Header>
          <Card.Title fontSize="sm">Busqueda y normalizacion</Card.Title>
        </Card.Header>
        <Card.Body>
          <InputGroup startElement={<Search size={16} />}>
            <Input maxW="lg" placeholder="Buscar por codigo, nombre o alias" />
          </InputGroup>
        </Card.Body>
      </Card.Root>
    </Stack>
  );
}
