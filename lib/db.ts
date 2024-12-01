import { PrismaClient } from "@prisma/client";

// Test Version

declare global {
  var prisma: PrismaClient | undefined;
}

// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db;


// on Prod Use the following code

export const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  log: ['query', 'error', 'warn']
});