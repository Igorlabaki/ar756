import { NextResponse,NextRequest} from 'next/server';
import { createOrcamentoFactory } from '@/backend/useCase/Orcamento/createOrcamentoCase/createOrcamentoFactory';

export  async function POST(req: NextRequest) {
  const res = await req.json()

  try {
    const newOrcamento = await createOrcamentoFactory().handle(res)

    return NextResponse.json(newOrcamento ); 
    
  } catch (error:any) { 
    return NextResponse.json(error ); 
  }


}