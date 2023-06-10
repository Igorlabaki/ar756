import { DeleteTextCase } from "./deleteTextCase";
import { prismaClient } from "@/backend/prisma/client";
import { PrismaTextRepository } from "@/backend/repository/inPrisma/prismaTextRepository";
import { DeleteTextController } from "./deleteTextController";

export const deleteTextFactory = () => {
  const prismaTextRepository      = new PrismaTextRepository(prismaClient);
  const deleteTextsCase           = new DeleteTextCase(prismaTextRepository);
  const deleteTextController      = new DeleteTextController(deleteTextsCase);
  
  return deleteTextController;
};