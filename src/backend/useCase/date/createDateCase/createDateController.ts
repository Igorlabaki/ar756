import { CreateDateCase } from "./createDateCase"
import { IDateEventParams } from "@/backend/repository/IDateEventRepository"

class CreateDateController{
    constructor(private createDateCase: CreateDateCase){}

    async handle(data: IDateEventParams){

        const newDate = await this.createDateCase.execute(
            data
        )

        return newDate
    }
}

export {CreateDateController}