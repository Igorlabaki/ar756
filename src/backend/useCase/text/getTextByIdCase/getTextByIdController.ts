import { GetTextByIdCase } from "./getTextByIdCase"

class GetTextByIdController {
  constructor(private getTextByIdCase: GetTextByIdCase) {}

  async handle(reference:string){
    const textById = await this.getTextByIdCase.execute(reference)

    return textById
  }
}

export {GetTextByIdController}
