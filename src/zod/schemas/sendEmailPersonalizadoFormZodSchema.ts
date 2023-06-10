import { z } from "zod";

export const sendEmailPersonalizadoFormSchema = z.object({
  assunto: z.string({
    required_error: "Este campo e obrigatorio!"
  }).nonempty("Este campo e obrigatorio!"),
  email: z.string({
    required_error: "Este campo e obrigatorio!"
  }),
  nome: z.string({
    required_error: "Este campo e obrigatorio!"
  }),
  texto: z.string({
    required_error: "Este campo e obrigatorio!"
  }).nonempty("Este campo e obrigatorio!"),
})
  