import { DeleteDataCase } from "./deleteDataCase";
import { prismaClient } from "@/backend/prisma/client";
import { DeleteDataController } from "./deleteDataController";
import { PrismaDateEventRepository } from "@/backend/repository/inPrisma/prismaDateEventRepository";

export const deleteDataFactory = () => {
  const prismaDataRepository      = new PrismaDateEventRepository(prismaClient);
  const deleteDatasCase           = new DeleteDataCase(prismaDataRepository);
  const deleteDataController      = new DeleteDataController(deleteDatasCase);
  
  return deleteDataController;
};