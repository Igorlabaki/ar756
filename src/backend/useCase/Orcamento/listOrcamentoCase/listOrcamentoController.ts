import { ListOrcamentoParams } from "@/backend/repository/IOrcamentoRepository"
import { ListOrcamentoCase } from "./listOrcamentoCase"

class ListOrcamentoController{
    constructor(private listOrcamentoCase: ListOrcamentoCase){}

    async handle( data :ListOrcamentoParams){
    
        const orcamentoList = await this.listOrcamentoCase.execute(data)

        return orcamentoList
    }
}

export {ListOrcamentoController}