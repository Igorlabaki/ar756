import { GetOrcamentoByIdCase } from "./getOrcamentoByIdCase"

class GetOrcamentoByIdController {
  constructor(private getOrcamentoByIdCase: GetOrcamentoByIdCase) {}

  async handle(reference:string){
    const orcamentoById = await this.getOrcamentoByIdCase.execute(reference)

    return orcamentoById
  }
}

export {GetOrcamentoByIdController}
