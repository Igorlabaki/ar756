import { ITextParams, ITextRepository } from "@/backend/repository/ITextRepository"
import { ErrorMessage } from "@/types"

class CreateTextCase {
    constructor(
        private textRepository: ITextRepository,
    ){}
    async execute( data : ITextParams ){
        const entityExists = await this.textRepository.validateText({...data})

        if(entityExists){
            const error =  new Error();
            error.message = "Ja existe um texto com esse titulo nesta area."
            throw error
        }

        const newText = await this.textRepository.create(data)
            
        return newText    
    }
}

export {CreateTextCase}  