import { prismaClient } from "@/backend/prisma/client";
import { CheckDateAvailabilityCase } from "./checkDateAvailabilityCase";
import { CheckDateAvailabilityController } from "./checkDateAvailabilityController";
import { PrismaDateEventRepository } from "@/backend/repository/inPrisma/prismaDateEventRepository";

export const checkDateAvailabilityFactory = () => {
  const prismaDateRepository     = new PrismaDateEventRepository(prismaClient);
  const checkDateAvailabilityCase        = new CheckDateAvailabilityCase(prismaDateRepository);
  const checkDateAvailabilityController   = new CheckDateAvailabilityController(checkDateAvailabilityCase);
  
  return checkDateAvailabilityController;
};