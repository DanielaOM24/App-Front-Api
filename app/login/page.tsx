"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import FoxLogo from "@/components/ui/foxlogo";
import { Box, Flex, Heading, Text, Input, Button, VStack } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { sendLogin } from "../services/authService";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await sendLogin(email, password);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        router.push("/Home");
      } else {
        setError("No se recibió el token. Verifica tus credenciales.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Credenciales incorrectas");
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      flexDir="column"
      px={4}
      backgroundImage="url('https://images.unsplash.com/photo-1462536943532-57a629f6cc60?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1173')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <FoxLogo className="w-40 h-auto" />
      <Box bg="white" w="full" maxW="420px" rounded="md" boxShadow="md" p={8}>
        <Flex justify="center" mb={4}>
          <Heading as="h2" size="xl" mb={8} color="blue.700" fontWeight="bold" letterSpacing="wide">
            BIENVENIDO
          </Heading>
        </Flex>

        <Heading size="md" textAlign="center" color="gray.700" mb={6}>
          Iniciar sesión en tu cuenta
        </Heading>

        <form onSubmit={handleLogin}>
          <VStack>
            <Box w="full">
              <Text mb={1} fontWeight="medium" color="gray.800">
                Correo electrónico
              </Text>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@correo.com"
                _placeholder={{ color: "blackAlpha.600" }}
                color="black"
                required
              />
            </Box>

            <Box w="full">
              <Text mb={1} fontWeight="medium" color="gray.800">
                Contraseña
              </Text>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Escribe tu contraseña"
                _placeholder={{ color: "blackAlpha.600" }}
                color="black"
                required
              />
            </Box>

            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}

            <Button colorScheme="blue" w="full" type="submit" mt={2} >
              Iniciar sesión
            </Button>

            <Link href="/login/register">
              <Text fontSize="sm" color="gray.600">
                ¿No tienes cuenta?{" "}
                <Text as="span" color="blue.600" fontWeight="semibold">
                  Regístrate
                </Text>
              </Text>
            </Link>
          </VStack>
        </form>
      </Box>

      <Text fontSize="xs" color="gray.500" mt={6} textAlign="center" maxW="400px">
        Portal institucional. Uso exclusivo para usuarios registrados.
      </Text>
    </Flex>
  );
}


