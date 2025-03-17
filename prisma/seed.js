import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data

  // ✅ Create test users with hashed passwords
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('testpassword', 10);

  await prisma.User.createMany({
    data: [
      {
        email: 'user@example.com',
        firstName: 'Test',
        lastName: 'User',
        hashedPassword: hashedPassword1, // Use hashed password
      },
      {
        email: 'jane.smith@test.com',
        firstName: 'Jane',
        lastName: 'Smith',
        hashedPassword: hashedPassword2, // Use hashed password
      },
    ],
  });

  console.log('✅ Database seeded with test users!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
