"use client";

import { Box, Card, Flex, Icon as ChakraIcon, Text } from "@chakra-ui/react";
import { AlertTriangle, CheckCircle2, Clock, Euro } from "lucide-react";

type KpiIconName = "clock" | "check" | "euro" | "alert";

const icons = {
  clock: Clock,
  check: CheckCircle2,
  euro: Euro,
  alert: AlertTriangle,
};

export function KpiCard({
  title,
  value,
  helper,
  icon,
}: {
  title: string;
  value: string;
  helper: string;
  icon: KpiIconName;
}) {
  const MetricIcon = icons[icon];

  return (
    <Card.Root borderColor="blue.100" bg="white" _dark={{ bg: "gray.900", borderColor: "blue.900" }}>
      <Card.Body gap={3}>
        <Flex align="center" justify="space-between" gap={3}>
          <Text textStyle="sm" color="gray.500" _dark={{ color: "gray.400" }}>
            {title}
          </Text>
          <Flex h="8" w="8" align="center" justify="center" rounded="md" bg="blue.50" color="blue.600" _dark={{ bg: "blue.950", color: "blue.200" }}>
            <ChakraIcon as={MetricIcon} boxSize={4} />
          </Flex>
        </Flex>
        <Box>
          <Text fontSize="2xl" fontWeight="semibold" letterSpacing="0">
            {value}
          </Text>
          <Text mt={1} textStyle="xs" color="gray.500" _dark={{ color: "gray.400" }}>
            {helper}
          </Text>
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
