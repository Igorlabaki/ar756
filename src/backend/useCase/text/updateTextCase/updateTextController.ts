import { IUpdateTextParams } from "@/backend/repository/ITextRepository"
import { UpdateTextCase } from "./updateTextCase"

class UpdateTextController{
    constructor(private updateTextCase: UpdateTextCase){}

    async handle(data: IUpdateTextParams){

        const updateText = await this.updateTextCase.execute(
            data
        )

        return updateText
    }
}

export {UpdateTextController}