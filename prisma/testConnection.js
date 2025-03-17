import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testPrismaConnection() {
  try {
    // Check if Prisma can connect to the database
    console.log("Testing Prisma connection...");

    // Try fetching the first user from the User model
    const user = await prisma.user.findFirst();
    console.log("User found:", user);

    if (!user) {
      console.log("No users found in the database.");
    } else {
      console.log("Successfully retrieved user:", user);
    }
  } catch (error) {
    console.error("Error connecting to the database or querying User:", error);
  } finally {
    await prisma.$disconnect();  // Disconnect Prisma when done
  }
}

testPrismaConnection();
