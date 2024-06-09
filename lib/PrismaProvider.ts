// lib/PrismaProvider.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Allow the PrismaClient to be globally accessible
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
