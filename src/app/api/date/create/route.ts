import { NextResponse,NextRequest} from 'next/server';
import { createDateFactory } from '@/backend/useCase/date/createDateCase/createDaateFactory';
import { IDateEventParams } from '@/backend/repository/IDateEventRepository';

export  async function POST(req: NextRequest) {
  const res = await req.json()

  const {orcamentoId,tipo,titulo,dataFim,dataInicio} : IDateEventParams = res

  try {
    const newImage = await createDateFactory().handle({dataFim,orcamentoId,tipo,titulo,dataInicio})

    return NextResponse.json(newImage ); 
    
  } catch (error:any) { 
    return NextResponse.json(error ); 
  }


}