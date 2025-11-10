import axios from "axios";


const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://web-escuela-5a74bd649ddc.herokuapp.com";


export const registerStudent = async (data: any) => {
    const url = `${BASE_URL}/api/auth/register/student`;
    const res = await axios.post(url, data);
    return res.data;
};

// Registro de profesor
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerTeacher = async (data: any) => {
    const url = `${BASE_URL}/api/auth/register/teacher`;
    const res = await axios.post(url, data);
    return res.data;
};

// Servicio interno para enviar correo de bienvenida
export const sendWelcomeEmail = async (email: string, name: string) => {
    try {
        const res = await axios.post("/api/email/welcome", {
            to: email,
            subject: "Bienvenido a Web Escuela 🎓",
            text: `Hola ${name}, bienvenido a la plataforma educativa de Web Escuela. ¡Nos alegra tenerte con nosotros!`,
        });
        return res.data;
    } catch (error) {
        console.error("Error al enviar correo:", error);
    }
};

export const sendLogin = async (email: string, password: string) => {
    const url = `${BASE_URL}/api/auth/login`;
    const res = await axios.post(url, { email, password });
    return res.data;
}


export const Getstudents = async () => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/api/student`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const GetStudentById = async (id: string) => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/api/student/${id}`;  // url con el id

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error al obtener estudiante:", err);
    return null;
  }
};


export const UpdateStudent = async (id: string, data: any) => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/api/student/${id}`;

  try {
    const res = await axios.put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error al actualizar estudiante:", err);
    return null;
  }
};


export const DeleteStudent = async (id: string) => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/api/student/${id}`;

  try {
    const res = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error al eliminar estudiante:", err);
    return null;
  }
};





export const GetStTeacher = async () => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/api/teacher`;  // url con el id

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error al obtener estudiante:", err);
    return null;
  }
};

export const UpdateTeacher = async (id: string, data: any) => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/api/teacher/${id}`;

  try {
    const res = await axios.put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error al actualizar estudiante:", err);
    return null;
  }
};


// services/authService.ts
export const DeleteTeacher = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.delete(`${BASE_URL}/api/teacher/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.status === 200; // devuelve true si todo salió bien
  } catch (err) {
    console.error("Error al eliminar profesor:", err);
    return false;
  }
};





