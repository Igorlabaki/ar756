import { SendFeddbackEmailReqBody } from '@/types';
import { NextResponse,NextRequest} from 'next/server';
import { updateOrcamentoFactory } from '@/backend/useCase/Orcamento/updateOrcamentoCase/updateOrcamentoFactory';
import { sendFeedBackEmailCaseFactory } from '@/backend/useCase/email/sendFeedbackEmail/sendSendFeedbackEmailFactory';


export  async function POST(req: NextRequest) {
  const res = await req.json()

  const {feedback,orcamentoId,aprovadoCliente} : SendFeddbackEmailReqBody = res

  const orcamentoUpdate = await updateOrcamentoFactory().handle({orcamentoId:orcamentoId, data: {
      feedback,
      aprovadoCliente
  }})

  const sendFeedbackEmail  = await sendFeedBackEmailCaseFactory().handle({orcamento: orcamentoUpdate})
  
  return NextResponse.json({ orcamentoUpdate }); 

}