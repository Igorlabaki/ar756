import { CreateOrcAprovadoReqBody, SendFeddbackEmailReqBody } from '@/types';
import { NextResponse,NextRequest} from 'next/server';
import { updateOrcamentoFactory } from '@/backend/useCase/Orcamento/updateOrcamentoCase/updateOrcamentoFactory';
import { sendEmaillOrcAprovadoFactory } from '@/backend/useCase/email/sendEmailOrcAprovado/sendEmaiOrcAprovadoFactory';
import { sendFeedBackEmailCaseFactory } from '@/backend/useCase/email/sendFeedbackEmail/sendSendFeedbackEmailFactory';


export  async function POST(req: NextRequest) {
  const res = await req.json()

  const {aprovado,feedback,orcamentoId} : SendFeddbackEmailReqBody = res

  const orcamentoUpdate = await updateOrcamentoFactory().handle({orcamentoId:orcamentoId, data: {
      aprovado,
      feedback
  }})

  const sendFeedbackEmail  = await sendFeedBackEmailCaseFactory().handle({orcamento: orcamentoUpdate})
  
  return NextResponse.json({ orcamentoUpdate }); 

}