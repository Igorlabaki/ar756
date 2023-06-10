import { ISendEmailOrcamentoAprovadoParams, SendEmailOrcAprovadoCase } from "./sendEmailOrcAprovadoCase"

class sendEmailOrcAprovadoController{
    constructor(private sendEmailOrcAprovadoCase: SendEmailOrcAprovadoCase){}

    async handle(data: ISendEmailOrcamentoAprovadoParams){

        const sendEmail = await this.sendEmailOrcAprovadoCase.execute(
            data
        )

        return sendEmail
    }
}

export {sendEmailOrcAprovadoController}