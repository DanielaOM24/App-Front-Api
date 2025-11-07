import axios from "axios";

const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://web-escuela-5a74bd649ddc.herokuapp.com";

// Registro de estudiante
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
