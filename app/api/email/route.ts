import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { to, subject, text } = await req.json();

        // Validar campos requeridos
        if (!to || !subject || !text) {
            console.log("Body recibido con campos faltantes:", { to, subject, text });
            return NextResponse.json(
                { error: "Faltan campos obligatorios: to, subject o text" },
                { status: 400 }
            );
        }

        // Configuración del transporte
        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, 
            },
        });

        // Mensaje personalizado de bienvenida
        const htmlMessage = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #004AAD;">Bienvenido a Web Escuela 🎓</h2>
        <p>Hola <strong>${to}</strong>,</p>
        <p>${text}</p>
        <p style="margin-top: 20px;">Gracias por unirte a <strong>Web Escuela</strong>. ¡Nos alegra tenerte con nosotros!</p>
        <p>Atentamente,<br>El equipo de Web Escuela</p>
      </div>
    `;

        // Enviar correo
        await transporter.sendMail({
            from: `"Web Escuela" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html: htmlMessage, 
        });

        console.log(`Correo de bienvenida enviado a: ${to}`);
        return NextResponse.json({ message: "Correo de bienvenida enviado exitosamente" });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        return NextResponse.json(
            { error: "Error al enviar el correo de bienvenida" },
            { status: 500 }
        );
    }
}
