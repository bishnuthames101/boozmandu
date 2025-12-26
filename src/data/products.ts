import { Product } from '../types';

const sodaImages = {
  kinleySoda: 'https://images.pexels.com/photos/7841896/pexels-photo-7841896.jpeg?auto=compress&cs=tinysrgb&w=600', // Clear soda bottle
  cocaCola: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=600',
  cocaColaZero: 'https://images.pexels.com/photos/12728975/pexels-photo-12728975.jpeg?auto=compress&cs=tinysrgb&w=600', // Coke Zero cans
  sprite: 'https://images.pexels.com/photos/8783496/pexels-photo-8783496.jpeg?auto=compress&cs=tinysrgb&w=600', // Sprite can
  fanta: 'https://images.pexels.com/photos/13673056/pexels-photo-13673056.jpeg?auto=compress&cs=tinysrgb&w=600', // Fanta can (orange)
};
const batchTwoImages = {
  fanta: 'https://images.pexels.com/photos/13673056/pexels-photo-13673056.jpeg?auto=compress&cs=tinysrgb&w=600',
  realJuice: 'https://images.pexels.com/photos/161526/fruit-juice-juice-orange-juice-vitamin-c-161526.jpeg?auto=compress&cs=tinysrgb&w=600',
  redBull: 'https://images.pexels.com/photos/1809341/pexels-photo-1809341.jpeg?auto=compress&cs=tinysrgb&w=600',
  energyDrinkGeneric: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=600',
  sojuGeneric: 'https://images.pexels.com/photos/7045390/pexels-photo-7045390.jpeg?auto=compress&cs=tinysrgb&w=600',
  somersbyCider: 'https://images.pexels.com/photos/50596/cider-somersby-drink-somersby-cider-50596.jpeg?auto=compress&cs=tinysrgb&w=600',
  localSpiritGeneric: 'https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=600',
  gingerAleGeneric: 'https://images.pexels.com/photos/8021985/pexels-photo-8021985.jpeg?auto=compress&cs=tinysrgb&w=600',
  syrupGeneric: 'https://images.pexels.com/photos/7189071/pexels-photo-7189071.jpeg?auto=compress&cs=tinysrgb&w=600',
  martiniVermouth: 'https://images.pexels.com/photos/7647916/pexels-photo-7647916.jpeg?auto=compress&cs=tinysrgb&w=600',
};
const beerImages = {
  genericLager: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=600',
  carlsberg: 'https://images.pexels.com/photos/14000937/pexels-photo-14000937.jpeg?auto=compress&cs=tinysrgb&w=600',
  budweiser: 'https://images.pexels.com/photos/16793708/pexels-photo-16793708.jpeg?auto=compress&cs=tinysrgb&w=600',
  craftBeer: 'https://images.pexels.com/photos/5509044/pexels-photo-5509044.jpeg?auto=compress&cs=tinysrgb&w=600', // For IPA/Pale Ale
};
const whiskyImages = {
  genericWhisky: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=600',
};
const rumImages = {
  genericRum: 'https://images.pexels.com/photos/9700681/pexels-photo-9700681.jpeg?auto=compress&cs=tinysrgb&w=600',
};

const vodkaImages = {
  genericVodka: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=600',
  smirnoff: 'https://images.pexels.com/photos/715929/pexels-photo-715929.jpeg?auto=compress&cs=tinysrgb&w=600',
};
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
  },
  {
      id: '91',
      name: 'Kinley Soda',
      category: 'sodas',
      price: 70,
      image: sodaImages.kinleySoda,
      description: 'Crisp and refreshing carbonated water, perfect as a mixer or to be enjoyed on its own for a bubbly zest.',
      alcoholPercentage: 0,
      volume: '500ml',
      origin: 'India (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '92',
      name: 'Coca Cola',
      category: 'sodas',
      price: 50,
      image: sodaImages.cocaCola,
      description: 'The iconic and original Coca-Cola, offering a classic, uplifting refreshment known worldwide.',
      alcoholPercentage: 0,
      volume: '250ml',
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '93',
      name: 'Coca Cola',
      category: 'sodas',
      price: 75,
      image: sodaImages.cocaCola,
      description: 'The iconic and original Coca-Cola, offering a classic, uplifting refreshment known worldwide.',
      alcoholPercentage: 0,
      volume: '500ml',
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '94',
      name: 'Coca Cola',
      category: 'sodas',
      price: 130,
      image: sodaImages.cocaCola,
      description: 'The iconic and original Coca-Cola, offering a classic, uplifting refreshment known worldwide.',
      alcoholPercentage: 0,
      volume: '1000ml', // 1.00 litres
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '95',
      name: 'Coca Cola',
      category: 'sodas',
      price: 170,
      image: sodaImages.cocaCola,
      description: 'The iconic and original Coca-Cola, offering a classic, uplifting refreshment known worldwide.',
      alcoholPercentage: 0,
      volume: '1500ml', // 1.50 litres
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '96',
      name: 'Coca Cola',
      category: 'sodas',
      price: 250,
      image: sodaImages.cocaCola,
      description: 'The iconic and original Coca-Cola, offering a classic, uplifting refreshment known worldwide.',
      alcoholPercentage: 0,
      volume: '2250ml', // 2.25 litres
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '97',
      name: 'Coca Cola Zero Sugar',
      category: 'sodas',
      price: 75,
      image: sodaImages.cocaColaZero,
      description: 'Experience the great taste of Coca-Cola with zero sugar and zero calories. Refreshing and bold.',
      alcoholPercentage: 0,
      volume: '500ml',
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '98',
      name: 'Sprite',
      category: 'sodas',
      price: 50,
      image: sodaImages.sprite,
      description: 'A clear, lemon-lime flavored soft drink with a crisp, clean taste that quenches your thirst.',
      alcoholPercentage: 0,
      volume: '250ml',
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '99',
      name: 'Sprite',
      category: 'sodas',
      price: 75,
      image: sodaImages.sprite,
      description: 'A clear, lemon-lime flavored soft drink with a crisp, clean taste that quenches your thirst.',
      alcoholPercentage: 0,
      volume: '500ml',
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '100',
      name: 'Sprite',
      category: 'sodas',
      price: 130,
      image: sodaImages.sprite,
      description: 'A clear, lemon-lime flavored soft drink with a crisp, clean taste that quenches your thirst.',
      alcoholPercentage: 0,
      volume: '1000ml', // 1.00 litres
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '101',
      name: 'Sprite',
      category: 'sodas',
      price: 170,
      image: sodaImages.sprite,
      description: 'A clear, lemon-lime flavored soft drink with a crisp, clean taste that quenches your thirst.',
      alcoholPercentage: 0,
      volume: '1500ml', // 1.50 litres
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '102',
      name: 'Sprite',
      category: 'sodas',
      price: 250,
      image: sodaImages.sprite,
      description: 'A clear, lemon-lime flavored soft drink with a crisp, clean taste that quenches your thirst.',
      alcoholPercentage: 0,
      volume: '2250ml', // 2.25 litres
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '103',
      name: 'Fanta',
      category: 'sodas',
      image: sodaImages.fanta,
      description: 'Bright, bubbly and popular, Fanta is a vibrant fruit-flavored carbonated drink, typically orange.',
      origin: 'Germany (Brand)',
      inStock: true,
      featured: false,
      price: 0,
      alcoholPercentage: 0,
      volume: '',
      variants: [
        { id: '103-250', volume: '250ml', price: 50 },
        { id: '104-500', volume: '500ml', price: 75 },
        { id: '105-1000', volume: '1000ml', price: 130, image: batchTwoImages.fanta },
        { id: '106-1500', volume: '1500ml', price: 170, image: batchTwoImages.fanta },
        { id: '107-2250', volume: '2250ml', price: 250, image: batchTwoImages.fanta }
      ]
    },
    {
      id: '108',
      name: 'Real Juice',
      category: 'juice',
      price: 290,
      image: batchTwoImages.realJuice,
      description: 'Real Fruit Power offers a range of delicious fruit juices, packed with natural flavors and goodness.',
      alcoholPercentage: 0,
      volume: '1000ml', // 1.00 litres
      origin: 'India (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '109',
      name: 'Red Bull',
      category: 'energydrink',
      price: 120,
      image: batchTwoImages.redBull,
      description: 'The classic energy drink that vitalizes body and mind, providing a much-needed boost.',
      alcoholPercentage: 0,
      volume: '250ml',
      origin: 'Austria (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '110',
      name: 'Max Tiger',
      category: 'energydrink',
      price: 110,
      image: batchTwoImages.energyDrinkGeneric, // Specific Max Tiger image may be harder to find on Pexels
      description: 'A popular energy drink in Southeast Asia, designed to boost energy and alertness.',
      alcoholPercentage: 0,
      volume: '250ml',
      origin: 'Thailand (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '111',
      name: 'Extreme', // Assuming a generic or local energy drink, or could be specific like Sting Extreme
      category: 'energydrink',
      price: 130,
      image: batchTwoImages.energyDrinkGeneric,
      description: 'A stimulating energy drink providing a quick boost of energy for demanding activities.',
      alcoholPercentage: 0,
      volume: '330ml',
      origin: 'Unknown', // Or Philippines if Sting variant
      inStock: true,
      featured: false
    },
    {
      id: '112',
      name: 'San Soju',
      category: 'soju',
      price: 170,
      image: batchTwoImages.sojuGeneric,
      description: 'A Nepali brand of Korean-style soju, this clear spirit is smooth and often enjoyed chilled with meals.',
      alcoholPercentage: 13, // Approx.
      volume: '300ml',
      origin: 'Nepal (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '113',
      name: 'Somersby Apple Cider',
      category: 'cider',
      price: 220,
      image: batchTwoImages.somersbyCider,
      description: 'A wonderfully crisp and refreshing apple cider from Denmark, perfect for a sunny afternoon.',
      alcoholPercentage: 4.5,
      volume: '250ml',
      origin: 'Denmark (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '114',
      name: 'Ne Chyang',
      category: 'localspirit',
      price: 275,
      image: batchTwoImages.localSpiritGeneric,
      description: 'A traditional Nepali fermented beverage, Chyang offers a unique taste of local culture and heritage.',
      alcoholPercentage: 11, // Approx., can vary
      volume: '100ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '115',
      name: 'Ginger Ale', // Assuming generic or a common brand like Schweppes
      category: 'sodas',
      price: 130,
      image: batchTwoImages.gingerAleGeneric,
      description: 'A classic carbonated soft drink flavored with ginger, offering a mildly spicy and sweet refreshment.',
      alcoholPercentage: 0,
      volume: '180ml',
      origin: 'Various', // Or Switzerland/UK if Schweppes
      inStock: true,
      featured: false
    },
    {
      id: '116',
      name: 'Monin Almond Orgeat',
      category: 'syrup',
      price: 1600,
      image: batchTwoImages.syrupGeneric,
      description: 'Monin Almond (Orgeat) syrup delivers the sweet, distinct taste of almonds for crafting lattes, cocktails, and mocktails.',
      alcoholPercentage: 0,
      volume: '700ml',
      origin: 'France (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '117',
      name: 'Monin Grapefruit',
      category: 'syrup',
      price: 1750,
      image: batchTwoImages.syrupGeneric,
      description: 'Monin Grapefruit syrup offers a tangy and refreshing citrus flavor, ideal for sodas, cocktails, and teas.',
      alcoholPercentage: 0,
      volume: '1000ml', // 1.00 litres
      origin: 'France (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '118',
      name: '1883 Amaretto Syrup',
      category: 'syrup',
      price: 2000,
      image: batchTwoImages.syrupGeneric, // Similar to Monin for visual consistency if specific 1883 not found
      description: '1883 Amaretto syrup features the classic bittersweet almond flavor of Italy, perfect for coffees and cocktails.',
      alcoholPercentage: 0,
      volume: '1000ml', // 1.00 litres
      origin: 'France (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '119',
      name: 'Martini Extra Dry Vermouth',
      category: 'vermouth',
      price: 3700,
      image: batchTwoImages.martiniVermouth,
      description: 'The renowned Martini Extra Dry Vermouth, a staple for classic martinis with its crisp, herbal character.',
      alcoholPercentage: 18,
      volume: '1000ml', // 1.00 litres
      origin: 'Italy (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '120',
      name: 'Nepal Ice Can',
      category: 'beer',
      price: 275,
      image: beerImages.genericLager,
      description: 'A refreshing and popular premium lager from Nepal, known for its crisp taste.',
      alcoholPercentage: 5.5,
      volume: '500ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '121',
      name: 'Gorkha Strong Can',
      category: 'beer',
      price: 275,
      image: beerImages.genericLager,
      description: 'A strong Nepalese beer offering a robust flavor and a higher alcohol content for a bold experience.',
      alcoholPercentage: 7.0,
      volume: '500ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '122',
      name: 'Barasinghe Pilsner Can',
      category: 'beer',
      price: 310,
      image: beerImages.genericLager,
      description: 'A craft pilsner from Barasinghe, brewed in Nepal, offering a crisp, clean, and refreshing taste.',
      alcoholPercentage: 5.0,
      volume: '500ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '123',
      name: 'Tuborg Can',
      category: 'beer',
      price: 320,
      image: beerImages.genericLager, // Tuborg uses a green bottle/can
      description: 'A well-known Danish lager, Tuborg is enjoyed globally for its refreshing taste and balanced bitterness.',
      alcoholPercentage: 4.6,
      volume: '500ml',
      origin: 'Denmark (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '124',
      name: 'Carlsberg Can',
      category: 'beer',
      price: 370,
      image: beerImages.carlsberg,
      description: 'A world-famous Danish pilsner, Carlsberg offers a harmonious balance of bitterness and malty sweetness.',
      alcoholPercentage: 5.0,
      volume: '500ml',
      origin: 'Denmark (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '125',
      name: 'Mustang', // Assuming Mustang Premium Strong Beer
      category: 'beer',
      price: 170,
      image: beerImages.genericLager,
      description: 'A strong Nepalese beer known for its bold character and satisfyingly smooth finish.',
      alcoholPercentage: 7.0,
      volume: '330ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '126',
      name: 'Budweiser',
      category: 'beer',
      price: 190,
      image: beerImages.budweiser,
      description: 'The "King of Beers", this American-style lager is renowned for its crisp, clean, and refreshing taste.',
      alcoholPercentage: 5.0,
      volume: '330ml',
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '127',
      name: 'Budweiser',
      category: 'beer',
      price: 350,
      image: beerImages.budweiser,
      description: 'The "King of Beers", this American-style lager is renowned for its crisp, clean, and refreshing taste.',
      alcoholPercentage: 5.0,
      volume: '650ml',
      origin: 'USA (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '128',
      name: 'Arna Strong',
      category: 'beer',
      price: 170,
      image: beerImages.genericLager,
      description: 'Arna Strong is a Nepalese beer that packs a punch with its higher alcohol content and robust flavor.',
      alcoholPercentage: 7.0,
      volume: '330ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '129',
      name: 'Arna Strong',
      category: 'beer',
      price: 300,
      image: beerImages.genericLager,
      description: 'Arna Strong is a Nepalese beer that packs a punch with its higher alcohol content and robust flavor.',
      alcoholPercentage: 7.0,
      volume: '650ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '130',
      name: 'Barasinghe Pilsner',
      category: 'beer',
      price: 190,
      image: beerImages.genericLager,
      description: 'A craft pilsner from Barasinghe, brewed in Nepal, offering a crisp, clean, and refreshing taste in a smaller serving.',
      alcoholPercentage: 5.0,
      volume: '330ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '131',
      name: 'Barasinghe Pilsner',
      category: 'beer',
      price: 390,
      image: beerImages.genericLager,
      description: 'A craft pilsner from Barasinghe, brewed in Nepal, offering a crisp, clean, and refreshing taste.',
      alcoholPercentage: 5.0,
      volume: '650ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '132',
      name: 'Barasinghe Hazy IPA',
      category: 'beer',
      price: 435,
      image: beerImages.craftBeer,
      description: 'A flavorful Hazy India Pale Ale from Barasinghe, featuring juicy hop aromas and a smooth, less bitter finish.',
      alcoholPercentage: 6.0,
      volume: '650ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '133',
      name: 'Barasinghe Pale Ale',
      category: 'beer',
      price: 225,
      image: beerImages.craftBeer,
      description: 'A well-balanced Pale Ale from Barasinghe, showcasing pleasant hoppy notes and a refreshing character.',
      alcoholPercentage: 5.5,
      volume: '330ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '134',
      name: 'Barasinghe Pale Ale',
      category: 'beer',
      price: 425,
      image: beerImages.craftBeer,
      description: 'A well-balanced Pale Ale from Barasinghe, showcasing pleasant hoppy notes and a refreshing character.',
      alcoholPercentage: 5.5,
      volume: '650ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '135',
      name: 'Nepal Ice',
      category: 'beer',
      price: 180,
      image: beerImages.genericLager,
      description: 'A refreshing and popular premium lager from Nepal, known for its crisp taste.',
      alcoholPercentage: 5.5,
      volume: '330ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '136',
      name: 'Nepal Ice',
      category: 'beer',
      price: 330,
      image: beerImages.genericLager,
      description: 'A refreshing and popular premium lager from Nepal, known for its crisp taste.',
      alcoholPercentage: 5.5,
      volume: '650ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '137',
      name: 'Gorkha', // Assuming Gorkha Premium
      category: 'beer',
      price: 180,
      image: beerImages.genericLager,
      description: 'A premium Nepalese lager, brewed with fine hops and malt for a smooth, satisfying taste.',
      alcoholPercentage: 5.0,
      volume: '330ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '138',
      name: 'Gorkha', // Assuming Gorkha Premium
      category: 'beer',
      price: 340,
      image: beerImages.genericLager,
      description: 'A premium Nepalese lager, brewed with fine hops and malt for a smooth, satisfying taste.',
      alcoholPercentage: 5.0,
      volume: '650ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '139',
      name: 'London Ice',
      category: 'beer',
      price: 295,
      image: beerImages.genericLager,
      description: 'A crisp and strong lager brewed in Nepal, offering a refreshing experience with a bit more kick.',
      alcoholPercentage: 6.5, // Approximate
      volume: '650ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '140',
      name: 'Tuborg', // Assuming Tuborg Green bottle
      category: 'beer',
      price: 430,
      image: beerImages.genericLager,
      description: 'Refreshing Danish lager with a crisp taste and balanced bitterness, widely enjoyed.',
      alcoholPercentage: 4.6,
      volume: '650ml',
      origin: 'Denmark (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '141',
      name: 'Carlsberg', // Assuming Carlsberg Green bottle
      category: 'beer',
      price: 460,
      image: beerImages.carlsberg,
      description: 'A world-famous Danish pilsner, Carlsberg offers a harmonious balance of bitterness and malty sweetness.',
      alcoholPercentage: 5.0,
      volume: '650ml',
      origin: 'Denmark (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '142',
      name: 'Carlsberg Can', // Revisiting with new price from this list
      category: 'beer',
      price: 375,
      image: beerImages.carlsberg,
      description: 'A world-famous Danish pilsner, Carlsberg offers a harmonious balance of bitterness and malty sweetness in a convenient can.',
      alcoholPercentage: 5.0,
      volume: '500ml',
      origin: 'Denmark (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '143',
      name: 'Golden Oak',
      category: 'whisky',
      price: 1230,
      image: whiskyImages.genericWhisky,
      description: 'A popular Nepalese blended whisky, known for its smooth character and pleasant oaky notes.',
      alcoholPercentage: 42.8,
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '144',
      name: 'Old Durbar',
      category: 'whisky',
      price: 2930,
      image: whiskyImages.genericWhisky,
      description: 'A premium Nepalese whisky, celebrated for its rich flavor profile, smoothness, and traditional craftsmanship.',
      alcoholPercentage: 42.8,
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '145',
      name: 'Old Durbar Black Chimney',
      category: 'whisky',
      price: 3850,
      image: whiskyImages.genericWhisky,
      description: 'A distinctive variant of Old Durbar, offering an enhanced smoky character and a complex depth of flavor.',
      alcoholPercentage: 42.8,
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '146',
      name: 'Black Oak',
      category: 'whisky',
      price: 1400,
      image: whiskyImages.genericWhisky,
      description: 'A smooth and mellow blended Nepalese whisky, noted for its approachable oaky notes and balanced character.',
      alcoholPercentage: 42.8,
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '147',
      name: 'Himalayan Reserve',
      category: 'whisky',
      price: 3300,
      image: whiskyImages.genericWhisky,
      description: 'A premium Nepalese whisky, crafted for a smooth and rich experience, inspired by the purity of the Himalayas.',
      alcoholPercentage: 42.8,
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '148',
      name: 'Bandipur',
      category: 'whisky',
      price: 4900,
      image: whiskyImages.genericWhisky,
      description: 'A fine Nepalese whisky, offering a sophisticated blend that captures a smooth and memorable taste experience.',
      alcoholPercentage: 42.8, // Assuming standard Nepalese whisky ABV
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '149',
      name: 'GurkhasAndGuns',
      category: 'whisky',
      price: 3050,
      image: whiskyImages.genericWhisky,
      description: 'A classic Nepalese blended whisky that pays tribute to heritage, known for its robust flavor and smooth quality.',
      alcoholPercentage: 42.8,
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '150',
      name: 'Kala Pathhar',
      category: 'whisky',
      price: 2800,
      image: whiskyImages.genericWhisky,
      description: 'A Nepalese whisky, potentially named after the Everest viewpoint, offering a robust and memorable flavor.',
      alcoholPercentage: 42.8, // Assuming standard for Nepali whisky
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '151',
      name: 'Mustang Black',
      category: 'whisky',
      price: 2080,
      image: whiskyImages.genericWhisky,
      description: 'A variant of Mustang whisky from Nepal, likely offering a deeper, bolder, or more intense flavor profile.',
      alcoholPercentage: 42.8, // Assuming standard
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '152',
      name: 'Signature Rare',
      category: 'whisky',
      price: 2490,
      image: whiskyImages.genericWhisky,
      description: 'A well-known Indian blended whisky, Signature Rare is prized for its smoothness and rich, mellow character.',
      alcoholPercentage: 42.8,
      volume: '750ml',
      origin: 'India (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '153',
      name: 'Mustang Gold',
      category: 'whisky',
      price: 1150,
      image: whiskyImages.genericWhisky,
      description: 'A premium expression of Mustang whisky from Nepal, possibly offering a smoother, more refined, or specially aged taste.',
      alcoholPercentage: 42.8, // Assuming standard
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '154',
      name: 'Signature Premium',
      category: 'whisky',
      price: 2600,
      image: whiskyImages.genericWhisky,
      description: 'Signature Premium whisky, an esteemed Indian blend known for its consistent quality and distinctive smooth taste.',
      alcoholPercentage: 42.8,
      volume: '750ml',
      origin: 'India (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '155',
      name: 'Virgin Gold',
      category: 'whisky',
      price: 1200,
      image: whiskyImages.genericWhisky,
      description: 'A Nepalese whisky offering a smooth and accessible flavor profile, suitable for various palates.',
      alcoholPercentage: 42.8, // Assuming local brand standard
      volume: '750ml',
      origin: 'Nepal', // Assuming
      inStock: true,
      featured: false
    },
    {
      id: '156',
      name: 'Red And Black',
      category: 'whisky',
      price: 1300,
      image: whiskyImages.genericWhisky,
      description: 'A blended Nepalese whisky, the name "Red And Black" might indicate a mix of characters for a balanced taste.',
      alcoholPercentage: 42.8, // Assuming local brand standard
      volume: '750ml',
      origin: 'Nepal', // Assuming
      inStock: true,
      featured: false
    },
    {
      id: '157',
      name: 'Royal Blue',
      category: 'whisky',
      price: 1200,
      image: whiskyImages.genericWhisky,
      description: 'A Nepalese whisky with a regal name, suggesting a smooth, refined, and premium quality drinking experience.',
      alcoholPercentage: 42.8, // Assuming local brand standard
      volume: '750ml',
      origin: 'Nepal', // Assuming
      inStock: true,
      featured: false
    },
    {
      id: '158',
      name: 'Passport',
      category: 'whisky',
      price: 1100,
      image: whiskyImages.genericWhisky,
      description: 'Passport Scotch is a popular blended Scotch whisky known for its smooth, light, and unusually fruity character.',
      alcoholPercentage: 40.0,
      volume: '750ml',
      origin: 'Scotland (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '159',
      name: 'Yarchagumba',
      category: 'whisky',
      price: 10500,
      image: whiskyImages.genericWhisky,
      description: 'A unique and highly premium Nepalese whisky, often infused with the prized Yarchagumba herb, known for its distinct flavor and reputed properties.',
      alcoholPercentage: 42.8,
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '160',
      name: 'Baron Select Premium',
      category: 'whisky',
      price: 1175,
      image: whiskyImages.genericWhisky,
      description: 'A select premium Nepalese whisky, carefully blended to offer a refined taste and exceptionally smooth finish.',
      alcoholPercentage: 42.8, // Assuming local brand standard
      volume: '750ml',
      origin: 'Nepal', // Assuming
      inStock: true,
      featured: false
    },
    {
      id: '161',
      name: 'Khukri Rum',
      category: 'rum',
      price: 2075,
      image: rumImages.genericRum,
      description: "Nepal's iconic Khukri XXX Rum, renowned for its distinctively smooth, rich, and flavorful character.",
      alcoholPercentage: 42.8,
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '162',
      name: 'Old Monk', // Corrected from "MOnk"
      category: 'rum',
      price: 2050,
      image: rumImages.genericRum,
      description: 'A classic Indian dark rum, Old Monk is celebrated worldwide for its vatted molasses character, hints of vanilla, and enduring smooth finish.',
      alcoholPercentage: 42.8,
      volume: '750ml',
      origin: 'India (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '163',
      name: 'Honey Hunter Rum',
      category: 'rum',
      price: 3200,
      image: rumImages.genericRum,
      description: 'A Nepalese rum, possibly infused with local honey, offering a uniquely sweet and smooth drinking experience.',
      alcoholPercentage: 42.8, // Assuming standard Nepali rum ABV
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '164',
      name: 'Coronation Rum 375ml', // Name as listed
      category: 'rum',
      price: 2650,
      image: rumImages.genericRum,
      description: 'Khukri Coronation Rum is a special edition Nepalese rum, famously presented in a unique Khukri-shaped bottle, symbolizing prestige.',
      alcoholPercentage: 42.8,
      volume: '750ml', // Volume from the column, not the name
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '165',
      name: '8848', // Assuming 8848 Vodka
      category: 'vodka',
      price: 2260,
      image: vodkaImages.genericVodka,
      description: 'A premium Nepalese vodka named after Mount Everest, known for its exceptional smoothness and purity, crafted using Himalayan resources.',
      alcoholPercentage: 40.0,
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '166',
      name: 'Ruslan', // Ruslan Vodka
      category: 'vodka',
      price: 2250,
      image: vodkaImages.genericVodka,
      description: 'A popular and classic Nepalese vodka, Ruslan has long been known for its consistent purity and clean, crisp taste.',
      alcoholPercentage: 40.0,
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '167',
      name: 'Highlander', // Highlander Vodka
      category: 'vodka',
      price: 1100,
      image: vodkaImages.genericVodka,
      description: 'An accessible Nepalese vodka, Highlander offers a smooth and reliable experience for various occasions and mixers.',
      alcoholPercentage: 40.0,
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    },
    {
      id: '168',
      name: 'Nude', // Nude Vodka
      category: 'vodka',
      price: 2100,
      image: vodkaImages.genericVodka,
      description: 'A modern Nepalese vodka, Nude likely emphasizes natural purity and a clean, crisp profile for contemporary tastes.',
      alcoholPercentage: 40.0,
      volume: '750ml',
      origin: 'Nepal', // Assuming
      inStock: true,
      featured: false
    },
    {
      id: '169',
      name: 'Smirnoff', // Corrected from "Smrnoff"
      category: 'vodka',
      price: 2150,
      image: vodkaImages.smirnoff,
      description: "One of the world's best-selling vodkas, Smirnoff is renowned for its exceptionally smooth taste, perfect for cocktails or sipping neat.",
      alcoholPercentage: 40.0, // Common ABV, can be 37.5%
      volume: '750ml',
      origin: 'Russia (Brand)',
      inStock: true,
      featured: false
    },
    {
      id: '170',
      name: 'Yeti', // Yeti Vodka
      category: 'vodka',
      price: 2075,
      image: vodkaImages.genericVodka,
      description: 'A Nepalese vodka brand that invokes the spirit of the Himalayas, Yeti Vodka likely offers a clean, crisp, and pure taste.',
      alcoholPercentage: 40.0,
      volume: '750ml',
      origin: 'Nepal',
      inStock: true,
      featured: false
    }
    
];

// Generate proper UUIDs for products (fixes validation issue)
export const getProducts = () => {
  return products.map((product, index) => {
    // Generate a valid UUID v4 format based on index
    const indexHex = index.toString(16).padStart(12, '0');
    const uuid = `${indexHex.slice(0, 8)}-${indexHex.slice(8, 12)}-4000-8000-${index.toString().padStart(12, '0')}`;

    return {
      ...product,
      id: uuid
    };
  });
};

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
    { id: 'gin', name: 'Gin' },
    { id: 'sodas', name: 'Sodas' },
    { id: 'energydrink', name: 'Energy Drink' },
    { id: 'cider', name: 'Cider' },
    { id: 'localspirit', name: 'Local Spirit' },
    { id: 'juice', name: 'Juice' },
    { id: 'soju', name: 'Soju' },
    { id: 'syrup', name: 'Syrup' },
    { id: 'vermouth', name: 'Vermouth' }
  ];
};