import {DateEvent } from "@prisma/client";
export interface IDateEventParams{
  tipo: string  ;
  titulo: string  ;
  dataInicio: Date ;
  dataFim:    Date  ;
  orcamentoId: string  ;
}

export interface UpdateDateEventParams{
  dateId: string,
  data: {
    tipo?: string;
    titulo?: string;
    dataFim?: Date;
    dataInicio?: Date;
    orcamentoId?: string | null;
  }
}

export interface ValidateDateParam{
  dataInicio: Date ;
  dataFim:    Date;
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
