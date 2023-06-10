import { ListImagesCase } from "./listImagesCase";
import { prismaClient } from "@/backend/prisma/client";
import { ListImagesController } from "./listImagesController";
import { PrismaImageRepository } from "@/backend/repository/inPrisma/prismaImageRepository";

export const listImagesFactory = () => {
  const prismaImageRepository     = new PrismaImageRepository(prismaClient);
  const listImagesCase        = new ListImagesCase(prismaImageRepository);
  const listImagesController   = new ListImagesController(listImagesCase);
  
  return listImagesController;
};