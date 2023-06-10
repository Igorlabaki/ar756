import { ITextRepository, IUpdateTextParams } from "@/backend/repository/ITextRepository"
import { ErrorMessage } from "@/types"

class UpdateTextCase{
    constructor(
        private textRepository : ITextRepository,
    ){}

    async execute({data,textId}: IUpdateTextParams){

        const entityExists = await this.textRepository.validateText({...data})

        if(entityExists){
            const error : ErrorMessage = {
                errorMessage: "Esta area ja possui um texto com esse titulo."
            }

            return error
        }

        const updateText = await this.textRepository.update({textId,data})

        return updateText
    }
}

export {UpdateTextCase}