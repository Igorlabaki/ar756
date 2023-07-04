import { NextResponse,NextRequest} from 'next/server';
import {  checkDateAvailabilityFactory } from '@/backend/useCase/date/checkDateAvailabilityCase/checkDateAvailabilityFactory';

export  async function POST(req: NextRequest) {
  const res = await req.json()

  try {
    const newImage = await checkDateAvailabilityFactory().handle({...res})

    return NextResponse.json(newImage ); 
    
  } catch (error:any) { 
    return NextResponse.json(error ); 
  }


}