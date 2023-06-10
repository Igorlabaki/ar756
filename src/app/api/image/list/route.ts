import { NextResponse,NextRequest} from 'next/server';
import { listImagesFactory } from '@/backend/useCase/image/listImages/listImagesFactory';


export  async function GET(req: NextRequest) {

  const listImages = await listImagesFactory().handle({})

  return NextResponse.json({ listImages }); 

}