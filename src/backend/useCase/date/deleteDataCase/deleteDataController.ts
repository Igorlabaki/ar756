import { DeleteDataCase } from "./deleteDataCase"

class DeleteDataController{
    constructor(private deleteDataCase: DeleteDataCase){}

    async handle(reference: string){

        const deleteData = await this.deleteDataCase.execute(
            reference
        )

        return deleteData
    }
}

export {DeleteDataController}