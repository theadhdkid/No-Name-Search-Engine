console.log("SIGNUP route loaded");
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (fastify, opts) {
  fastify.post(
    "/api/user/signup",
    {
      schema: {
        body: {
          type: "object",
          required: [
            "firstName",
            "lastName",
            "email",
            "password",
            "confirmPassword",
          ],
          properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
            confirmPassword: { type: "string", minLength: 6 },
          },
        },
        response: {
          [StatusCodes.OK]: {
            type: "object",
            properties: {
              userId: { type: "string" },
              firstName: { type: "string" },
              lastName: { type: "string" },
              email: { type: "string", format: "email" },
            },
          },
          [StatusCodes.CONFLICT]: {
            type: "object",
            properties: { message: { type: "string" } },
          },
          [StatusCodes.BAD_REQUEST]: {
            type: "object",
            properties: { message: { type: "string" } },
          },
        },
      },
    },
    async function (request, reply) {
      const { firstName, lastName, email, password, confirmPassword } =
        request.body;

      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return reply.status(StatusCodes.BAD_REQUEST).send({
          message: "All fields are required.",
        });
      }

      if (password !== confirmPassword) {
        return reply.status(StatusCodes.BAD_REQUEST).send({
          message: "Passwords do not match.",
        });
      }

      const existinguser = await prisma.user.findUnique({
        where: { email },
      });

      if (existinguser) {
        return reply.status(StatusCodes.CONFLICT).send({
          message: "User already exists.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          hashedPassword,
        },
      });

      return reply.send({
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    },
  );
}
