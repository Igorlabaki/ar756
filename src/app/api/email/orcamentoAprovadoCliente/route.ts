import { CreateOrcAprovadoClienteReqBody } from '@/types';
import { NextResponse,NextRequest} from 'next/server';
import { updateOrcamentoFactory } from '@/backend/useCase/Orcamento/updateOrcamentoCase/updateOrcamentoFactory';
import { sendEmaillOrcAprovadoFactory } from '@/backend/useCase/email/sendEmailOrcAprovado/sendEmaiOrcAprovadoFactory';



export  async function POST(req: NextRequest) {
  const res = await req.json()

  const {aprovadoCliente,documentos,orcamentoId} : CreateOrcAprovadoClienteReqBody = res

  const orcamentoUpdate = await updateOrcamentoFactory().handle({orcamentoId:orcamentoId, data: {
    aprovadoCliente,
  }})

  const sendEmailOrcAprovado  = await sendEmaillOrcAprovadoFactory().handle({documentos,orcamento: orcamentoUpdate})
  
  return NextResponse.json({ orcamentoUpdate }); 

}