import { SendFeedbackEmailCase } from "./sendFeedbackEmailCase";
import { SendFeedBackEmailController } from "./sendFeedbackEmailController";


export const sendFeedBackEmailCaseFactory = () => {
  const sendFeedBackEmailCasesCase        = new SendFeedbackEmailCase();
  const sendFeedBackEmailCaseController   = new SendFeedBackEmailController(sendFeedBackEmailCasesCase);
  
  return sendFeedBackEmailCaseController;
};