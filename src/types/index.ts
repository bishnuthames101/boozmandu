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
  variants?: Array<{
    id: string;
    volume: string;
    price: number;
    image?: string;
  }>;
}

export type ProductCategory = 'whisky' | 'vodka' | 'beer' | 'wine' | 'rum' | 'gin' | 'sodas' | 'energydrink' | 'cider' | 'localspirit'| 'juice' | 'soju'	| 'syrup' | 'vermouth';

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