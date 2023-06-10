import { z } from "zod";

export const createImageFormSchema = z.object({
  imageUrl: z.unknown({
    required_error: "Este campo e obrigatorio!"
  }),
  area: z.string({
    required_error: "Este campo e obrigatorio!"
  }).nonempty("Este campo e obrigatorio!"),
  legenda: z.string({
    required_error: "Este campo e obrigatorio!"
  }).nonempty("Este campo e obrigatorio!")
})
  