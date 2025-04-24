import { StatusCodes } from "http-status-codes";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:
    "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",
  defaultHeaders: {
    "HTTP-Referer": "https://nonamesearchengine.com/",
    "X-Title": "NO NAME SEARCH ENGINE",
  },
});

export default async function (fastify, opts) {
  // POST /api/user/chat to interact with the AI
  fastify.post(
    "/api/user/chat",
    {
      // Validate the request body
      schema: {
        body: {
          type: "object",
          required: ["message"],
          properties: {
            message: { type: "string", minLength: 1 },
          },
        },
        // Define the responses
        response: {
          [StatusCodes.OK]: {
            // Successful response
            type: "object",
            properties: {
              response: { type: "string" },
            },
          },
          [StatusCodes.BAD_REQUEST]: {
            // Bad request response
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          [StatusCodes.INTERNAL_SERVER_ERROR]: {
            // Internal server error response
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async function (request, reply) {
      const { message } = request.body;

      // Validate the request body
      if (!message) {
        return reply.status(StatusCodes.BAD_REQUEST).send({
          message: "Message is required.",
        });
      }

      try {
        // Use the DeepSeek model to generate a response
        const completion = await openai.chat.completions.create({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: message }],
        });

        // Return the response
        return reply.status(StatusCodes.OK).send({
          response: completion.choices[0].message.content,
        });
      } catch (error) {
        // Log any errors
        console.error(error);
        // Return an internal server error response
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "AI request failed.",
        });
      }
    },
  );
}
