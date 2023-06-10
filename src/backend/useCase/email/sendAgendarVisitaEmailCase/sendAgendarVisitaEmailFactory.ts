import { SendAgendarVisitaEmailCase } from "./sendAgendarVisitaEmailCase";
import { SendAgendarVisitaEmailController } from "./sendAgendarVisitaEmailController";

export const sendAgendarVisitaEmailFactory = () => {
  const sendAgendarVisitaEmailsCase        = new SendAgendarVisitaEmailCase();
  const sendAgendarVisitaEmailController   = new SendAgendarVisitaEmailController(sendAgendarVisitaEmailsCase);
  
  return sendAgendarVisitaEmailController;
};