import { IOrcamentoParams } from "@/backend/repository/IOrcamentoRepository"
import { CreateOrcamentoCase } from "./createOrcamentoCase"



class CreateOrcamentoController{
    constructor(private createOrcamnetoCase: CreateOrcamentoCase){}

    async handle(data: IOrcamentoParams){

        const newOrcamneto = await this.createOrcamnetoCase.execute(
            data
        )

        return newOrcamneto
    }
}

export {CreateOrcamentoController}