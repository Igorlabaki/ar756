import {  CreateTextReqBody } from '@/types';
import { NextResponse,NextRequest} from 'next/server';
import { createTextFactory } from '@/backend/useCase/text/createTextCase/createTextFactory';
import { IUpdateTextParams } from '@/backend/repository/ITextRepository';
import { updateTextFactory } from '@/backend/useCase/text/updateTextCase/updateTextFactory';


export  async function PUT(req: NextRequest) {
  const res = await req.json()

  const { data, textId}: IUpdateTextParams = res
  
  const newText  = await updateTextFactory().handle({data, textId})
      
  return NextResponse.json( newText ); 
}