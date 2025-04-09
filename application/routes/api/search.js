import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (fastify, opts) {
  fastify.get('/api/user/search', async (request, reply) => {
    let { query, category, brand, price } = request.query;

    console.log("🔥 API HIT: /api/user/search");
    console.log("🔎 Received Query:", query);

    try {
      // ✅ Ensure query is a string before calling `.trim()`
      query = query ? query.trim() : "";
      category = category ? category.trim() : "";
      brand = brand ? brand.trim() : "";
      price = price ? Number(price) : 0;

      // ✅ If no query or only spaces, return ALL items
      if (query.length === 0 && category.length === 0 && brand.length === 0 && price == 0) {
        console.log("🔄 No search term. Returning all AI tools.");
        const allItems = await prisma.AITool.findMany(); // Fetch all items
        console.log("📌 Returning", allItems.length, "items.");
        return reply.status(200).send(allItems);
      }

      // ✅ Build search filter dynamically
      const searchFilter = {
        OR: [],
        AND: [],
      };

      if (query) {
        searchFilter.OR.push({ name: { contains: query } });
        searchFilter.OR.push({ category: { contains: query } });
        searchFilter.OR.push({ brand: { contains: query } });
      }

      if (category) {
        searchFilter.AND.push({ category: { contains: category } });
      }

      if (brand) {
        searchFilter.AND.push({ brand: { contains: brand } });
      }

      if (price > 0) {
        searchFilter.AND.push({ minPrice: { lte: price } });
      }

      if (searchFilter.OR.length == 0) {
        delete searchFilter.OR;
      }

      console.log("\n🔍 Prisma search filter:", JSON.stringify(searchFilter, null, 2));

      // ✅ Execute the query and log results
      const results = await prisma.AITool.findMany({ where: searchFilter });
      console.log("📌 Prisma returned:", results.length, "results\n", results);

      // Send 404 Not Found if no results were found
      if (results.length == 0) {
        reply.status(404).send("Not Found");
      }

      return reply.status(200).send(results);

    } catch (error) {
      console.error("❌ Database error:", error);

      return reply.status(500).send({
        error: 'Something went wrong',
        details: error.message,
        prismaStack: error.stack // 🔥 Print full Prisma error
      });
    }
  });
}
