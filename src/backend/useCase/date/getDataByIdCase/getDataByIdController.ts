import { GetDataByIdCase } from "./getDataByIdCase"

class GetDataByIdController {
  constructor(private getDataByIdCase: GetDataByIdCase) {}

  async handle(reference:string){
    const dataById = await this.getDataByIdCase.execute(reference)

    return dataById
  }
}

export {GetDataByIdController}
