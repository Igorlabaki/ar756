
import { IImageParams, IImageRepository, IListImagesParams } from "../../../repository/ImageRepository";

class ListImagesCase {
    constructor(
        private imageRepository: IImageRepository,
    ){}

    async execute(data:IListImagesParams ){
            const imageList = await this.imageRepository.list(data)

            return imageList    
    }
}

export {ListImagesCase}  