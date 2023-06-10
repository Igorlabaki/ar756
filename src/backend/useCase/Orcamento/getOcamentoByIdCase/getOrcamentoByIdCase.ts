import { IOrcamentoRepository } from "@/backend/repository/IOrcamentoRepository"
import { Orcamento } from "@prisma/client"

class GetOrcamentoByIdCase{
    constructor(private orcamentoRepository: IOrcamentoRepository){}

    async execute(id: string){
        const orcamentoById  = await this.orcamentoRepository.getById(id)

        return orcamentoById
    }
}

export  {GetOrcamentoByIdCase} 