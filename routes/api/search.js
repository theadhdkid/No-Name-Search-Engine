import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (fastify, opts) {
  fastify.get('/api/user/search', async (request, reply) => {
    const { query, category, brand } = request.query;

    try {
      const results = await prisma.AITool.findMany({
        where: {
          OR: [
            { name: { contains: query.trim() } },
            { category: { contains: query.trim() } },
            { brand: { contains: query.trim() } },
          ],
        },
      });

      return reply.status(200).send(results);
    } catch (error) {
      return reply.status(500).send({ error: 'Something went wrong', details: error.message });
    }
  });
}