"use client";
import Link from "next/link";
import { Flex, Button, Spacer, HStack, Text } from "@chakra-ui/react";

export default function Navigation() {
  return (
    <Flex
      as="nav"
      bg="blue.600"
      color="white"
      align="center"
      px={8}
      py={4}
      boxShadow="md"
      borderBottom="1px solid"
      borderColor="blue.700"
    >
      {/* Enlaces de navegación */}
      <HStack>
        <Link href="/Home">
          <Text
            _hover={{
              textDecoration: "underline",
              color: "blue.100",
            }}
            fontWeight="medium"
            transition="color 0.2s"
          >
            Estudiantes
          </Text>
        </Link>

        <Link href="/Teachers">
          <Text
            _hover={{
              textDecoration: "underline",
              color: "blue.100",
            }}
            fontWeight="medium"
            transition="color 0.2s"
          >
            Profesores
          </Text>
        </Link>
      </HStack>

      <Spacer />

      {/* Botón de cierre */}
      <Button
        colorScheme="red"
        size="sm"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "md",
        }}
        transition="all 0.2s"
      >
        Cerrar Sesión
      </Button>
    </Flex>
  );
}

{/* <Flex bg="gray.200" justifyContent="space-between" wrap="wrap" gap="2" >
    <Box w="100px" h="50px" bg="red">1</Box>
    <Box w="100px" h="50px" bg="blue">2</Box>
    <Box w="100px" h="50px" bg="yellow">3</Box>
    <Box w="100px" h="50px" bg="green">4</Box>
</Flex> */}