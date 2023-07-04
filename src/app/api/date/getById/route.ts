import { NextResponse } from "next/server";
import { getOrcamentoByIdFactory } from "@/backend/useCase/Orcamento/getOcamentoByIdCase/getOrcamentoByIdFactory";
import { getDataByIdFactory } from "@/backend/useCase/date/getDataByIdCase/getDataByIdFactory";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const obj = Object.fromEntries(searchParams.entries())
  const {dataId} =  obj

  const dataById = await getDataByIdFactory().handle(dataId)

  return NextResponse.json(dataById);
}
