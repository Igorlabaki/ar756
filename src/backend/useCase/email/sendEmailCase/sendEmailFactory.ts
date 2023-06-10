import { SendEmailCase } from "./sendEmailCase";
import { SendEmailController } from "./sendEmailController";

export const sendEmailFactory = () => {
  const sendEmailsCase        = new SendEmailCase();
  const sendEmailController   = new SendEmailController(sendEmailsCase);
  
  return sendEmailController;
};