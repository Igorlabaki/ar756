import { IDateEventParams, IDateEventRepository } from "@/backend/repository/IDateEventRepository"
import { formatarData } from "@/function/formatarData";

class CreateDateCase {
    constructor(
        private dateRepository: IDateEventRepository,
    ){}
 
    async execute( data : IDateEventParams ){
        const isAvailable = await this.dateRepository.checkAvailability({
            data: data.data,
            horarioFim:data.horarioFim,
            horarioInicio: data.horarioInicio
        });
        
            if (isAvailable) {
                const error =  new Error();
                error.message = "Data nao disponivel."
                throw error
            }

        const checkEventDate = await this.dateRepository.checkIfHasEventDate({
            ...data
        });

        const checkVisitDate = await this.dateRepository.checkIfHasVisitDate({
            ...data
        });

        if (checkEventDate && data.tipo.includes("Evento")) {
            const error =  new Error();
            error.message = `Este orcamento ja tem data de evento agendada para ${formatarData(checkEventDate.data)}.`
            throw error
        }

        if (checkVisitDate  && data.tipo.includes("Visita")) {
            const error =  new Error();
            error.message = `Este orcamento ja tem data de visita agendada para ${formatarData(checkVisitDate.data)}.`
            throw error
        }


        const newDate = await this.dateRepository.create(data)

        return newDate    
    }
}

export {CreateDateCase}  