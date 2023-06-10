import { IImageParams, IImageRepository } from "@/backend/repository/ImageRepository"


class CreateImageCase {
    constructor(
        private imageRepository: IImageRepository,
    ){}
 
    async execute( data : IImageParams ){
        const newImage = await this.imageRepository.create(data)
        
        return newImage    
    }
}

export {CreateImageCase}  