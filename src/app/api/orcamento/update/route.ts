import {  CreateTextReqBody } from '@/types';
import { NextResponse,NextRequest} from 'next/server';
import { createTextFactory } from '@/backend/useCase/text/createTextCase/createTextFactory';
import { IUpdateTextParams } from '@/backend/repository/ITextRepository';
import { updateTextFactory } from '@/backend/useCase/text/updateTextCase/updateTextFactory';
import { UpdateOrcamentoParams } from '@/backend/repository/IOrcamentoRepository';
import { updateOrcamentoFactory } from '@/backend/useCase/Orcamento/updateOrcamentoCase/updateOrcamentoFactory';


export  async function PUT(req: NextRequest) {
  const res = await req.json()

  const { data, orcamentoId}: UpdateOrcamentoParams = res
  
  const newText  = await updateOrcamentoFactory().handle({data, orcamentoId})
      
  return NextResponse.json( newText ); 
}