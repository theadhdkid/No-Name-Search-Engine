import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (fastify, opts) {
  fastify.get('/api/reviews', async function (request, reply) {
    const { toolId } = request.query;

    if (!toolId) {
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: 'toolId is required in query',
      });
    }

    try {
      const reviews = await prisma.review.findMany({
        where: { toolId },
        orderBy: { createdAt: 'desc' },
      });

      return reply.status(StatusCodes.OK).send(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Something went wrong while fetching reviews.',
      });
    }
  });
}
