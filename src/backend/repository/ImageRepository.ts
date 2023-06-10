import { Image } from "@prisma/client";

export interface IImageParams{
  area: string
  legenda: string;
  imageUrl: string;
}

export interface IUpdateImageParams{
  imageId: string,
  data: {
    area: string
    legenda: string;
    imageUrl: string;
  }
}

export interface IListImagesParams{
  area?: string
}

export interface IImageRepository {
  delete  :(reference: string)  => Promise<Image | null>
  getById  :(reference: string)  => Promise<Image | null>
  update  :(reference: IUpdateImageParams)  => Promise<Image | null>
  list    :(reference: IListImagesParams)  => Promise<Image[] | null>
  create  :(reference: IImageParams)  => Promise<Image | null>
}
