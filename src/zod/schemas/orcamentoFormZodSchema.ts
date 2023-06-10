import { z } from "zod";

export const creatOrcamentoFormSchema = z.object({
  documentos: z.union([
    z.array(
      z.object({
        base64String: z.unknown(),
        fileName: z.string().nonempty(),
      })
    ),
    z.undefined(),
  ]),
  feedback: z.union([
    z.string().nonempty(),
    z.undefined(),
  ]),
  orcamentoId: z.string(),
  aprovado: z.boolean({
    required_error: "Este campo e obrigatorio!"
  }),
})
  