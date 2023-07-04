import { NextResponse,NextRequest} from 'next/server';
import { deleteTextFactory } from '@/backend/useCase/text/deleteTextCase/deleteTextFactory';
import { deleteDataFactory } from '@/backend/useCase/date/deleteDataCase/deleteDataFactory';

export  async function DELETE(req: NextRequest) {

  const {searchParams} = new URL(req.url)
  const obj = Object.fromEntries(searchParams.entries())
  const {dataId} =  obj
  
  const deletedData  = await deleteDataFactory().handle(dataId)
      
  return NextResponse.json( deletedData ); 
}