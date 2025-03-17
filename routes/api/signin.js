import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

export default async function (fastify, opts) {

  fastify.post('/api/user/signin', async (request, reply) => {
    console.log(fastify.prisma);  // Check if Prisma is available

    const { email, password } = request.body;

    if (!email || !password) {
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: 'Email and password are required.',
      });
    }

    try {
      const user = await fastify.prisma.user.findUnique({
        where: { email },
      });

      console.log('User fetched:', user);  // Log user data for debugging

      if (user && await bcrypt.compare(password, user.hashedPassword)) {
        return reply.status(StatusCodes.OK).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      }

      return reply.status(StatusCodes.UNAUTHORIZED).send({
        message: 'Invalid email or password.',
      });
    } catch (err) {
      console.error('Error during user sign-in:', err.message);  // Log error message
      console.error('Error Stack:', err.stack);  // Log error stack trace
      return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
      });
    }
  });
}

//node --test tests/routes/api/signin.test.js