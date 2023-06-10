import { Text } from "@prisma/client";

export interface ITextParams{
  area: string;
  titulo:string;
  text: string;
}

export interface IUpdateTextParams{
  textId: string,
  data: {
    area: string;
    titulo:string;
    text: string;
  }
}

export interface IValidateTextParams{
  area: string;
  titulo:string;
}

export interface ITextRepository {
  list    :()  => Promise<Text[] | null>
  delete  :(reference: string)  => Promise<Text | null>
  getById  :(reference: string)  => Promise<Text | null>
  validateText  :(reference: IValidateTextParams)  => Promise<Text | null>
  create  :(reference: ITextParams)  => Promise<Text | null>
  update  :(reference: IUpdateTextParams)  => Promise<Text | null>
}
