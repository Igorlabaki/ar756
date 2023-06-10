import { ISendPersonalizadoEmailParams, SendPersonalizadoEmailCase } from "./sendPersonalizadoEmailCase"


class SendPersonalizadoEmailController{
    constructor(private sendPersonalizadoEmailCase: SendPersonalizadoEmailCase){}

    async handle(data: ISendPersonalizadoEmailParams){

        const sendPersonalizadoEmail = await this.sendPersonalizadoEmailCase.execute(
            data
        )

        return sendPersonalizadoEmail
    }
}

export {SendPersonalizadoEmailController}