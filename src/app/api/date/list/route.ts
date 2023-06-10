import { NextResponse,NextRequest} from 'next/server';
import { listImagesFactory } from '@/backend/useCase/image/listImages/listImagesFactory';
import { listDateFactory } from '@/backend/useCase/date/listDateCase/listDateFactory';


export  async function GET(req: NextRequest) {

  const listDate = await listDateFactory().handle()

  return NextResponse.json( listDate ); 

}