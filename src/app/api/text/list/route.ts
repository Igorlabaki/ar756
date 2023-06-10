import { NextResponse,NextRequest} from 'next/server';
import { listTextFactory } from '@/backend/useCase/text/listTextCase/listTextFactory';


export  async function GET(req: NextRequest) {

  const textList = await listTextFactory().handle()

  return NextResponse.json(textList ); 

}