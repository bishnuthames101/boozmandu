import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email: 'admin@boozmandu.com' }
    });

    if (!admin) {
      console.log('❌ Admin user NOT FOUND in database!');
      console.log('Run: npm run prisma:seed');
      return;
    }

    console.log('✅ Admin user found in database:');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🔑 Stored hash:', admin.password);
    console.log('');

    // Test password verification
    const testPassword = 'admin123#';
    const isValid = await bcrypt.compare(testPassword, admin.password);

    console.log('🔐 Testing password: "admin123#"');
    console.log('Result:', isValid ? '✅ PASSWORD VALID' : '❌ PASSWORD INVALID');

    if (!isValid) {
      console.log('');
      console.log('💡 To fix: Run npm run prisma:seed to reset the admin password');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
