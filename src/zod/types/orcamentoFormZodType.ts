
import { z } from "zod";
import { creatOrcamentoFormSchema } from "../schemas/orcamentoFormZodSchema";


export type CreateAprovaOrcamentoFormData = z.infer<typeof creatOrcamentoFormSchema>;
