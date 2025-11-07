import { NextResponse } from "next/server";
import {
    registerStudent,
    registerTeacher,
    sendWelcomeEmail,
} from "@/app/services/authService";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            lastName,
            docNumber,
            email,
            phone,
            userName,
            password,
            career,
            specialization,
            role,
        } = body;

        let response;

        if (role === "student") {
            response = await registerStudent({
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
            });
        } else if (role === "teacher") {
            response = await registerTeacher({
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
            });
        } else {
            return NextResponse.json({ error: "Rol inválido" }, { status: 400 });
        }

        await sendWelcomeEmail(email, name);

        return NextResponse.json({
            message: "Registro exitoso y correo enviado",
            data: response,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error en registro:", error);
        return NextResponse.json(
            { error: error.response?.data || "Error interno del servidor" },
            { status: 500 }
        );
    }
}
