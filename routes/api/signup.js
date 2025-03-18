import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt'; // will implement hashedPassword logic for next asmy
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function (fastify, opts) {
  fastify.post('/api/user/signup', {
    schema: {
      body: {
        type: 'object',
        required: ['firstName', 'lastName','email', 'password', 'confirmPassword'],
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
          confirmPassword: { type: 'string', minLength: 6 },
        }
      },
      response: {
        [StatusCodes.OK]: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
            confirmPassword: { type: 'string', minLength: 6 },
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
    const { firstName, lastName, email, password, confirmPassword } = request.body;

    // testing to make sure all fields are met
    if(!firstName || !lastName || !email || !password || !confirmPassword) {
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: 'All fields are required.'
      })
    }

    // testing to make sure that password == confirmPassword
    if (password != confirmPassword) {
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: 'Passwords do not match.'
      })
    }

    // finding out if email has already created an account
    const existinguser = await fastify.prisma.user.findUnique({
      where: { email },
    })

    if(existinguser) {
      return reply.status(StatusCodes.CONFLICT).send({
        message: 'User already exists.'
      })
    }

    // hashing password so it doesnt store the raw password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new user and sending this data to the DB
    const user = await fastify.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword
      },
    });

    return reply.send({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  })
}