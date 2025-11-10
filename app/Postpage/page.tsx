"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navigation from "@/components/navigation";
import Link from "next/link";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  VStack
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { Select } from "@chakra-ui/select";

import { ToastContainer, toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState("student");
  const [error, setError] = useState<string | null>(null);

  // Campos comunes
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Campos adicionales
  const [lastName, setLastName] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [career, setCareer] = useState("");
  const [specialization, setSpecialization] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const BASE_URL = "https://web-escuela-5a74bd649ddc.herokuapp.com";
      const endpoint =
        role === "student"
          ? `${BASE_URL}/api/auth/register/student`
          : `${BASE_URL}/api/auth/register/teacher`;

      const payload = {
        name,
        lastName,
        docNumber,
        email,
        phone,
        userName,
        password,
        career,
        startDate: new Date().toISOString(),
        specialization,
      };

      // Registro en el backend
      const response = await axios.post(endpoint, payload);

      if (response.status === 200 || response.status === 201) {
        // Enviar correo de bienvenida
        await axios.post("/api/email", {
          to: email,
          subject: "Bienvenido a Web Escuela 🎓",
          text: `Hola ${name}, bienvenido a la plataforma educativa de Web Escuela. ¡Nos alegra tenerte con nosotros!`,
        });

        // ✅ Toast de éxito
        toast.success("Registro exitoso 🎉. Se ha enviado un correo de bienvenida.", {
          position: "top-right",
          autoClose: 4000,
        });

        // Redirigir después de un pequeño delay
        setTimeout(() => router.push("/login"), 4500);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg =
          err.response?.data?.error ||
          "Error al registrarse. Verifica tus datos e inténtalo de nuevo.";
        setError(msg);
        toast.error(msg, { position: "top-right", autoClose: 4000 });
      } else {
        setError("Ocurrió un error inesperado");
        toast.error("Ocurrió un error inesperado 😓", {
          position: "top-right",
          autoClose: 4000,
        });
      }
    }
  };

  return (
    <>
    <Navigation />
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        flexDir="column"
        px={4}
        backgroundImage="url('https://images.unsplash.com/vector-1759759516796-b2109474f29a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Box bg="white" w="full" maxW="450px" rounded="md" boxShadow="md" p={8}>
          <Heading textAlign="center" color="blue.700" mb={6}>
            REGISTRO
          </Heading>

          <form onSubmit={handleRegister}>
            <VStack>
              <Box w="full">
                <Text>Nombre</Text>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Box>

              <Box w="full">
                <Text>Apellido</Text>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Box>

              <Box w="full">
                <Text>Documento</Text>
                <Input
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  required
                />
              </Box>

              <Box w="full">
                <Text>Teléfono</Text>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Box>

              <Box w="full">
                <Text>Usuario</Text>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </Box>

              <Box w="full">
                <Text>Carrera</Text>
                <Input
                  value={career}
                  onChange={(e) => setCareer(e.target.value)}
                  required
                />
              </Box>

              <Box w="full">
                <Text>Especialización</Text>
                <Input
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                />
              </Box>

              <Box w="full">
                <Text>Correo electrónico</Text>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>

              <Box w="full">
                <Text>Contraseña</Text>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>

              <Box w="full">
                <Text>Rol</Text>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </Select>
              </Box>

              {error && <Text color="red.500">{error}</Text>}

              <Button colorScheme="blue" w="full" type="submit">
                Registrarse
              </Button>

              <Link href="/login">
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  ¿Ya tienes cuenta?{" "}
                  <Text as="span" color="blue.600" fontWeight="semibold">
                    Inicia sesión
                  </Text>
                </Text>
              </Link>
            </VStack>
          </form>
        </Box>
      </Flex>

      <ToastContainer />
    </>
  );
}
