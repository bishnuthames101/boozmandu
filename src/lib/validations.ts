import { z } from 'zod';

// User authentication schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().regex(/^(98|97)\d{8}$/, 'Please enter a valid Nepali phone number (e.g., 9801234567)'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});

// Admin authentication schemas
export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Order schemas
export const orderItemSchema = z.object({
  productId: z.string().uuid(),
  productName: z.string(),
  productImage: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

export const createOrderSchema = z.object({
  userId: z.string().uuid().optional().nullable(),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().regex(/^(98|97)\d{8}$/, 'Please enter a valid Nepali phone number'),
  customerAddress: z.string().min(5, 'Address must be at least 5 characters'),
  notes: z.string().optional().nullable(),
  total: z.number().positive(),
  items: z.array(orderItemSchema).min(1, 'Order must have at least one item'),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED']),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;
