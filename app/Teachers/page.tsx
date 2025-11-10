"use client";
import { useEffect, useState } from "react";
import { GetStTeacher,  UpdateTeacher, DeleteTeacher } from "../services/authService";
import Navigation from "@/components/navigation";
import { useRouter } from "next/navigation";

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Stack,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await GetStTeacher();
        const formatted = Array.isArray(data) ? data : data.data || [];

        const filtered = formatted.map((teacher: any) => ({
          id: teacher.id,
          name: teacher.name,
          lastName: teacher.lastName,
          career: teacher.career,
          email: teacher.email,
          phone: teacher.phone,
          docNumber: teacher.docNumber,
        }));

        setTeachers(filtered);
      } catch (err) {
        console.error("Error al obtener los profesores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const cardBg = "white";
  const cardShadow = "md";

  if (loading)
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={2}>Cargando profesores...</Text>
      </Box>
    );

const handleMore = async (id: string) => {
  const teacherData = await GetStTeacher(id); // ✅ obtener un solo profesor
  setSelectedTeacher(teacherData);
};


  const handleSave = async (teacherData: any) => {
    const updated = await UpdateTeacher(teacherData.id, teacherData);
    if (updated) {
      setTeachers(prev => prev.map(t => (t.id === updated.id ? { ...t, ...updated } : t)));
      setSelectedTeacher({ ...updated });
      setIsEditing(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("¿Estás seguro de eliminar este profesor?");
    if (!confirmed) return;

    const deleted = await DeleteTeacher(id);
    if (deleted) {
      setTeachers(prev => prev.filter(t => t.id !== id));
      setSelectedTeacher(null);
    } else {
      alert("No se pudo eliminar el profesor. Intenta de nuevo.");
    }
  };

  const handleClick = () => router.push("/Postpage"); // ejemplo de ruta

  return (
    <Box minH="100vh" bg="gray.100">
      <Navigation />

      {/* Modal SPA */}
      {selectedTeacher && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bg="blackAlpha.600"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex={1000}
        >
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="lg"
            maxW="600px"
            width="90%"
            overflowY="auto"
          >
            <Heading size="lg" mb={4}>
              {isEditing ? "Editar Profesor" : `${selectedTeacher.name} ${selectedTeacher.lastName}`}
            </Heading>

            {isEditing ? (
              <Stack>
                <Input
                  placeholder="Nombre"
                  value={selectedTeacher.name}
                  onChange={(e) => setSelectedTeacher({ ...selectedTeacher, name: e.target.value })}
                />
                <Input
                  placeholder="Apellido"
                  value={selectedTeacher.lastName}
                  onChange={(e) => setSelectedTeacher({ ...selectedTeacher, lastName: e.target.value })}
                />
                <Input
                  placeholder="Carrera"
                  value={selectedTeacher.career}
                  onChange={(e) => setSelectedTeacher({ ...selectedTeacher, career: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  value={selectedTeacher.email || ""}
                  onChange={(e) => setSelectedTeacher({ ...selectedTeacher, email: e.target.value })}
                />
                <Input
                  placeholder="Phone"
                  value={selectedTeacher.phone || ""}
                  onChange={(e) => setSelectedTeacher({ ...selectedTeacher, phone: e.target.value })}
                />
                <Input
                  placeholder="Documento"
                  value={selectedTeacher.docNumber || ""}
                  onChange={(e) => setSelectedTeacher({ ...selectedTeacher, docNumber: e.target.value })}
                />
              </Stack>
            ) : (
              <Stack>
                <Text><strong>Carrera:</strong> {selectedTeacher.career}</Text>
                <Text><strong>Email:</strong> {selectedTeacher.email || "No disponible"}</Text>
                <Text><strong>Phone:</strong> {selectedTeacher.phone || "No disponible"}</Text>
                <Text><strong>Documento:</strong> {selectedTeacher.docNumber || "No disponible"}</Text>
              </Stack>
            )}

            <Box display="flex" justifyContent="space-between" mt={6}>
              {isEditing ? (
                <>
                  <Button colorScheme="green" onClick={() => handleSave(selectedTeacher)}>Guardar</Button>
                  <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
                </>
              ) : (
                <>
                  <Button colorScheme="yellow" onClick={() => setIsEditing(true)}>Editar</Button>
                  <Button colorScheme="red" onClick={() => handleDelete(selectedTeacher.id)}>Eliminar</Button>
                  <Button onClick={() => setSelectedTeacher(null)}>Cerrar</Button>
                </>
              )}
            </Box>
          </Box>
        </Box>
      )}

      {/* Lista de profesores */}
      <Box p={8}>
        <Flex alignItems="center" mb={6} justifyContent="space-between">
          <Heading color="blue.600">Lista de Profesores</Heading>
          <Button backgroundColor="gray.300" size="sm" padding="5px" onClick={handleClick}>
            Hacer publicación
          </Button>
        </Flex>

        {teachers.length === 0 ? (
          <Text>No hay profesores registrados.</Text>
        ) : (
          <SimpleGrid columns={[1, 2, 3]} justifyContent="space-between" gap="6">
            {teachers.map((teacher) => (
              <Box
                key={teacher.id}
                bg={cardBg}
                boxShadow={cardShadow}
                borderRadius="lg"
                overflow="hidden"
                _hover={{ transform: "scale(1.03)", transition: "0.3s" }}
              >
                <Box bg="blue.500" color="white" p={4}>
                  <Heading size="md">{teacher.name} {teacher.lastName}</Heading>
                </Box>
                <Box p={4}>
                  <Stack>
                    <Text><strong>Carrera:</strong> {teacher.career}</Text>
                  </Stack>
                </Box>
                <Box p={4} display="flex" justifyContent="center">
                  <Button
                    size="sm"
                    bg="blue.500"
                    color="white"
                    _hover={{ bg: "blue.600", transform: "scale(1.05)" }}
                    onClick={() => handleMore(teacher.id)}
                  >
                    More
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}
