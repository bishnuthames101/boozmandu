import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createOrderSchema } from '@/lib/validations';
import { extractTokenFromHeader, verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = createOrderSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { userId, customerName, customerPhone, customerAddress, notes, items, total } = validationResult.data;

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: userId || null,
        customerName,
        customerPhone,
        customerAddress,
        notes: notes || null,
        total,
        status: 'PENDING',
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            productImage: item.productImage,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Build query based on user type
    interface OrderWhereInput {
      userId?: string;
    }

    const where: OrderWhereInput = {};

    // If regular user, only show their orders
    if (payload.type === 'user') {
      where.userId = payload.userId;
    }
    // If admin, show all orders (no filter needed)

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
