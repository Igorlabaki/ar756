import { NextResponse,NextRequest} from 'next/server';
import { ISendAgendarVisitaEmailParams } from '@/backend/useCase/email/sendAgendarVisitaEmailCase/sendAgendarVisitaEmailCase';
import { sendAgendarVisitaEmailFactory } from '@/backend/useCase/email/sendAgendarVisitaEmailCase/sendAgendarVisitaEmailFactory';

export  async function POST(req: NextRequest) {
  const res = await req.json()

  const { nome, email, orcamentoId}: ISendAgendarVisitaEmailParams = res

  const sendAgendarVisitaEmail  = await sendAgendarVisitaEmailFactory().handle({nome,email,orcamentoId})

  return NextResponse.json( {sendAgendarVisitaEmail} ); 
}