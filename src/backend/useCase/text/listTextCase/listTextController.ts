import { ListTextsCase } from "./listTextsCase"

class ListTextController{
    constructor(private listTextCase: ListTextsCase){}

    async handle(){
    
        const textList = await this.listTextCase.execute()

        return textList
    }
}

export {ListTextController}