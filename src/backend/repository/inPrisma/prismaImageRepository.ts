import { PrismaClient, Image } from "@prisma/client";
import { IImageParams, IImageRepository, IListImagesParams, IUpdateImageParams } from "../ImageRepository";


export class PrismaImageRepository implements IImageRepository {

  constructor (private readonly prisma: PrismaClient){}

  async create (ImageParams: IImageParams): Promise<Image | null> {
    return await this.prisma.image.create({
      data:{
        ...ImageParams
      }
    })
  }

  async delete (reference: string): Promise<Image | null> {
    return await this.prisma.image.delete({
      where:{
        id: reference
      }
    })
  }

  async getById (reference: string): Promise<Image | null> {
    return await this.prisma.image.findFirst({
      where:{
        id: reference
      }
    })
  }

  async update ({data,imageId}: IUpdateImageParams): Promise<Image | null> {
    return await this.prisma.image.update({
      where:{
        id: imageId
      },
      data:{
        ...data
      }
    })
  }

  async list (reference: IListImagesParams): Promise<Image[]> {
    return await this.prisma.image.findMany({})
  }
}