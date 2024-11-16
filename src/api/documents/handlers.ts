import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDocuments = async () => {
  return await prisma.document.findMany();
};

export const createDocument = async (data: any) => {
  return await prisma.document.create({ data });
};