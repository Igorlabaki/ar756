import { getOrcamentoByIdFactory } from "@/backend/useCase/Orcamento/getOcamentoByIdCase/getOrcamentoByIdFactory";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const obj = Object.fromEntries(searchParams.entries())
  const {orcamentoId} =  obj

  const orcamentoById = await getOrcamentoByIdFactory().handle(orcamentoId)

  return NextResponse.json(orcamentoById);
}
