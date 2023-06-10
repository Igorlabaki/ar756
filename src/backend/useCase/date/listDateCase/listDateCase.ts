
import { IDateEventRepository } from "../../../repository/IDateEventRepository";

class ListDatesCase {
    constructor(
        private dateRepository: IDateEventRepository,
    ){}

    async execute(){
        const dateList = await this.dateRepository.list()

        return dateList    
    }
}

export {ListDatesCase}  