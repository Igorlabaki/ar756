import { prismaClient } from "@/backend/prisma/client";
import { ListOrcamentoCase } from "./listOrcamentoCase";
import { ListOrcamentoController } from "./listOrcamentoController";
import { PrismaOrcamentoRepository } from "@/backend/repository/inPrisma/prismaOrcamentoRepository";

export const listOrcamentoFactory = () => {
  const prismaOrcamentoRepository     = new PrismaOrcamentoRepository(prismaClient);
  const listOrcamentoCase        = new ListOrcamentoCase(prismaOrcamentoRepository);
  const listOrcamentoController   = new ListOrcamentoController(listOrcamentoCase);
  
  return listOrcamentoController;
};