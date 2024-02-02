import { PrismaClient } from "@prisma/client";

/* 
 * PrismaClient is attached to the `global` object in development to prevent
 * exhausting your database connection limit. 
 * In production, it directly instantiates a new client
 * In development, it checks if there is a cached instance first before instantiating.
 */

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;