import { prismaClient } from "@/backend/prisma/client";
import { CreateOrcamentoCase } from "./createOrcamentoCase";

import { PrismaOrcamentoRepository } from "@/backend/repository/inPrisma/prismaOrcamentoRepository";
import { CreateOrcamentoController } from "./createOrcamentoController";


export const createOrcamentoFactory = () => {
  const prismaOrcamentoRepository     = new PrismaOrcamentoRepository(prismaClient);
  const createOrcamentosCase        = new CreateOrcamentoCase(prismaOrcamentoRepository);
  const createOrcamentoController   = new CreateOrcamentoController(createOrcamentosCase);
  
  return createOrcamentoController;
};