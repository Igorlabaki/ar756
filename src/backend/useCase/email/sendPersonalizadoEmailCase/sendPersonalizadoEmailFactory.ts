import { SendPersonalizadoEmailCase } from "./sendPersonalizadoEmailCase";
import { SendPersonalizadoEmailController } from "./sendPersonalizadoEmailController";

export const sendPersonalizadoEmailCaseFactory = () => {
  const sendPersonalizadoEmailCase        = new SendPersonalizadoEmailCase();
  const sendPersonalizadoEmailCaseController   = new SendPersonalizadoEmailController(sendPersonalizadoEmailCase);
  
  return sendPersonalizadoEmailCaseController;
};