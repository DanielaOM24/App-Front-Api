'use client';

import { Student } from "@/src/app/dashboard/students/page";

interface Props {
  form: Student;
  setForm: (form: Student) => void;
  editing: Student | null;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function StudentForm({
  form,
  setForm,
  editing,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow rounded p-4 mb-8 space-y-3"
    >
      <div className="grid grid-cols-2 gap-3">
        {/* Nombre */}
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded p-2"
          required
        />

        {/* Apellido */}
        <input
          type="text"
          placeholder="Apellido"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          className="border rounded p-2"
          required
        />

        {/* Carrera */}
        <input
          type="text"
          placeholder="Carrera"
          value={form.career}
          onChange={(e) => setForm({ ...form, career: e.target.value })}
          className="border rounded p-2"
          required
        />

        {/* Fecha de inicio */}
        <input
          type="date"
          placeholder="Fecha de inicio"
          value={form.startDate ? form.startDate.split("T")[0] : ""}
          onChange={(e) =>
            setForm({ ...form, startDate: new Date(e.target.value).toISOString() })
          }
          className="border rounded p-2"
          required
        />

        {/* Estado */}
        <label className="flex items-center gap-2 col-span-2">
          <input
            type="checkbox"
            checked={form.status ?? true}
            onChange={(e) => setForm({ ...form, status: e.target.checked })}
          />
          Activo
        </label>
      </div>

      {/* Botones */}
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {editing ? "Actualizar" : "Agregar"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
