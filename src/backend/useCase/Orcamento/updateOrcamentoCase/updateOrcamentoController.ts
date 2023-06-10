import { UpdateOrcamentoParams } from "@/backend/repository/IOrcamentoRepository"
import { UpdateOrcamentoCase } from "./updateOrcamentoCase"




class UpdateOrcamentoController{
    constructor(private updateOrcamentoCase: UpdateOrcamentoCase){}

    async handle(data: UpdateOrcamentoParams){

        const newOrcamneto = await this.updateOrcamentoCase.execute(
            data
        )

        return newOrcamneto
    }
}

export {UpdateOrcamentoController}