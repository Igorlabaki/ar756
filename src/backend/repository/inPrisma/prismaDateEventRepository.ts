import { PrismaClient, DateEvent } from "@prisma/client";
import { IDateEventParams, IDateEventRepository, UpdateDateEventParams, ValidateDateParam, ValidateIfHasDateDateParam } from "../IDateEventRepository";


export class PrismaDateEventRepository implements IDateEventRepository {

  constructor (private readonly prisma: PrismaClient){}
  async create (dateParams: IDateEventParams): Promise<DateEvent | null> {
    const dateEvent =  await this.prisma.dateEvent.create({
      data:{
        ...dateParams,
      }
    })

    if(dateParams.orcamentoId){
      await this.prisma.orcamento.update({
        where:{
          id: dateParams.orcamentoId
        },
        data:{
          aprovadoCliente: true,
          aprovadoAr756: true
        }
      })
    }

    return dateEvent
  }

  async delete (reference: string): Promise<DateEvent | null> {
    const dateEvent =   await this.prisma.dateEvent.delete({
      where:{
        id: reference
      }
    })

    if(dateEvent.orcamentoId){
      await this.prisma.orcamento.update({
        where:{
          id: dateEvent.orcamentoId
        },
        data:{
          aprovadoCliente: false,
          aprovadoAr756: false
        }
      })
    }


    return dateEvent
  }

  async getById (reference: string): Promise<DateEvent | null> {
    return await this.prisma.dateEvent.findFirst({
      where:{
        id: reference
      },
      include:{
        orcamento: true
      }
    })
  }

  async checkAvailability({dataFim,dataInicio}: ValidateDateParam):Promise<DateEvent | null>  {
    return await this.prisma.dateEvent.findFirst({
      where: {
        dataFim: { gte: dataInicio },   // Verifica se a data de fim é maior ou igual à data de início
        dataInicio: { lte: dataFim },   // Verifica se a data de início é menor ou igual à data de fim
      }
    })
  }

  async checkIfHasEventDate( reference : ValidateIfHasDateDateParam):Promise<DateEvent | null>  {
    return await this.prisma.dateEvent.findFirst({
      where: {
        orcamentoId: reference.orcamentoId,
        tipo: "Evento"
      }
    })
  }

  async checkIfHasVisitDate( reference : ValidateIfHasDateDateParam):Promise<DateEvent | null>  {
    return await this.prisma.dateEvent.findFirst({
      where: {
        orcamentoId: reference.orcamentoId,
        tipo: "Visita"
      }
    })
  }

  async update ({data,dateId}: UpdateDateEventParams): Promise<DateEvent | null> {
    return await this.prisma.dateEvent.update({
      where:{
        id: dateId
      },
      data:{
        ...data
      }
    })
  }

  async list (): Promise<DateEvent[]> {
    return await this.prisma.dateEvent.findMany({
      include:{
        orcamento: true
      }
    })
  }
}