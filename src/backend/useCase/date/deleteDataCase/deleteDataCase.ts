import { IDateEventRepository } from "@/backend/repository/IDateEventRepository"

class DeleteDataCase{
    constructor(
        private dateEventRepository : IDateEventRepository,
    ){}

    async execute(reference: string){

        const deleteData = await this.dateEventRepository.delete(reference)

        return deleteData
    }
}

export {DeleteDataCase}