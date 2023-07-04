import { min } from "moment";
import { z } from "zod";

export const createDateFormSchema = z.object({
  tipo: z.string({
    required_error: "Este campo é obrigatório!"
  }),
  titulo: z.string({
    required_error: "Este campo é obrigatório!"
  }).nonempty("Este campo é obrigatório!").min(1,"Este campo é obrigatório!"),
  data: z.string({
    required_error: "Este campo é obrigatório!"
  }).nonempty("Este campo é obrigatório!"),
  orcamentoCheck: z.boolean({
    required_error: "Este campo é obrigatório!"
  }),
  horarioFim: z.string({
    required_error: "Este campo é obrigatório!"
  }),
  horarioInicio: z.string({
    required_error: "Este campo é obrigatório!"
  }),
  orcamento: z.union([
    z.object({
      id: z.string().nullable(),
      nome: z.string().nullable(),
      texto: z.string().nullable(),
      email: z.string().nullable(),
      total: z.number().nullable(),
      limpeza: z.boolean().nullable(),
      telefone: z.string().nullable(),
      feedback: z.string().nullable(),
      contato: z.boolean().nullable(),
      valorBase: z.number().nullable(),
      convidados: z.number().nullable(),
      dataFim: z.string().nullable(),
      dataInicio: z.string().nullable(),
      seguranca: z.boolean().nullable(),
      trafegoCanal: z.string().nullable(),
      conheceEspaco: z.boolean().nullable(),
      recepcionista: z.boolean().nullable(),
      qtdHorasExtras: z.number().nullable(),
      valorHoraExtra: z.number().nullable(),
      aprovadoAr756: z.boolean().nullable(),
      aprovadoCliente: z.boolean().nullable(),
    }),
    z.undefined()
  ])
})
.refine((data) => {
    if (data.orcamentoCheck && !data.orcamento) {
      return false
    }
    return true;
  },{
    message: "Este campo é obrigatório!",
    path: ["orcamento"]
  }
)/* .refine((data) => {
  if (data.tipo && data.orcamento && data.orcamentoCheck && data.orcamento.dataInicio) {
    if (data.tipo === "Visita" && data.data > data.orcamento.dataInicio) {
      return false
    }
    return true;
  }},{
    message: "Data da visita deve ser anterior à data do evento!",
    path: ["data"]
  }
)   */
