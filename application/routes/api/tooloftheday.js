import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export default async function (fastify, opts) {
  /**
   * response = await fetch('api/tooloftheday')
   * The selection is based on the current day
   * Tools are ordered by alphanumeric ID
   * @returns {Promise<Object|null>}
   * Returns the full AITool object or null if none found
   */
  async function getDailyTool() { // Gets whole of daily tool
    const totalItems = await prisma.AITool.count();

    if (totalItems === 0) {
      fastify.log.warn('AITool table is empty. Cannot pick a tool of the day.');
      return null;
    }

    // Set so same tool on same day between different users
    const now = new Date();
    const todayinms = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const skipIndex = (Math.floor(todayinms / DAY_IN_MS)) % totalItems;

    // Fetch specific AI tool item for the day
    const dailyTools = await prisma.AITool.findMany({
      skip: skipIndex,
      take: 1,
      orderBy: {
        id: 'asc', // Order by alphanumeric IDs
      },
      // All fields are returned: (id, name, category, brand, imageUrl)
    });

    if (dailyTools && dailyTools.length > 0) {
      return dailyTools[0]; // Return the AITool object for today
    }

    fastify.log.error('Failed to select a daily AITool despite items being present. Index:', skipIndex);
    return null;
  }

  // Tooloftheday API endpoint
  fastify.get('/api/tooloftheday', async (request, reply) => {
    try {
      const dailyTool = await getDailyTool(); // Get daily tool

      if (dailyTool) { // Return entire tool object directly
        return reply.status(200).send(dailyTool);
      } else {
        reply.code(404).send({ error: 'Could not determine the tool of the day. No AI tools found or selection failed.' });
      }
    } catch (error) {
      fastify.log.error(error, 'Error in /api/tooloftheday endpoint');
      reply.code(500).send({ error: 'Internal Server Error while fetching tool of the day.' });
    }
  });
}