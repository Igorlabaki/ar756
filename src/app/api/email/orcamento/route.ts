import { CreateOrcamentoReqBody } from '@/types';
import { NextResponse,NextRequest} from 'next/server';
import { sendEmailFactory } from '@/backend/useCase/email/sendEmailCase/sendEmailFactory';
import { createOrcamentoFactory } from '@/backend/useCase/Orcamento/createOrcamentoCase/createOrcamentoFactory';

export  async function POST(req: NextRequest) {
  const res = await req.json()

  const { nome, email}: CreateOrcamentoReqBody = res

  const novoOrcamento = await createOrcamentoFactory().handle({
    ...res,
  })       

  const sendEmail  = await sendEmailFactory().handle({nome,email,orcamentoId: novoOrcamento?.id})

  return NextResponse.json( novoOrcamento ); 
}