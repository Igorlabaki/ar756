
import { ListDatesCase } from "./listDateCase";
import { prismaClient } from "@/backend/prisma/client";
import { ListDateController } from "./listDateController";
import { PrismaDateEventRepository } from "@/backend/repository/inPrisma/prismaDateEventRepository";

export const listDateFactory = () => {
  const prismaDateRepository     = new PrismaDateEventRepository(prismaClient);
  const listDateCase        = new ListDatesCase(prismaDateRepository);
  const listDateController   = new ListDateController(listDateCase);
  
  return listDateController;
};