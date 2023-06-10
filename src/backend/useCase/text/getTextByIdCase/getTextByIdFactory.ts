import { GetTextByIdCase } from "./getTextByIdCase"
import { prismaClient } from "@/backend/prisma/client"
import { GetTextByIdController } from "./getTextByIdController"
import { PrismaTextRepository } from "@/backend/repository/inPrisma/prismaTextRepository"

export const getTextByIdFactory = () => {
    const prismaTextRepository   = new PrismaTextRepository(prismaClient)
    const getTextByIdCase        = new GetTextByIdCase(prismaTextRepository)
    const getTextByIdController  = new GetTextByIdController(getTextByIdCase)

    return getTextByIdController
}