import { z } from "zod";

export const createTextFormSchema = z.object({
  area:z.string({
    required_error: "Este campo e obrigatorio!"
  }).nonempty("Este campo e obrigatorio!"),
  titulo:z.string({
    required_error: "Este campo e obrigatorio!"
  }).nonempty("Este campo e obrigatorio!"),
  text: z.string({
    required_error: "Este campo e obrigatorio!"
  }).nonempty("Este campo e obrigatorio!")
})
  