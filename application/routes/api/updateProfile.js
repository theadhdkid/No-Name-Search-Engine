import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (fastify, opts) {
  fastify.post('/api/user/update-profile', {
    schema: {
      // The update profile route will update the user's info with the provided fields
      body: {
        type: 'object',
        // The properties of the request body
        properties: {
            // The email of the user
            email: { type: 'string', format: 'email', nullable: true },
            // The first name of the user
            firstName: { type: 'string', nullable: true },
            // The last name of the user
            lastName: { type: 'string', nullable: true },
            // The old password of the user (if changing password)
            oldPassword: { type: 'string', minLength: 6, nullable: true },
            // The new password of the user (if changing password)
            newPassword: { type: 'string', minLength: 6, nullable: true }
          },
        // The required fields of the request body
        required: ['email'] 
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
        // If the request is unauthorized
        [StatusCodes.UNAUTHORIZED]: {
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
        }
      }
    }
  }, async function (request, reply) {
    // The request body
    const { email, firstName, lastName, oldPassword, newPassword } = request.body;

    // Retrieve the user from the database using the provided email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If no user is found, respond with a Bad Request status
    if (!user) {
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: 'User not found.'
      });
    }

    
    // Check if a new password is provided
    if (newPassword) {
      // Ensure old password is provided when setting a new password
      if (!oldPassword) {
        return reply.status(StatusCodes.BAD_REQUEST).send({
          message: 'Old password is required to set a new password.'
        });
      }

      // Verify if the old password matches the stored hashed password
      const isMatch = await bcrypt.compare(oldPassword, user.hashedPassword);
      if (!isMatch) {
        return reply.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Incorrect old password.'
        });
      }

      // Hash the new password and update the user's password in the database
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { email },
        data: { hashedPassword: hashedNewPassword }
      });
    }

    
    // Construct the update data object
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;

    // Only update the user if there is data to update
    if (Object.keys(updateData).length > 0) {
      // Update the user
      await prisma.user.update({
        where: { email },
        data: updateData
      });
    }

    // Return success response
    return reply.status(StatusCodes.OK).send({
      message: 'User profile updated successfully.'
    });
  });
}
