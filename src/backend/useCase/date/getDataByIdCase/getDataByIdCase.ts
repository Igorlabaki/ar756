import { IDateEventRepository } from "@/backend/repository/IDateEventRepository"

class GetDataByIdCase{
    constructor(private dataRepository: IDateEventRepository){}

    async execute(id: string){
        const dataById  = await this.dataRepository.getById(id)

        return dataById
    }
}

export  {GetDataByIdCase} 