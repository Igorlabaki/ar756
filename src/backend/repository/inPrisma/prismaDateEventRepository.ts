import { PrismaClient, DateEvent } from "@prisma/client";
import { IDateEventParams, IDateEventRepository, UpdateDateEventParams, ValidateDateParam, ValidateIfHasDateDateParam } from "../IDateEventRepository";


export class PrismaDateEventRepository implements IDateEventRepository {

  constructor (private readonly prisma: PrismaClient){}
  async create (dateParams: IDateEventParams): Promise<DateEvent | null> {
    return await this.prisma.dateEvent.create({
      data:{
        ...dateParams,
      }
    })
  }

  async delete (reference: string): Promise<DateEvent | null> {
    return await this.prisma.dateEvent.delete({
      where:{
        id: reference
      }
    })
  }

  async getById (reference: string): Promise<DateEvent | null> {
    return await this.prisma.dateEvent.findFirst({
      where:{
        id: reference
      }
    })
  }

  async checkAvailability({ data,horarioFim,horarioInicio}: ValidateDateParam):Promise<DateEvent | null>  {
    return await this.prisma.dateEvent.findFirst({
      where: {
        data: data,
        horarioInicio: { lte: horarioFim },
        horarioFim: { gte: horarioInicio }
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