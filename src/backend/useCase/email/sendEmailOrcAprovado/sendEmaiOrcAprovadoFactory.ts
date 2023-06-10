import { SendEmailOrcAprovadoCase } from "./sendEmailOrcAprovadoCase";
import { sendEmailOrcAprovadoController } from "./sendEmailOrcAprovadoController";

export const sendEmaillOrcAprovadoFactory = () => {
  const sendEmaillOrcAprovadosCase        = new SendEmailOrcAprovadoCase();
  const sendEmaillOrcAprovadoController   = new sendEmailOrcAprovadoController(sendEmaillOrcAprovadosCase);
  
  return sendEmaillOrcAprovadoController;
};