import { IOrcamentoRepository, ListOrcamentoParams } from "@/backend/repository/IOrcamentoRepository"

class ListOrcamentoCase {
    constructor(
        private orcamentoRepository: IOrcamentoRepository,
    ){}

    async execute(data: ListOrcamentoParams){
        const orcamentoList = await this.orcamentoRepository.list(data)

        return orcamentoList    
    }
}

export {ListOrcamentoCase}  