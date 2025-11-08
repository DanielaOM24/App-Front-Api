'use client';
import { useEffect, useState } from "react";
import { studentService } from "@/src/services/studentService";
import { ToastContainer, toast } from "react-toastify";
import DashboardHeader from "@/src/components/dashboardComponents/DashboardHeader";
import StudentForm from "@/src/components/dashboardComponents/StudentForm";
import StudentTable from "@/src/components/dashboardComponents/StudentTable";

export interface Student {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  docNumber?: string;
  phone?: string;
  career: string;
  startDate?: string;
  status?: boolean;
}

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState<Student>({
    name: "",
    lastName: "",
    email: "",
    docNumber: "",
    phone: "",
    career: "",
  });
  const [editing, setEditing] = useState<Student | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch {
      toast.error("Error al cargar estudiantes ");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📩 Formulario enviado:", form)
    try {
      if (editing) {
        await studentService.update(editing.id!, form);
        toast.success("Estudiante actualizado con éxito ");
      } else {
        await studentService.create(form);
        toast.success("Estudiante creado con éxito ");
      }
      resetForm();
      loadStudents();
    } catch {
      toast.error("Error al guardar estudiante ");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro deseas eliminar este estudiante?")) return;
    try {
      await studentService.delete(id);
      toast.info("Estudiante eliminado ");
      loadStudents();
    } catch {
      toast.error("Error al eliminar estudiante ");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      lastName: "",
      email: "",
      docNumber: "",
      phone: "",
      career: "",
    });
    setEditing(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <DashboardHeader title="Dashboard - Estudiantes" />

      <StudentForm
        form={form}
        setForm={setForm}
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <StudentTable
        students={students}
        onEdit={(s) => {
          setEditing(s);
          setForm(s);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}
