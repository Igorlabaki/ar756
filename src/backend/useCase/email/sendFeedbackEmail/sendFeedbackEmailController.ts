import { ISendFeedbackEmailParams, SendFeedbackEmailCase } from "./sendFeedbackEmailCase"


class SendFeedBackEmailController{
    constructor(private sendFeedBackEmailCase: SendFeedbackEmailCase){}

    async handle(data: ISendFeedbackEmailParams){

        const sendFeedbackEmail = await this.sendFeedBackEmailCase.execute(
            data
        )

        return sendFeedbackEmail
    }
}

export {SendFeedBackEmailController}