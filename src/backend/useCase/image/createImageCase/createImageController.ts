import { IImageParams } from "@/backend/repository/ImageRepository"
import { CreateImageCase } from "./createImageCase"

class CreateImageController{
    constructor(private createImageCase: CreateImageCase){}

    async handle(data: IImageParams){

        const newImage = await this.createImageCase.execute(
            data
        )

        return newImage
    }
}

export {CreateImageController}