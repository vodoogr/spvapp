"use client";

import Link from "next/link";
import { Box, Flex, Grid, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import {
  BarChart3,
  ClipboardList,
  Database,
  Factory,
  FileText,
  Settings,
  Link2Off,
  Store,
  Truck,
  UploadCloud,
  UserRound,
} from "lucide-react";
import { modules } from "@/data/demo";
import { ColorModeToggle } from "@/components/theme/color-mode-toggle";

const icons = [
  BarChart3,
  ClipboardList,
  FileText,
  UploadCloud,
  Link2Off,
  UserRound,
  Factory,
  Factory,
  Store,
  UserRound,
  Truck,
  Settings,
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Grid
      minH="100vh"
      templateColumns={{ base: "1fr", lg: "280px 1fr" }}
      bg="blue.50"
      color="gray.900"
      _dark={{ bg: "gray.950", color: "gray.50" }}
    >
      <Box
        as="aside"
        borderRightWidth={{ base: "0", lg: "1px" }}
        borderBottomWidth={{ base: "1px", lg: "0" }}
        borderColor="blue.100"
        bg="whiteAlpha.900"
        p={{ base: 4, lg: 5 }}
        position={{ base: "static", lg: "sticky" }}
        top="0"
        h={{ base: "auto", lg: "100vh" }}
        overflowY="auto"
        _dark={{ bg: "gray.900", borderColor: "blue.900" }}
      >
        <Flex align="center" justify="space-between" gap={3} mb={6}>
          <HStack gap={3}>
            <Flex h="10" w="10" align="center" justify="center" rounded="lg" bg="blue.600" color="white">
              <Database size={20} />
            </Flex>
            <Box>
              <Text textStyle="sm" fontWeight="semibold">
                CHS Postventa
              </Text>
              <Text textStyle="xs" color="gray.500" _dark={{ color: "gray.400" }}>
                Control operativo
              </Text>
            </Box>
          </HStack>
          <ColorModeToggle />
        </Flex>
        <Stack as="nav" gap={1}>
          {modules.map((module, index) => {
            const Icon = icons[index] ?? ClipboardList;
            return (
              <Link
                key={module.href}
                href={module.href}
              >
                <HStack
                  minH="10"
                  gap={3}
                  rounded="md"
                  px={3}
                  py={2}
                  color="gray.600"
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  _dark={{ color: "gray.300", _hover: { bg: "blue.950", color: "blue.200" } }}
                >
                  <Icon size={16} />
                  <Text textStyle="sm">{module.title}</Text>
                </HStack>
              </Link>
            );
          })}
        </Stack>
      </Box>
      <Box as="main" minW="0" p={{ base: 4, md: 6, lg: 8 }}>
        {children}
      </Box>
    </Grid>
  );
}
