import { DeleteTextCase } from "./deleteTextCase"

class DeleteTextController{
    constructor(private deleteTextCase: DeleteTextCase){}

    async handle(reference: string){

        const deleteText = await this.deleteTextCase.execute(
            reference
        )

        return deleteText
    }
}

export {DeleteTextController}