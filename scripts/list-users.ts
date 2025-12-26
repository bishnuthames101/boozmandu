import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUsers() {
  try {
    console.log('📋 Fetching all users from database...\n');

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (users.length === 0) {
      console.log('ℹ️  No users found in database');
    } else {
      console.log(`✅ Found ${users.length} user(s):\n`);
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Phone: ${user.phone}`);
        console.log(`   Created: ${user.createdAt.toLocaleString()}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();
