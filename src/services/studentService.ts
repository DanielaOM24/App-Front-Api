import { Student } from "../app/dashboard/students/page";
import api from "../lib/axios";


export const studentService = {
  getAll: async () => {
    const res = await api.get("/Student");
    return res.data;
  },

  create: async (student: Student) => {
    const { data } = await api.post("/student", {
      name: student.name,
      lastName: student.lastName,
      career: student.career,
      startDate: student.startDate || new Date().toISOString(),
      status: student.status ?? true,
    });
    return data;
  },

  update: async (id: number, data: any) => {
    const res = await api.put(`/Student/${id}`, data);
    return res.data;
  },

  delete: async (id: number) => {
    const res = await api.delete(`/Student/${id}`);
    return res.data;
  },
};
