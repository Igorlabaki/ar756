import { ITextRepository } from "@/backend/repository/ITextRepository"

class GetTextByIdCase{
    constructor(private textRepository: ITextRepository){}

    async execute(id: string){
        const textById = await this.textRepository.getById(id)

        return textById
    }
}

export  {GetTextByIdCase} 