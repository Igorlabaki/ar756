import { z } from "zod";
import { createDateFormSchema } from "../schemas/createDateFormZodSchema";

export type CreateDateFormData = z.infer<typeof createDateFormSchema>;
