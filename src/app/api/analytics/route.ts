import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractTokenFromHeader, verifyToken } from '@/lib/auth';
import { calculateDateRange, formatChartDate, getDateIntervals, normalizeDate } from '@/lib/dateHelpers';
import { TimePeriod, AnalyticsData } from '@/types/analytics';
import { format } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate admin
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload || payload.type !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // 2. Get query parameters
    const { searchParams } = new URL(request.url);
    const period = (searchParams.get('period') || 'week') as TimePeriod;

    // 3. Calculate date range
    const { startDate, endDate } = calculateDateRange(period);

    // 4. Fetch orders within the date range
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
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
        createdAt: 'asc',
      },
    });

    // 5. Calculate revenue analytics
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Group orders by date for trend
    const dateIntervals = getDateIntervals(startDate, endDate, period);
    const revenueTrendMap = new Map<string, number>();

    // Initialize all intervals with 0
    dateIntervals.forEach(date => {
      const key = format(normalizeDate(date, period), 'yyyy-MM-dd HH:mm');
      revenueTrendMap.set(key, 0);
    });

    // Populate with actual data
    orders.forEach(order => {
      const normalizedDate = normalizeDate(new Date(order.createdAt), period);
      const key = format(normalizedDate, 'yyyy-MM-dd HH:mm');
      revenueTrendMap.set(key, (revenueTrendMap.get(key) || 0) + order.total);
    });

    const revenueTrend = Array.from(revenueTrendMap.entries()).map(([dateStr, amount]) => ({
      date: formatChartDate(new Date(dateStr), period),
      amount: Math.round(amount * 100) / 100,
    }));

    // Calculate comparison to previous period
    const periodLength = endDate.getTime() - startDate.getTime();
    const actualPrevStartDate = new Date(startDate.getTime() - periodLength);
    const actualPrevEndDate = new Date(startDate.getTime() - 1);

    const previousOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: actualPrevStartDate,
          lte: actualPrevEndDate,
        },
      },
    });

    const previousRevenue = previousOrders.reduce((sum, order) => sum + order.total, 0);
    const comparisonToPrevious = previousRevenue === 0
      ? (totalRevenue > 0 ? 100 : 0)
      : ((totalRevenue - previousRevenue) / previousRevenue) * 100;

    // 6. Calculate order analytics
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusBreakdown = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      percentage: Math.round((count / orders.length) * 100 * 100) / 100,
    }));

    // Order trend (same grouping as revenue)
    const orderTrendMap = new Map<string, number>();

    // Initialize all intervals with 0
    dateIntervals.forEach(date => {
      const key = format(normalizeDate(date, period), 'yyyy-MM-dd HH:mm');
      orderTrendMap.set(key, 0);
    });

    // Populate with actual data
    orders.forEach(order => {
      const normalizedDate = normalizeDate(new Date(order.createdAt), period);
      const key = format(normalizedDate, 'yyyy-MM-dd HH:mm');
      orderTrendMap.set(key, (orderTrendMap.get(key) || 0) + 1);
    });

    const orderTrend = Array.from(orderTrendMap.entries()).map(([dateStr, count]) => ({
      date: formatChartDate(new Date(dateStr), period),
      count,
    }));

    // 7. Calculate top products
    const productSales = new Map<string, { name: string; quantity: number; revenue: number }>();

    orders.forEach(order => {
      order.items.forEach(item => {
        const existing = productSales.get(item.productId);
        if (existing) {
          existing.quantity += item.quantity;
          existing.revenue += item.price * item.quantity;
        } else {
          productSales.set(item.productId, {
            name: item.productName,
            quantity: item.quantity,
            revenue: item.price * item.quantity,
          });
        }
      });
    });

    const topProducts = Array.from(productSales.entries())
      .map(([productId, data]) => ({
        productId,
        productName: data.name,
        quantitySold: data.quantity,
        revenue: Math.round(data.revenue * 100) / 100,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // 8. Calculate top categories (need to look up products)
    const productIds = Array.from(new Set(orders.flatMap(o => o.items.map(i => i.productId))));
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        category: true,
      },
    });

    const productCategoryMap = new Map(products.map(p => [p.id, p.category]));
    const categorySales = new Map<string, { quantity: number; revenue: number; orderCount: Set<string> }>();

    orders.forEach(order => {
      order.items.forEach(item => {
        const category = productCategoryMap.get(item.productId);
        if (category) {
          const existing = categorySales.get(category);
          if (existing) {
            existing.quantity += item.quantity;
            existing.revenue += item.price * item.quantity;
            existing.orderCount.add(order.id);
          } else {
            categorySales.set(category, {
              quantity: item.quantity,
              revenue: item.price * item.quantity,
              orderCount: new Set([order.id]),
            });
          }
        }
      });
    });

    const topCategories = Array.from(categorySales.entries())
      .map(([category, data]) => ({
        category,
        quantitySold: data.quantity,
        revenue: Math.round(data.revenue * 100) / 100,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // 9. Calculate customer analytics
    const totalCustomers = await prisma.user.count();
    const newCustomers = await prisma.user.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Count unique customers who placed orders in this period
    const uniqueCustomerIds = new Set(orders.filter(o => o.userId).map(o => o.userId!));

    // Find returning customers (have orders before this period)
    let returningCustomers = 0;
    if (uniqueCustomerIds.size > 0) {
      const previousCustomerOrders = await prisma.order.findMany({
        where: {
          userId: {
            in: Array.from(uniqueCustomerIds),
          },
          createdAt: {
            lt: startDate,
          },
        },
        select: {
          userId: true,
        },
        distinct: ['userId'],
      });
      returningCustomers = previousCustomerOrders.filter(o => o.userId).length;
    }

    const averageOrderValue = orders.length > 0
      ? Math.round((totalRevenue / orders.length) * 100) / 100
      : 0;

    // 10. Format and return response
    const analyticsData: AnalyticsData = {
      period,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      revenue: {
        total: Math.round(totalRevenue * 100) / 100,
        trend: revenueTrend,
        comparisonToPrevious: Math.round(comparisonToPrevious * 100) / 100,
      },
      orders: {
        total: orders.length,
        statusBreakdown,
        trend: orderTrend,
      },
      topProducts,
      topCategories,
      customers: {
        totalCustomers,
        newCustomers,
        returningCustomers,
        averageOrderValue,
      },
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
