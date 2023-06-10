import { z } from "zod";
import { createImageFormSchema } from "../schemas/createImageFormZodSchema";

export type CreateImageFormData = z.infer<typeof createImageFormSchema>;
