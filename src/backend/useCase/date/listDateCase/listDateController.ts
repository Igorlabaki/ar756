import { ListDatesCase } from "./listDateCase"

class ListDateController{
    constructor(private listDateCase: ListDatesCase){}

    async handle(){
    
        const dateList = await this.listDateCase.execute()

        return dateList
    }
}

export {ListDateController}