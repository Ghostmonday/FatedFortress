import { PrismaClient } from '@prisma/client';
/**
 * Singleton PrismaClient instance for database operations.
 * Prevents connection pool exhaustion in development/hot-reload scenarios.
 */
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;
//# sourceMappingURL=index.js.map