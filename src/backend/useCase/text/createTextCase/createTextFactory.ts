import { prismaClient } from "@/backend/prisma/client";
import { PrismaTextRepository } from "@/backend/repository/inPrisma/prismaTextRepository";
import { CreateTextCase } from "./createTextCase";
import { CreateTextController } from "./createTextController";



export const createTextFactory = () => {
  const prismaTextRepository      = new PrismaTextRepository(prismaClient);
  const createTextsCase           = new CreateTextCase(prismaTextRepository);
  const createTextController      = new CreateTextController(createTextsCase);
  
  return createTextController;
};