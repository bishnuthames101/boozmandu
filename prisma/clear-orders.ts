import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearOrders() {
  console.log('🗑️  Clearing all orders from database...');

  try {
    // Delete all order items first (due to foreign key constraint)
    const deletedItems = await prisma.orderItem.deleteMany();
    console.log(`✅ Deleted ${deletedItems.count} order items`);

    // Delete all orders
    const deletedOrders = await prisma.order.deleteMany();
    console.log(`✅ Deleted ${deletedOrders.count} orders`);

    console.log('✨ All orders cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing orders:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearOrders();
