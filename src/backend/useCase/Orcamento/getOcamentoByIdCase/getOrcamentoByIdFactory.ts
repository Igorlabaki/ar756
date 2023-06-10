import { prismaClient } from "@/backend/prisma/client"
import { GetOrcamentoByIdCase } from "./getOrcamentoByIdCase"
import { GetOrcamentoByIdController } from "./getOrcamentoByIdController"
import { PrismaOrcamentoRepository } from "@/backend/repository/inPrisma/prismaOrcamentoRepository"

export const getOrcamentoByIdFactory = () => {
    const prismaOrcamentoRepository   = new PrismaOrcamentoRepository(prismaClient)
    const getOrcamentoByIdCase        = new GetOrcamentoByIdCase(prismaOrcamentoRepository)
    const getOrcamentoByIdController  = new GetOrcamentoByIdController(getOrcamentoByIdCase)

    return getOrcamentoByIdController
}