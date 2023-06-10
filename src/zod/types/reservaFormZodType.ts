import { z } from "zod";
import { createInfoFormSchema } from "@/zod/schemas/reservaFormZodSchema";

export type CreateInfoFormData = z.infer<typeof createInfoFormSchema>;
