import { CreateDateCase } from "./createDateCase";
import { prismaClient } from "@/backend/prisma/client";
import { CreateDateController } from "./createDateController";
import { PrismaDateEventRepository } from "@/backend/repository/inPrisma/prismaDateEventRepository";

export const createDateFactory = () => {
  const prismaDateRepository     = new PrismaDateEventRepository(prismaClient);
  const createDatesCase        = new CreateDateCase(prismaDateRepository);
  const createDateController   = new CreateDateController(createDatesCase);
  
  return createDateController;
};