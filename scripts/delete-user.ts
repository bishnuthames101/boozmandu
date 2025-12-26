import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteUser() {
  const email = process.argv[2];

  if (!email) {
    console.error('❌ Please provide an email address');
    console.log('Usage: tsx scripts/delete-user.ts <email>');
    process.exit(1);
  }

  try {
    console.log(`🔍 Looking for user: ${email}`);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log(`ℹ️  User with email ${email} not found in database`);
      process.exit(0);
    }

    console.log(`👤 Found user: ${user.name} (${user.email})`);
    console.log(`🗑️  Deleting user...`);

    await prisma.user.delete({
      where: { email },
    });

    console.log(`✅ Successfully deleted user: ${email}`);
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

deleteUser();
