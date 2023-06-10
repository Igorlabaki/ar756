import { NextResponse,NextRequest} from 'next/server';
import {  CreateImageFormData } from '@/zod/types/createImageFormZodType';
import { creatImageFactory } from '@/backend/useCase/image/createImageCase/createImageFactory';


export  async function POST(req: NextRequest) {
  const res = await req.json()

  const {area,imageUrl,legenda} :CreateImageFormData = res

  const newImage = await creatImageFactory().handle({area,imageUrl,legenda})
  
  return NextResponse.json(newImage ); 

}