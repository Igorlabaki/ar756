import { ITextParams } from "@/backend/repository/ITextRepository"
import { CreateTextCase } from "./createTextCase"

class CreateTextController{
    constructor(private createTextCase: CreateTextCase){}

    async handle(data: ITextParams){
        const newText = await this.createTextCase.execute(
            data
        )
        return newText
    }
}

export {CreateTextController}