import { ISendPersonalizadoEmailParams } from "@/backend/useCase/email/sendPersonalizadoEmailCase/sendPersonalizadoEmailCase";
import { sendPersonalizadoEmailCaseFactory } from "@/backend/useCase/email/sendPersonalizadoEmailCase/sendPersonalizadoEmailFactory";
import { NextRequest, NextResponse } from "next/server";


export  async function POST(req: NextRequest) {
  const res = await req.json()

  const data : ISendPersonalizadoEmailParams = res

  const sendPersonalizadoEmail  = await sendPersonalizadoEmailCaseFactory().handle(data)

  return NextResponse.json( {sendPersonalizadoEmail} ); 
}