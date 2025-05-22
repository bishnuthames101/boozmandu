export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  description: string;
  alcoholPercentage: number;
  volume: string;
  origin: string;
  inStock: boolean;
  featured?: boolean;
}

export type ProductCategory = 'whisky' | 'vodka' | 'beer' | 'wine' | 'rum' | 'gin';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}