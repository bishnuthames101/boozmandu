import { PrismaClient } from '@prisma/client';
import { products } from '../src/data/products';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Map category strings to enum values
const categoryMap: Record<string, string> = {
  'whisky': 'WHISKY',
  'vodka': 'VODKA',
  'beer': 'BEER',
  'wine': 'WINE',
  'rum': 'RUM',
  'gin': 'GIN',
  'sodas': 'SODAS',
  'energydrink': 'ENERGYDRINK',
  'cider': 'CIDER',
  'localspirit': 'LOCALSPIRIT',
  'juice': 'JUICE',
  'soju': 'SOJU',
  'syrup': 'SYRUP',
  'vermouth': 'VERMOUTH',
};

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.admin.deleteMany();

  // Create admin user
  console.log('👨‍💼 Creating admin user...');
  const adminPassword = 'Boozmandu@Admin2024';
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.create({
    data: {
      email: 'admin@boozmandu.com',
      password: hashedAdminPassword,
      name: 'Boozmandu Admin',
    },
  });

  console.log('✅ Created admin user');
  console.log('📧 Email: admin@boozmandu.com');
  console.log('🔑 Password:', adminPassword);
  console.log('⚠️  IMPORTANT: Change this password after first login!');

  // Seed users
  console.log('👤 Creating users...');
  const hashedUserPassword1 = await bcrypt.hash('bishnu123', 10);
  const user1 = await prisma.user.create({
    data: {
      name: 'Bishnu Kumar',
      email: 'bishnu@example.com',
      password: hashedUserPassword1,
      phone: '9801234567',
      address: 'Durbar Marg, Kathmandu',
    },
  });

  const hashedUserPassword2 = await bcrypt.hash('ram123', 10);
  const user2 = await prisma.user.create({
    data: {
      name: 'Ram Sharma',
      email: 'ram@example.com',
      password: hashedUserPassword2,
      phone: '9807654321',
      address: 'Thamel, Kathmandu',
    },
  });

  console.log(`✅ Created ${2} users`);

  // Seed products
  console.log('🍾 Creating products...');
  let productCount = 0;

  for (const product of products) {
    const categoryEnum = categoryMap[product.category.toLowerCase()] || 'WHISKY';

    // Check if product has variants
    if (product.variants && product.variants.length > 0) {
      // Create product with variants
      await prisma.product.create({
        data: {
          name: product.name,
          category: categoryEnum as any,
          price: product.price,
          image: product.image,
          description: product.description,
          alcoholPercentage: product.alcoholPercentage,
          volume: product.volume,
          origin: product.origin,
          inStock: product.inStock ?? true,
          featured: product.featured ?? false,
          variants: {
            create: product.variants.map((variant) => ({
              volume: variant.volume,
              price: variant.price,
              image: variant.image || null,
            })),
          },
        },
      });
    } else {
      // Create product without variants
      await prisma.product.create({
        data: {
          name: product.name,
          category: categoryEnum as any,
          price: product.price,
          image: product.image,
          description: product.description,
          alcoholPercentage: product.alcoholPercentage,
          volume: product.volume,
          origin: product.origin,
          inStock: product.inStock ?? true,
          featured: product.featured ?? false,
        },
      });
    }

    productCount++;
  }

  console.log(`✅ Created ${productCount} products`);

  // Create sample orders
  console.log('📦 Creating sample orders...');

  const allProducts = await prisma.product.findMany({ take: 3 });

  if (allProducts.length >= 3) {
    await prisma.order.create({
      data: {
        userId: user1.id,
        customerName: user1.name,
        customerPhone: user1.phone,
        customerAddress: user1.address,
        notes: 'Please call before delivery',
        total: allProducts[0].price + allProducts[1].price * 2 + 100,
        status: 'DELIVERED',
        items: {
          create: [
            {
              productId: allProducts[0].id,
              productName: allProducts[0].name,
              productImage: allProducts[0].image,
              quantity: 1,
              price: allProducts[0].price,
            },
            {
              productId: allProducts[1].id,
              productName: allProducts[1].name,
              productImage: allProducts[1].image,
              quantity: 2,
              price: allProducts[1].price,
            },
          ],
        },
      },
    });

    await prisma.order.create({
      data: {
        userId: user2.id,
        customerName: user2.name,
        customerPhone: user2.phone,
        customerAddress: user2.address,
        total: allProducts[2].price + 100,
        status: 'PENDING',
        items: {
          create: [
            {
              productId: allProducts[2].id,
              productName: allProducts[2].name,
              productImage: allProducts[2].image,
              quantity: 1,
              price: allProducts[2].price,
            },
          ],
        },
      },
    });

    console.log(`✅ Created 2 sample orders`);
  }

  console.log('✨ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
