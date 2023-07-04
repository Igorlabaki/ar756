import { IDateEventParams, ValidateDateParam } from "@/backend/repository/IDateEventRepository"
import { CheckDateAvailabilityCase } from "./checkDateAvailabilityCase"

class CheckDateAvailabilityController{
    constructor(private checkDateAvailabilityCase: CheckDateAvailabilityCase){}

    async handle(data: ValidateDateParam){

        const checkDateAvailabilityController = await this.checkDateAvailabilityCase.execute(
            data
        )

        return checkDateAvailabilityController
    }
}

export {CheckDateAvailabilityController}