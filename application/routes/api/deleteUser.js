import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (fastify, opts) {
  fastify.delete('/api/user/delete', {
    // Schema for the route
    schema: {
      // The body of the request
      body: {
        type: 'object',
        // The properties of the request body
        properties: {
          // The email of the user to delete
          email: { type: 'string', format: 'email', nullable: true },
          // The ID of the user to delete
          id: { type: 'string', nullable: true }
        }
      },
      // The response of the route
      response: {
        // If the request is successful
        [StatusCodes.OK]: {
          // The response will be an object
          type: 'object',
          // The properties of the response object
          properties: {
            // The message of the response
            message: { type: 'string' }
          }
        },
        // If the request is bad
        [StatusCodes.BAD_REQUEST]: {
          // The response will be an object
          type: 'object',
          // The properties of the response object
          properties: {
            // The message of the response
            message: { type: 'string' }
          }
        },
        // If the user to delete is not found
        [StatusCodes.NOT_FOUND]: {
          // The response will be an object
          type: 'object',
          // The properties of the response object
          properties: {
            // The message of the response
            message: { type: 'string' }
          }
        }
      }
    }
  }, async function (request, reply) {
    // The request body
    const { email, id } = request.body;

    // Check if either email or user ID is provided
    if (!email && !id) {
      // Return a bad request response if neither email nor user ID is provided
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: 'Either email or user ID is required to delete a user.'
      });
    }

    const user = await prisma.user.findUnique({
      // If email is provided, search the user by email
      // If user ID is provided, search the user by ID
      where: email ? { email } : { id },
    });

    if (!user) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: 'User not found.'
      });
    }

    // Delete the user
    await prisma.user.delete({
      where: email ? { email } : { id },
    });

    return reply.status(StatusCodes.OK).send({
      message: 'User deleted successfully.'
    });
  });
}

