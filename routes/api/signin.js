import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function (fastify, opts) {
  fastify.post('/api/user/signin', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 }
        }
      },
      response: {
        [StatusCodes.OK]: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' }
          }
        },
        [StatusCodes.UNAUTHORIZED]: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        },
        [StatusCodes.BAD_REQUEST]: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, async function (request, reply) {
    const { email, password } = request.body;

    // Check if required fields are missing
    if (!email || !password) {
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: 'Email and password are required.'
      });
    }

    // Fetch user by email
    const user = await fastify.prisma.user.findUnique({
      where: { email: 'user@example.com' },
    });

    console.log("User found:", JSON.stringify(user));
    console.log("Password from request:", password);
    console.log("Stored password:", user?.hashedPassword);

    if (user && user.hashedPassword) {
      // Check if passwords match
      const isMatch = await bcrypt.compare(password, user.hashedPassword);
      console.log("Do passwords match?", isMatch);

      if (isMatch) {
        // Return user data on successful authentication
        return reply.status(StatusCodes.OK).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      }
    }

    // Return unauthorized response if authentication fails
    return reply.status(StatusCodes.UNAUTHORIZED).send({
      message: 'Invalid email or password.',
    });
  });
}
