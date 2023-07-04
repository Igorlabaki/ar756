import { DeleteOrcamentotCase } from "./deleteOrcamentoCase"

class DeleteOrcamentoController{
    constructor(private deleteOrcamentoCase: DeleteOrcamentotCase){}

    async handle(reference: string){

        const deleteOrcamento = await this.deleteOrcamentoCase.execute(
            reference
        )

        return deleteOrcamento
    }
}

export {DeleteOrcamentoController}