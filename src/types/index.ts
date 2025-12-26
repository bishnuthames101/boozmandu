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

export type ProductCategory = 'whisky' | 'vodka' | 'beer' | 'wine' | 'rum' | 'gin' | 'sodas' | 'energydrink' | 'cider' | 'localspirit' | 'juice' | 'soju' | 'syrup' | 'vermouth';

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

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}



export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  createdAt: Date;
}