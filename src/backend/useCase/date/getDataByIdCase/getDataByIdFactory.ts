import { prismaClient } from "@/backend/prisma/client"
import { GetDataByIdCase } from "./getDataByIdCase"
import { GetDataByIdController } from "./getDataByIdController"
import { PrismaDateEventRepository } from "@/backend/repository/inPrisma/prismaDateEventRepository"

export const getDataByIdFactory = () => {
    const prismaDataRepository   = new PrismaDateEventRepository(prismaClient)
    const getDataByIdCase        = new GetDataByIdCase(prismaDataRepository)
    const getDataByIdController  = new GetDataByIdController(getDataByIdCase)

    return getDataByIdController
}