import { NextResponse,NextRequest} from 'next/server';
import { deleteOrcamentoFactory } from '@/backend/useCase/Orcamento/deleteOrcamentoCase/deleteOrcamentoFactory';

export  async function DELETE(req: NextRequest) {

  const {searchParams} = new URL(req.url)
  const obj = Object.fromEntries(searchParams.entries())
  const {orcamentoId} =  obj
  
  const deletedOrcamento  = await deleteOrcamentoFactory().handle(orcamentoId)
      
  return NextResponse.json( deletedOrcamento ); 
}