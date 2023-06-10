import { CreateOrcAprovadoReqBody } from '@/types';
import { NextResponse,NextRequest} from 'next/server';
import { updateOrcamentoFactory } from '@/backend/useCase/Orcamento/updateOrcamentoCase/updateOrcamentoFactory';
import { sendEmaillOrcAprovadoFactory } from '@/backend/useCase/email/sendEmailOrcAprovado/sendEmaiOrcAprovadoFactory';



export  async function POST(req: NextRequest) {
  const res = await req.json()

  const {aprovado,documentos,orcamentoId} : CreateOrcAprovadoReqBody = res

  const orcamentoUpdate = await updateOrcamentoFactory().handle({orcamentoId:orcamentoId, data: {
      aprovado,
  }})

  const sendEmailOrcAprovado  = await sendEmaillOrcAprovadoFactory().handle({documentos,orcamento: orcamentoUpdate})
  
  return NextResponse.json({ orcamentoUpdate }); 

}