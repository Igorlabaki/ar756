import { IDateEventParams, IDateEventRepository } from "@/backend/repository/IDateEventRepository"
import moment from "moment";
class CreateDateCase {
    constructor(
        private dateRepository: IDateEventRepository,
    ){}
    async execute( data : IDateEventParams ){
        const isNotAvailable = await this.dateRepository.checkAvailability({
            dataFim: data.dataFim,
            dataInicio: data.dataInicio
        });
        
        if (isNotAvailable) {
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

        if (checkEventDate && data?.tipo.includes("Evento")) {
            const error =  new Error();
            error.message = `Este orcamento ja tem data de evento agendada para ${moment(data?.dataInicio).format(
                "DD/MM/YYYY"
            )}. `
            throw error
        }

        if (checkVisitDate  && data?.tipo.includes("Visita")) {
            const error =  new Error();
            error.message = `Este orcamento ja tem data de visita agendada para ${moment(data?.dataInicio).format(
                "DD/MM/YYYY"
            )}.`
            throw error
        }

        const newDate = await this.dateRepository.create(data)

        return newDate    
    }
}

export {CreateDateCase}  