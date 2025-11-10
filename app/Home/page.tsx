"use client";
import { useEffect, useState } from "react";
import { Getstudents } from "../services/authService";
import Navigation from "@/components/navigation";
import { GetStudentById } from "../services/authService";
import { UpdateStudent } from "../services/authService";
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

export default function HomePage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();



  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await Getstudents();
        console.log("Datos recibidos:", data);

        const formatted = Array.isArray(data) ? data : data.data || [];

        const filtered = formatted.map((student: any) => ({
          id: student.id,
          name: student.name,
          lastName: student.lastName,
          career: student.career,
        }));

        setStudents(filtered);
      } catch (err) {
        console.error("Error al obtener los estudiantes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const cardBg = "white";
  const cardShadow = "md";

  if (loading)
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={2}>Cargando estudiantes...</Text>
      </Box>
    );

    const handleMore = async (id: string) => {
  const studentData = await GetStudentById(id);
  setSelectedStudent(studentData);
};


const handleSave = async (studentData: any) => {
  const updated = await UpdateStudent(studentData.id, studentData);
  if (updated) {
    // Crea un nuevo array con los objetos actualizados
    setStudents(prev =>
      prev.map(s => (s.id === updated.id ? { ...s, ...updated } : s))
    );

    // Actualiza el modal con la nueva referencia
    setSelectedStudent({ ...updated });
    setIsEditing(false);
  }
};

  const handleClick = () => {
    router.push("/Postpage"); // ruta a donde quieres ir
  };
return (
  <Box minH="100vh" bg="gray.100">
    <Navigation />

    {/* Modal SPA */}
    {selectedStudent && (
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
            {isEditing
              ? "Editar Estudiante"
              : `${selectedStudent.name} ${selectedStudent.lastName}`}
          </Heading>

          {/* Información o formulario editable */}
          {isEditing ? (
            <Stack >
              <Input
                placeholder="Nombre"
                value={selectedStudent.name}
                onChange={(e) =>
                  setSelectedStudent({ ...selectedStudent, name: e.target.value })
                }
              />
              <Input
                placeholder="Apellido"
                value={selectedStudent.lastName}
                onChange={(e) =>
                  setSelectedStudent({ ...selectedStudent, lastName: e.target.value })
                }
              />
              <Input
                placeholder="Carrera"
                value={selectedStudent.career}
                onChange={(e) =>
                  setSelectedStudent({ ...selectedStudent, career: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                value={selectedStudent.email || ""}
                onChange={(e) =>
                  setSelectedStudent({ ...selectedStudent, email: e.target.value })
                }
              />
              <Input
                placeholder="Phone"
                value={selectedStudent.phone || ""}
                onChange={(e) =>
                  setSelectedStudent({ ...selectedStudent, phone: e.target.value })
                }
              />
              <Input
                placeholder="Document"
                value={selectedStudent.docNumber || ""}
                onChange={(e) =>
                  setSelectedStudent({ ...selectedStudent, docNumber: e.target.value })
                }
              />
            </Stack>
          ) : (
            <Stack >
              <Text><strong>Carrera:</strong> {selectedStudent.career}</Text>
              <Text><strong>Email:</strong> {selectedStudent.email || "No disponible"}</Text>
              <Text><strong>Phone:</strong> {selectedStudent.phone || "No disponible"}</Text>
              <Text><strong>Document:</strong> {selectedStudent.docNumber || "No disponible"}</Text>
            </Stack>
          )}

          {/* Botones */}
          <Box display="flex" justifyContent="space-between" mt={6}>
            {isEditing ? (
              <>
                <Button
                  colorScheme="green"
                  onClick={() => handleSave(selectedStudent)}
                >
                  Guardar
                </Button>
                <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
              </>
            ) : (
              <>
                <Button colorScheme="yellow" onClick={() => setIsEditing(true)}>
                  Editar
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setStudents(students.filter(s => s.id !== selectedStudent.id));
                    setSelectedStudent(null);
                  }}
                >
                  Eliminar
                </Button>
                <Button onClick={() => setSelectedStudent(null)}>Cerrar</Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    )}

    {/* Lista de estudiantes */}
    <Box p={8}>
      <Flex alignItems="center" mb={6} justifyContent="space-between">
    <Heading color="blue.600">Lista de estudiantes</Heading>
    <Button backgroundColor="gray.300" size="sm" padding="5px" onClick={handleClick}>
      Hacer publicación
    </Button>
  </Flex>

      {students.length === 0 ? (
        <Text>No hay estudiantes registrados.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} justifyContent="space-between" gap="6">
          {students.map((student, index) => (
            <Box
              key={index}
              bg={cardBg}
              boxShadow={cardShadow}
              borderRadius="lg"
              overflow="hidden"
              _hover={{ transform: "scale(1.03)", transition: "0.3s" }}
            >
              {/* Encabezado */}
              <Box bg="blue.500" color="white" p={4}>
                <Heading size="md">
                  {student.name} {student.lastName}
                </Heading>
              </Box>

              {/* Cuerpo */}
              <Box p={4}>
                <Stack>
                  <Text>
                    <strong>Carrera:</strong> {student.career}
                  </Text>
                </Stack>
              </Box>

              {/* Footer con botón More */}
              <Box p={4} display="flex" justifyContent="center">
                <Button
                  size="sm"
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "blue.600", transform: "scale(1.05)" }}
                  onClick={() => handleMore(student.id)}
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


 