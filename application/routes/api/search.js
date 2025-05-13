import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (fastify, opts) {
  fastify.get("/api/user/search", async (request, reply) => {
    let { query, category, brand, price, minRating } = request.query;

    // Sanitize inputs
    query = query ? query.trim().toLowerCase() : "";
    category = category ? category.trim().toLowerCase() : "";
    brand = brand ? brand.trim().toLowerCase() : "";
    price = price ? Number(price) : 0;
    minRating = minRating ? Number(minRating) : 0;

    console.log("🌐 API HIT: /api/user/search");
    console.log("🔎 Received Query:", { query, category, brand, price, minRating });

    try {
      // If all fields are empty, return all tools
      if (
        query.length === 0 &&
        category.length === 0 &&
        brand.length === 0 &&
        price === 0 &&
        minRating === 0
      ) {
        console.log("📦 No search filters. Returning all AI tools.");
        const allItems = await prisma.AITool.findMany({
          include: { reviews: true },
        });

        const withRatings = allItems.map((tool) => {
          const ratings = tool.reviews.map((r) => r.rating);
          const averageRating =
            ratings.length > 0
              ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
              : 0;
          return { ...tool, averageRating: parseFloat(averageRating.toFixed(1)) };
        });

        console.log("✅ Returning", withRatings.length, "items.");
        return reply.status(200).send(withRatings);
      }

      // Build dynamic search filter
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

      if (searchFilter.OR.length === 0) {
        delete searchFilter.OR;
      }

      console.log("🔍 Prisma search filter:", JSON.stringify(searchFilter, null, 2));

      // Fetch from database
      const results = await prisma.AITool.findMany({
        where: searchFilter,
        include: {
          reviews: true,
        },
      });

      console.log("📄 Prisma returned:", results.length, "results");

      // Calculate average rating & filter by minRating
      const filteredResults = results
        .map((tool) => {
          const ratings = tool.reviews.map((r) => r.rating);
          const averageRating =
            ratings.length > 0
              ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
              : 0;
          return {
            ...tool,
            averageRating: parseFloat(averageRating.toFixed(1))
          };
        })
        .filter((tool) => {
          // Log for debugging
          console.log(`Tool: ${tool.name}, Average Rating: ${tool.averageRating}, Min Rating: ${minRating}`);
          return tool.averageRating >= minRating;
        });

      console.log("⭐ Filtered by rating:", filteredResults.length, "tools returned.");

      return reply.status(200).send(filteredResults);
    } catch (error) {
      console.error("❌ Database error:", error);

      return reply.status(500).send({
        error: "Something went wrong",
        details: error.message,
        prismaStack: error.stack,
      });
    }
  });
}