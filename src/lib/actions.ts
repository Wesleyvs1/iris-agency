"use server";

import { db } from "./db";
import { contactRequests } from "./db/schema";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "O nome é muito curto"),
  email: z.string().email("E-mail inválido"),
  subject: z.string().min(2, "O assunto é muito curto"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

export async function sendContactRequest(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  try {
    const validated = contactSchema.parse({ name, email, subject, message });
    
    await db.insert(contactRequests).values({
      name: validated.name,
      email: validated.email,
      subject: validated.subject,
      message: validated.message,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    console.error("Error saving contact request:", error);
    return { success: false, error: "Ocorreu um erro ao enviar sua mensagem. Tente novamente." };
  }
}
