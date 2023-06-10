import { prismaClient } from "@/backend/prisma/client";
import { PrismaOrcamentoRepository } from "@/backend/repository/inPrisma/prismaOrcamentoRepository";
import { UpdateOrcamentoCase } from "./updateOrcamentoCase";
import { UpdateOrcamentoController } from "./updateOrcamentoController";

export const updateOrcamentoFactory = () => {
  const prismaOrcamentoRepository     = new PrismaOrcamentoRepository(prismaClient);
  const updateOrcamentosCase        = new UpdateOrcamentoCase(prismaOrcamentoRepository);
  const updateOrcamentoController   = new UpdateOrcamentoController(updateOrcamentosCase);
  
  return updateOrcamentoController;
};