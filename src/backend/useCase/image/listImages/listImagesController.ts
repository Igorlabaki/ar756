import { IListImagesParams } from "@/backend/repository/ImageRepository"
import { ListImagesCase } from "./listImagesCase"

class ListImagesController{
    constructor(private listImagesCase: ListImagesCase){}

    async handle(data :IListImagesParams){
    
        const imagesList = await this.listImagesCase.execute(data)

        return imagesList
    }
}

export {ListImagesController}