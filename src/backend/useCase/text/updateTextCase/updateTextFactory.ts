import { UpdateTextCase } from "./updateTextCase";
import { prismaClient } from "@/backend/prisma/client";
import { UpdateTextController } from "./updateTextController";
import { PrismaTextRepository } from "@/backend/repository/inPrisma/prismaTextRepository";

export const updateTextFactory = () => {
  const prismaTextRepository      = new PrismaTextRepository(prismaClient);
  const updateTextsCase           = new UpdateTextCase(prismaTextRepository);
  const updateTextController      = new UpdateTextController(updateTextsCase);
  
  return updateTextController;
};