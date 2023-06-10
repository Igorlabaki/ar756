import {  CreateTextReqBody } from '@/types';
import { NextResponse,NextRequest} from 'next/server';
import { createTextFactory } from '@/backend/useCase/text/createTextCase/createTextFactory';


export  async function POST(req: NextRequest) {
  const res = await req.json()

  const { area, text, titulo}: CreateTextReqBody = res

  try {
    const newText  = await createTextFactory().handle({area, text,titulo})
    return NextResponse.json( newText ); 
  } catch (error) {
    return NextResponse.json(error );
  }
  
      
}