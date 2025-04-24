import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (fastify, opts) {
  fastify.post('/api/reviews', {
    schema: {
      body: {
        type: 'object',
        required: ['userId', 'toolId', 'content', 'rating'],
        properties: {
          userId: { type: 'string', minLength: 1 },
          toolId: { type: 'string', minLength: 1 },
          content: { type: 'string', minLength: 1 },
          rating: { type: 'integer', minimum: 1, maximum: 5 },
        }
      },
      response: {
        [StatusCodes.CREATED]: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            content: { type: 'string' },
            rating: { type: 'integer' },
            userId: { type: 'string' },
            toolId: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        [StatusCodes.BAD_REQUEST]: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        },
        [StatusCodes.INTERNAL_SERVER_ERROR]: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, async function (request, reply) {
    const { userId, toolId, content, rating } = request.body;

    if (!userId || !toolId || !content || typeof rating !== 'number') {
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: 'Missing or invalid fields in review.'
      });
    }

    try {
      const review = await prisma.review.create({
        data: {
          userId,
          toolId,
          content,
          rating
        }
      });

      return reply.status(StatusCodes.CREATED).send(review);
    } catch (error) {
      console.error('Error creating review:', error);
      return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Something went wrong while saving your review.'
      });
    }
  });
}
