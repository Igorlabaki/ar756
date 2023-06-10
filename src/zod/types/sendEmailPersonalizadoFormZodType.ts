import { z } from "zod";
import { sendEmailPersonalizadoFormSchema } from "../schemas/sendEmailPersonalizadoFormZodSchema";

export type SendEmailPersonalizadoFormData = z.infer<typeof sendEmailPersonalizadoFormSchema>;
