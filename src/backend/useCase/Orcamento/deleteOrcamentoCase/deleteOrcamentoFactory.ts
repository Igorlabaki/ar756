
import { prismaClient } from "@/backend/prisma/client";
import { DeleteOrcamentotCase } from "./deleteOrcamentoCase";
import { DeleteOrcamentoController } from "./deleteOrcamentoController";
import { PrismaOrcamentoRepository } from "@/backend/repository/inPrisma/prismaOrcamentoRepository";

export const deleteOrcamentoFactory = () => {
  const prismaOrcamentoRepository      = new PrismaOrcamentoRepository(prismaClient);
  const deleteOrcamentosCase           = new DeleteOrcamentotCase(prismaOrcamentoRepository);
  const deleteOrcamentoController      = new DeleteOrcamentoController(deleteOrcamentosCase);
  
  return deleteOrcamentoController;
};