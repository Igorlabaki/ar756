import { NextResponse,NextRequest} from 'next/server';
import { listOrcamentoFactory } from '@/backend/useCase/Orcamento/listOrcamentoCase/listOrcamentoFactory';

export  async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url)
  const obj = Object.fromEntries(searchParams.entries())

  const orcamentoList = await listOrcamentoFactory().handle({...obj})

  return NextResponse.json(orcamentoList ); 

}