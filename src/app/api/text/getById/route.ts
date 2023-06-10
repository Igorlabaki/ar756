import { getTextByIdFactory } from "@/backend/useCase/text/getTextByIdCase/getTextByIdFactory";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const obj = Object.fromEntries(searchParams.entries())
  const {textId} =  obj

  const textById = await getTextByIdFactory().handle(textId)

  return NextResponse.json(textById);
}
