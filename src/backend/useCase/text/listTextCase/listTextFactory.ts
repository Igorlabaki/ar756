import { ListTextsCase } from "./listTextsCase";
import { prismaClient } from "@/backend/prisma/client";
import { ListTextController } from "./listTextController";
import { PrismaTextRepository } from "@/backend/repository/inPrisma/prismaTextRepository";

export const listTextFactory = () => {
  const prismaImageRepository     = new PrismaTextRepository(prismaClient);
  const listTextCase        = new ListTextsCase(prismaImageRepository);
  const listTextController   = new ListTextController(listTextCase);
  
  return listTextController;
};