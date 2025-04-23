import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (fastify, opts) {
  fastify.route({
    // POST /api/user/bookmark to add a bookmark for a user
    // GET /api/user/bookmark to get bookmarks for a user
    // DELETE /api/user/bookmark to remove a bookmark for a user
    method: ["POST", "GET", "DELETE"],
    url: "/api/user/bookmark",
    schema: {
      post: {
        // body contains `userId` and `toolId`
        body: {
          type: "object",
          required: ["userId", "toolId"],
          properties: {
            userId: { type: "string" },
            toolId: { type: "string" },
          },
        },
      },
      get: {
        // querystring contains `userId`
        querystring: {
          type: "object",
          required: ["userId"],
          properties: {
            userId: { type: "string" },
          },
        },
      },
      delete: {
        // querystring contains `userId` and `toolId`
        querystring: {
          type: "object",
          required: ["userId", "toolId"],
          properties: {
            userId: { type: "string" },
            toolId: { type: "string" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const { method } = request;

        // 📌 1️⃣ Add Bookmark（POST）
        if (method === "POST") {
          const { userId, toolId } = request.body; 
          // Check if the body contains `userId` and `toolId`
          if (!userId || !toolId) {
            return reply.status(StatusCodes.BAD_REQUEST).send({
              message: "User ID and Tool ID are required.",
            });
          }

          // 1 Check if the corresponding userId record exists in the User table.
          const user = await prisma.user.findUnique({ where: { id: userId } });
          if (!user) {
            return reply.status(StatusCodes.NOT_FOUND).send({
              message: "User not found.",
            });
          }

          // 2️ Check if the corresponding toolId record exists in the AITool table.
          const tool = await prisma.aITool.findUnique({
            where: { id: toolId },
          });
          if (!tool) {
            return reply.status(StatusCodes.NOT_FOUND).send({
              message: "Tool not found.",
            });
          }

          // 3️ Check if the bookmark already exists.
          const existingFavorite = await prisma.favorite.findUnique({
            where: { userId_toolId: { userId, toolId } },
          });

          if (existingFavorite) {
            return reply.status(StatusCodes.CONFLICT).send({
              message: "Bookmark already exists.",
            });
          }

          // 4️ Create a new bookmark if it doesn't exist.
          const favorite = await prisma.favorite.create({
            data: { userId, toolId },
          });
          return reply.status(StatusCodes.CREATED).send(favorite);
        }

        // 📌 2️⃣ Get user bookmarks（GET）
        if (method === "GET") {
          const { userId } = request.query; 
          // Check if the querystring contains `userId`
          if (!userId) {
            return reply.status(StatusCodes.BAD_REQUEST).send({
              message: "User ID is required.",
            });
          }

          // Find all bookmarks for a given user
          const favorites = await prisma.favorite.findMany({
            where: { userId },
            include: { tool: true }, // Include the tool of each bookmark
          });

          // Return all bookmarks for the user
          return reply.send(favorites);
        }

        // 📌 3️⃣ Delete Bookmarks（DELETE）
        if (method === "DELETE") {
          const { userId, toolId } = request.query; 
          if (!userId || !toolId) {
            return reply.status(StatusCodes.BAD_REQUEST).send({
              message: "User ID and Tool ID are required.",
            });
          }

          // 1️ Check if the bookmark already exists.
          const favorite = await prisma.favorite.findUnique({
            where: { userId_toolId: { userId, toolId } },
          });

          if (!favorite) {
            return reply.status(StatusCodes.NOT_FOUND).send({
              message: "Bookmark not found.",
            });
          }

          // 2️ Delete the bookmark if it exists.
          await prisma.favorite.delete({
            where: { userId_toolId: { userId, toolId } },
          });
          return reply.send({
            message: "Bookmark deleted successfully.",
          });
        }

        return reply.status(StatusCodes.METHOD_NOT_ALLOWED).send({
          message: "Invalid request method.",
        });
      } catch (error) {
        console.error("Error in /api/user/bookmark:", error);
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    },
  });
}

