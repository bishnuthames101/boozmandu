import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Jack Daniel\'s Old No. 7',
    category: 'whisky',
    price: 4200,
    image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Charcoal mellowed drop by drop, a smooth sipping Tennessee whiskey with notes of caramel and vanilla.',
    alcoholPercentage: 40,
    volume: '750ml',
    origin: 'USA',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Grey Goose',
    category: 'vodka',
    price: 5500,
    image: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Ultra premium vodka made from 100% French ingredients, with a smooth, clear taste.',
    alcoholPercentage: 40,
    volume: '750ml',
    origin: 'France',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Tuborg Green',
    category: 'beer',
    price: 330,
    image: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Refreshing lager with a crisp taste and balanced bitterness.',
    alcoholPercentage: 4.6,
    volume: '500ml',
    origin: 'Denmark',
    inStock: true
  },
  {
    id: '4',
    name: 'Yellow Tail Shiraz',
    category: 'wine',
    price: 2800,
    image: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Rich and bold red wine with flavors of ripe berries and a hint of spice.',
    alcoholPercentage: 13.5,
    volume: '750ml',
    origin: 'Australia',
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Bacardi Superior',
    category: 'rum',
    price: 3200,
    image: 'https://images.pexels.com/photos/33265/wine-bottle-wine-glasses-wine-glass.jpg?auto=compress&cs=tinysrgb&w=600',
    description: 'Classic white rum, perfect for cocktails with a light and clean taste.',
    alcoholPercentage: 40,
    volume: '750ml',
    origin: 'Puerto Rico',
    inStock: true
  },
  {
    id: '6',
    name: 'Bombay Sapphire',
    category: 'gin',
    price: 3800,
    image: 'https://images.pexels.com/photos/5947019/pexels-photo-5947019.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Premium gin infused with 10 exotic botanicals for a distinctive and balanced flavor.',
    alcoholPercentage: 40,
    volume: '750ml',
    origin: 'England',
    inStock: true
  },
  {
    id: '7',
    name: 'Johnnie Walker Black Label',
    category: 'whisky',
    price: 6500,
    image: 'https://images.pexels.com/photos/339696/pexels-photo-339696.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Iconic blended scotch whisky, matured for at least 12 years with a smoky character.',
    alcoholPercentage: 40,
    volume: '750ml',
    origin: 'Scotland',
    inStock: true
  },
  {
    id: '8',
    name: 'Absolut Vodka',
    category: 'vodka',
    price: 2800,
    image: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Swedish vodka with a clean, crisp taste made from winter wheat.',
    alcoholPercentage: 40,
    volume: '750ml',
    origin: 'Sweden',
    inStock: true
  },
  {
    id: '9',
    name: 'Corona Extra',
    category: 'beer',
    price: 350,
    image: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Pale lager beer with a crisp, clean taste, often served with a lime wedge.',
    alcoholPercentage: 4.5,
    volume: '355ml',
    origin: 'Mexico',
    inStock: true
  },
  {
    id: '10',
    name: 'Oyster Bay Sauvignon Blanc',
    category: 'wine',
    price: 3200,
    image: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Crisp white wine with vibrant flavors of tropical fruits and fresh citrus.',
    alcoholPercentage: 12.5,
    volume: '750ml',
    origin: 'New Zealand',
    inStock: true
  },
  {
    id: '11',
    name: 'Captain Morgan Spiced Rum',
    category: 'rum',
    price: 2900,
    image: 'https://images.pexels.com/photos/33265/wine-bottle-wine-glasses-wine-glass.jpg?auto=compress&cs=tinysrgb&w=600',
    description: 'Caribbean rum blended with spices for a smooth, medium-bodied taste.',
    alcoholPercentage: 35,
    volume: '750ml',
    origin: 'Jamaica',
    inStock: true
  },
  {
    id: '12',
    name: 'Hendrick\'s Gin',
    category: 'gin',
    price: 6200,
    image: 'https://images.pexels.com/photos/5947019/pexels-photo-5947019.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Small batch gin infused with cucumber and rose petals for a unique flavor.',
    alcoholPercentage: 44,
    volume: '750ml',
    origin: 'Scotland',
    inStock: true,
    featured: true
  }
];

export const getProducts = () => products;

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getCategories = (): { id: string, name: string }[] => {
  return [
    { id: 'whisky', name: 'Whisky' },
    { id: 'vodka', name: 'Vodka' },
    { id: 'beer', name: 'Beer' },
    { id: 'wine', name: 'Wine' },
    { id: 'rum', name: 'Rum' },
    { id: 'gin', name: 'Gin' }
  ];
};