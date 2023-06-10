import { NextResponse,NextRequest} from 'next/server';
import { deleteTextFactory } from '@/backend/useCase/text/deleteTextCase/deleteTextFactory';

export  async function DELETE(req: NextRequest) {

  const {searchParams} = new URL(req.url)
  const obj = Object.fromEntries(searchParams.entries())
  const {textId} =  obj
  
  const deletedText  = await deleteTextFactory().handle(textId)
      
  return NextResponse.json( deletedText ); 
}