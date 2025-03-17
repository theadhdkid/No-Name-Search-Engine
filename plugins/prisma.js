import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

const prismaPlugin = fp(async (fastify) => {
  // Use TEST_DATABASE_URL or fall back to DATABASE_URL
  const databaseUrl = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL;

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,  // This will use the correct URL
      },
    },
  });

  await prisma.$connect();

  // Make Prisma Client available through the Fastify server instance: fastify.prisma
  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async () => {
    await prisma.$disconnect();
  });
});

export default prismaPlugin;
