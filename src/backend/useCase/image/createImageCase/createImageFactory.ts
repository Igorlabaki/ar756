import { CreateImageCase } from "./createImageCase";
import { prismaClient } from "@/backend/prisma/client";
import { CreateImageController } from "./createImageController";
import { PrismaImageRepository } from "@/backend/repository/inPrisma/prismaImageRepository";

export const creatImageFactory = () => {
  const prismaImageRepository     = new PrismaImageRepository(prismaClient);
  const creatImagesCase        = new CreateImageCase(prismaImageRepository);
  const creatImageController   = new CreateImageController(creatImagesCase);
  
  return creatImageController;
};