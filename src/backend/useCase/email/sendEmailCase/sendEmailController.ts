import { ISendEmailParams, SendEmailCase } from "./sendEmailCase"

class SendEmailController{
    constructor(private sendEmailCase: SendEmailCase){}

    async handle(data: ISendEmailParams){

        const sendEmail = await this.sendEmailCase.execute(
            data
        )

        return sendEmail
    }
}

export {SendEmailController}