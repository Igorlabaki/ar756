import {DateEvent } from "@prisma/client";

export interface IDateEventParams{
  tipo: string;
  data: string
  titulo: string;
  orcamentoId: string;
  horarioInicio: string;
  horarioFim:    string;
}

export interface UpdateDateEventParams{
  dateId: string,
  data: {
    tipo: string;
    titulo: string;
    dataFim: string;
    dataInicio: string;
    orcamentoId: string | null;
  }
}

export interface ValidateDateParam{
  data: string
  horarioInicio: string;
  horarioFim:    string;
}

export interface ValidateIfHasDateDateParam{
  tipo: string;
  orcamentoId: string | null;
}


export interface IDateEventRepository {
  list    :()  => Promise<DateEvent[] | null>
  delete  :(reference: string)  => Promise<DateEvent | null>
  getById  :(reference: string)  => Promise<DateEvent | null>
  create  :(reference: IDateEventParams)  => Promise<DateEvent | null>
  update  :(reference: UpdateDateEventParams)  => Promise<DateEvent | null>
  checkAvailability  :(reference: ValidateDateParam)  => Promise<DateEvent | null>
  checkIfHasEventDate  :(reference: ValidateIfHasDateDateParam)  => Promise<DateEvent | null>
  checkIfHasVisitDate  :(reference: ValidateIfHasDateDateParam)  => Promise<DateEvent | null>
}
