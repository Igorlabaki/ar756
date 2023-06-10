import {Orcamento } from "@prisma/client";

export interface IOrcamentoParams{
  nome: string;
  email: string;
  texto: string;
  telefone: string;
  limpeza: boolean;
  aprovado: boolean;
  feedback?: string;
  convidados: number;
  horarioFim: string;
  dataInicio: string;
  seguranca: boolean;
  trafegoCanal: string;
  horarioInicio: string;
  conheceEspaco: boolean;
  recepcionista: boolean;
  valorBase:      number;
  qtdHorasExtras: number;
  valorHoraExtra: number;
  total:          number;
}

export interface UpdateOrcamentoParams{
  orcamentoId: string,
  data: {
    nome?: string | undefined;
    email?: string | undefined;
    texto?: string | undefined;
    limpeza?: boolean | undefined;
    telefone?: string | undefined;
    aprovado?: boolean,
    convidados?: number | undefined;
    horarioFim?: string | undefined;
    dataInicio?: string | undefined;
    seguranca?: boolean | undefined;
    trafegoCanal?: string | undefined;
    horarioInicio?: string | undefined;
    conheceEspaco?: boolean | undefined;
    recepcionista?: boolean | undefined;
    valorBase?:      number | undefined;
    qtdHorasExtras?: number | undefined;
    valorHoraExtra?: number | undefined;
    total?:          number | undefined;
    feedback?: string | undefined;
    contato?: boolean | undefined;
  }
}

export interface ListOrcamentoParams{
  field?: string,
  orderBy?: "asc" | "desc"
}


export interface IOrcamentoRepository {
  delete  :(reference: string)  => Promise<Orcamento | null>
  getById  :(reference: string)  => Promise<Orcamento | null>
  update  :(reference: UpdateOrcamentoParams)  => Promise<Orcamento | null>
  list    :(reference: ListOrcamentoParams)  => Promise<Orcamento[] | null>
  create  :(reference: IOrcamentoParams)  => Promise<Orcamento | null>
}
