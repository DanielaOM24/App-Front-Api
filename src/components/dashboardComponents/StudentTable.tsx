'use client';
import { Student } from "@/src/app/dashboard/students/page";


interface Props {
  students: Student[];
  onEdit: (s: Student) => void;
  onDelete: (id: number) => void;
}

export default function StudentTable({ students, onEdit, onDelete }: Props) {
  return (
    <table className="w-full border shadow-sm rounded">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 text-left">Nombre</th>
          <th className="p-2 text-left">Apellido</th>
          <th className="p-2 text-left">Correo</th>
          <th className="p-2 text-left">Carrera</th>
          <th className="p-2 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id} className="border-t hover:bg-gray-50">
            <td className="p-2">{s.name}</td>
            <td className="p-2">{s.lastName}</td>
            <td className="p-2">{s.email}</td>
            <td className="p-2">{s.career}</td>
            <td className="p-2 text-center">
              <button
                onClick={() => onEdit(s)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(s.id!)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Borrar
              </button>
            </td>
          </tr>
        ))}
        {students.length === 0 && (
          <tr>
            <td colSpan={5} className="text-center p-4 text-gray-500">
              No hay estudiantes registrados.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
