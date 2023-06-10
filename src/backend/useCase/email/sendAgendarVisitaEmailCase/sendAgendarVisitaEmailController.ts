import { ISendAgendarVisitaEmailParams, SendAgendarVisitaEmailCase } from "./sendAgendarVisitaEmailCase"

class SendAgendarVisitaEmailController{
    constructor(private sendAgendarVisitaEmailCase: SendAgendarVisitaEmailCase){}

    async handle(data: ISendAgendarVisitaEmailParams){

        const sendAgendarVisitaEmail = await this.sendAgendarVisitaEmailCase.execute(
            data
        )

        return sendAgendarVisitaEmail
    }
}

export {SendAgendarVisitaEmailController}