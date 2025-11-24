export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
}

export interface MenuData {
  categories: string[];
  items: MenuItem[];
}

// Helper function to parse price (handles "400/450" format by taking first price)
const parsePrice = (priceStr: string | null): number => {
  if (!priceStr) return 0;
  const firstPrice = priceStr.split('/')[0].trim();
  return parseInt(firstPrice) || 0;
};

// Helper function to create description from type
const createDescription = (type: string | null, priceStr: string | null): string | undefined => {
  if (!type && !priceStr) return undefined;
  if (priceStr && priceStr.includes('/')) {
    return `Available in multiple variants`;
  }
  if (type) {
    return `Available: ${type}`;
  }
  return undefined;
};

export const menuData: { [key: string]: MenuData } = {
  food: {
    categories: [
      'All',
      'Soups',
      'Fresh Salads',
      'Sizzling Starters',
      'Dumplings',
      'Pizza',
      'Pasta',
      'Stews & Curries',
      'Asian & Chinese',
      'Rice Specials',
      'Indian Breads',
      'Desserts & Snacks'
    ],
    items: [
      // Soups
      { id: 'soup-1', name: 'Mutton Paya', description: createDescription(null, '500'), price: parsePrice('500'), category: 'Soups' },
      { id: 'soup-2', name: 'Miso', description: createDescription('Veg/Chicken', '400/450'), price: parsePrice('400/450'), category: 'Soups' },
      { id: 'soup-3', name: 'Tom Yum', description: createDescription('Veg/Chicken', '350/400'), price: parsePrice('350/400'), category: 'Soups' },
      { id: 'soup-4', name: 'Pho', description: createDescription('Veg/Chicken', '400/450'), price: parsePrice('400/450'), category: 'Soups' },
      { id: 'soup-5', name: 'Lemon Coriander', description: createDescription('Veg/Chicken', '400/450'), price: parsePrice('400/450'), category: 'Soups' },
      { id: 'soup-6', name: 'Manchow', description: createDescription('Veg/Chicken', '300/350'), price: parsePrice('300/350'), category: 'Soups' },
      { id: 'soup-7', name: 'Hot n Sour', description: createDescription('Veg/Chicken', '300/350'), price: parsePrice('300/350'), category: 'Soups' },

      // Fresh Salads
      { id: 'salad-1', name: 'Greek', description: createDescription('Veg/Chicken', '400/450'), price: parsePrice('400/450'), category: 'Fresh Salads' },
      { id: 'salad-2', name: 'Caesar', description: createDescription('Veg/Chicken', '400/450'), price: parsePrice('400/450'), category: 'Fresh Salads' },
      { id: 'salad-3', name: 'Green', description: createDescription(null, '250'), price: parsePrice('250'), category: 'Fresh Salads' },
      { id: 'salad-4', name: 'Fresh Cut Fruits', description: createDescription(null, '350'), price: parsePrice('350'), category: 'Fresh Salads' },
      { id: 'salad-5', name: 'Feta Cheese', description: createDescription(null, '400'), price: parsePrice('400'), category: 'Fresh Salads' },
      { id: 'salad-6', name: 'Peri Peri Chicken', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Fresh Salads' },
      { id: 'salad-7', name: 'Tikka', description: createDescription('Paneer/Chicken', '400/450'), price: parsePrice('400/450'), category: 'Fresh Salads' },

      // Sizzling Starters
      { id: 'starter-1', name: 'Steam Vegetables', description: createDescription(null, '400'), price: parsePrice('400'), category: 'Sizzling Starters' },
      { id: 'starter-2', name: 'Bruschetta', description: createDescription(null, '400'), price: parsePrice('400'), category: 'Sizzling Starters' },
      { id: 'starter-3', name: 'Pommes Frites', description: createDescription(null, '350'), price: parsePrice('350'), category: 'Sizzling Starters' },
      { id: 'starter-4', name: 'Masala Papad', description: createDescription(null, '300'), price: parsePrice('300'), category: 'Sizzling Starters' },
      { id: 'starter-5', name: 'Loaded Nachos', description: createDescription('Veg/Chicken', '400/450'), price: parsePrice('400/450'), category: 'Sizzling Starters' },
      { id: 'starter-6', name: 'Croquetas', description: createDescription(null, '400'), price: parsePrice('400'), category: 'Sizzling Starters' },
      { id: 'starter-7', name: 'Thai Basil', description: createDescription('Paneer/Chicken/Prawn/Fish', '400/450/600/600'), price: parsePrice('400/450/600/600'), category: 'Sizzling Starters' },
      { id: 'starter-8', name: 'Arabic Mezze Platter', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Sizzling Starters' },
      { id: 'starter-9', name: 'Tempura', description: createDescription('Veg/Prawn/Squids', '350/600/650'), price: parsePrice('350/600/650'), category: 'Sizzling Starters' },
      { id: 'starter-10', name: 'Mozzarella Sticks', description: createDescription(null, '400'), price: parsePrice('400'), category: 'Sizzling Starters' },
      { id: 'starter-11', name: 'Sambal', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Sizzling Starters' },
      { id: 'starter-12', name: 'Tikka (Paneer/Mushroom)', description: createDescription(null, '400'), price: parsePrice('400'), category: 'Sizzling Starters' },
      { id: 'starter-13', name: 'Tikka (Chicken/Fish/Prawn)', description: createDescription(null, '450/500/600'), price: parsePrice('450/500/600'), category: 'Sizzling Starters' },
      { id: 'starter-14', name: 'Chongqing', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Sizzling Starters' },
      { id: 'starter-15', name: 'Peri Peri Chicken Wings', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Sizzling Starters' },
      { id: 'starter-16', name: 'Tandoori Malai Broccoli', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Sizzling Starters' },
      { id: 'starter-17', name: 'Fried Fingers', description: createDescription('Chicken/Fish', '500/550'), price: parsePrice('500/550'), category: 'Sizzling Starters' },
      { id: 'starter-18', name: 'Sausage Sizzle', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Sizzling Starters' },
      { id: 'starter-19', name: 'Jamaican Jerk', description: createDescription('Chicken/Pork', '500/550'), price: parsePrice('500/550'), category: 'Sizzling Starters' },
      { id: 'starter-20', name: 'Fried Chicken', description: createDescription(null, '500'), price: parsePrice('500'), category: 'Sizzling Starters' },
      { id: 'starter-21', name: 'Crispy Fried Schezwan Chicken', description: createDescription(null, '500'), price: parsePrice('500'), category: 'Sizzling Starters' },
      { id: 'starter-22', name: 'Honey Chilly (Lotus Stem/Pork)', description: createDescription(null, '450/500'), price: parsePrice('450/500'), category: 'Sizzling Starters' },
      { id: 'starter-23', name: 'Fish and Chips', description: createDescription(null, '500'), price: parsePrice('500'), category: 'Sizzling Starters' },
      { id: 'starter-24', name: 'Peri Peri Chicken', description: createDescription(null, '500'), price: parsePrice('500'), category: 'Sizzling Starters' },
      { id: 'starter-25', name: 'Crispy Lamb', description: createDescription(null, '600'), price: parsePrice('600'), category: 'Sizzling Starters' },
      { id: 'starter-26', name: 'Boti Kebab', description: createDescription(null, '600'), price: parsePrice('600'), category: 'Sizzling Starters' },
      { id: 'starter-27', name: 'Seekh Kebab', description: createDescription(null, '600'), price: parsePrice('600'), category: 'Sizzling Starters' },
      { id: 'starter-28', name: 'Salt & Pepper Calamari', description: createDescription(null, '600'), price: parsePrice('600'), category: 'Sizzling Starters' },
      { id: 'starter-29', name: 'Satay (Paneer/Chicken/Prawn)', description: createDescription(null, '400/450/550'), price: parsePrice('400/450/550'), category: 'Sizzling Starters' },
      { id: 'starter-30', name: 'Chilly', description: createDescription('Paneer/Egg/Mushroom/Chicken/Fish/Prawn', '400/400/400/450/600/600'), price: parsePrice('400/400/400/450/600/600'), category: 'Sizzling Starters' },
      { id: 'starter-31', name: 'Garlic Bread (Plain/Cheese/Chilly Cheese)', description: createDescription(null, '300/350'), price: parsePrice('300/350'), category: 'Sizzling Starters' },
      { id: 'starter-32', name: 'Peanut Masala', description: createDescription(null, '300'), price: parsePrice('300'), category: 'Sizzling Starters' },
      { id: 'starter-33', name: 'Crispy Corn', description: createDescription(null, '400'), price: parsePrice('400'), category: 'Sizzling Starters' },
      { id: 'starter-34', name: 'Chicken Ghee Roast', description: createDescription(null, '550'), price: parsePrice('550'), category: 'Sizzling Starters' },
      { id: 'starter-35', name: 'Mutton Ghee Roast', description: createDescription(null, '600'), price: parsePrice('600'), category: 'Sizzling Starters' },
      { id: 'starter-36', name: 'Chicken 65', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Sizzling Starters' },
      { id: 'starter-37', name: 'Loose Prawns', description: createDescription(null, '550'), price: parsePrice('550'), category: 'Sizzling Starters' },
      { id: 'starter-38', name: 'Fried Cashew Masala', description: createDescription(null, '400'), price: parsePrice('400'), category: 'Sizzling Starters' },
      { id: 'starter-39', name: 'Tandoori Chicken (Half/Full)', description: createDescription(null, '550/850'), price: parsePrice('550/850'), category: 'Sizzling Starters' },
      { id: 'starter-40', name: 'Murgh Malai Chicken', description: createDescription(null, '500'), price: parsePrice('500'), category: 'Sizzling Starters' },
      { id: 'starter-41', name: 'Manchurian (Gobi/Mushroom/Chicken/Prawn)', description: createDescription(null, '350/400/450/550'), price: parsePrice('350/400/450/550'), category: 'Sizzling Starters' },
      { id: 'starter-42', name: 'Onion Rings', description: createDescription(null, '400'), price: parsePrice('400'), category: 'Sizzling Starters' },
      { id: 'starter-43', name: 'Butter Garlic (Mushroom/Prawn)', description: createDescription(null, '400/550'), price: parsePrice('400/550'), category: 'Sizzling Starters' },

      // Dumplings
      { id: 'dumpling-1', name: 'Gyoza', description: createDescription('Veg/Chicken', '450/500'), price: parsePrice('450/500'), category: 'Dumplings' },
      { id: 'dumpling-2', name: 'Momo', description: createDescription('Veg/Chicken', '450/500'), price: parsePrice('450/500'), category: 'Dumplings' },

      // Pizza
      { id: 'pizza-1', name: 'Margherita', description: createDescription(null, '450/550'), price: parsePrice('450/550'), category: 'Pizza' },
      { id: 'pizza-2', name: 'Keema Naan', description: createDescription(null, '600'), price: parsePrice('600'), category: 'Pizza' },
      { id: 'pizza-3', name: 'Etli Ekmek', description: createDescription(null, '600'), price: parsePrice('600'), category: 'Pizza' },
      { id: 'pizza-4', name: 'Pepperoni', description: createDescription(null, '650/750'), price: parsePrice('650/750'), category: 'Pizza' },
      { id: 'pizza-5', name: 'Quattro Formaggi', description: createDescription(null, '750/850'), price: parsePrice('750/850'), category: 'Pizza' },
      { id: 'pizza-6', name: 'Peri Peri Chicken', description: createDescription(null, '650/750'), price: parsePrice('650/750'), category: 'Pizza' },
      { id: 'pizza-7', name: 'Chicken Tikka', description: createDescription(null, '650/750'), price: parsePrice('650/750'), category: 'Pizza' },
      { id: 'pizza-8', name: 'Mexican (Veg)', description: createDescription(null, '450/550'), price: parsePrice('450/550'), category: 'Pizza' },
      { id: 'pizza-9', name: 'Paneer Tikka', description: createDescription(null, '450/550'), price: parsePrice('450/550'), category: 'Pizza' },

      // Pasta
      { id: 'pasta-1', name: 'Penne All\'Arrabbiata', description: createDescription('Veg/Chicken', '400/500'), price: parsePrice('400/500'), category: 'Pasta' },
      { id: 'pasta-2', name: 'Spaghetti Aglio E Olio', description: createDescription('Veg/Chicken', '400/500'), price: parsePrice('400/500'), category: 'Pasta' },
      { id: 'pasta-3', name: 'Spaghetti and Meatballs', description: createDescription(null, '550'), price: parsePrice('550'), category: 'Pasta' },
      { id: 'pasta-4', name: 'Lasagne Alla Bolognese', description: createDescription('Veg/Chicken/Lamb', '450/550/650'), price: parsePrice('450/550/650'), category: 'Pasta' },
      { id: 'pasta-5', name: 'Shepherd\'s Pie', description: createDescription(null, '650'), price: parsePrice('650'), category: 'Pasta' },
      { id: 'pasta-6', name: 'Penne Alfredo', description: createDescription('Veg/Chicken', '400/500'), price: parsePrice('400/500'), category: 'Pasta' },

      // Stews & Curries
      { id: 'stew-1', name: 'Punjabi Kadhi with Rice or Indian Bread', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Stews & Curries' },
      { id: 'stew-2', name: 'Kadai Paneer with Rice or Indian Bread', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Stews & Curries' },
      { id: 'stew-3', name: 'Pasanda with White Rice or Indian Bread', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Stews & Curries' },
      { id: 'stew-4', name: 'Dal Makhani with Rice or Indian Bread', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Stews & Curries' },
      { id: 'stew-5', name: 'Dal with Rice or Indian Bread', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Stews & Curries' },
      { id: 'stew-6', name: 'Massaman Curry', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Stews & Curries' },
      { id: 'stew-7', name: 'Butter Chicken with Rice or Indian Bread', description: createDescription(null, '500'), price: parsePrice('500'), category: 'Stews & Curries' },
      { id: 'stew-8', name: 'Madras Curry with Rice or Indian Bread', description: createDescription(null, '500'), price: parsePrice('500'), category: 'Stews & Curries' },
      { id: 'stew-9', name: 'Korma with Rice or Indian Bread (Chicken/Mutton)', description: createDescription(null, '500/650'), price: parsePrice('500/650'), category: 'Stews & Curries' },
      { id: 'stew-10', name: 'Yellow Curry with Jasmine Rice (Tofu/Chicken/Shrimp)', description: createDescription(null, '550/600/700'), price: parsePrice('550/600/700'), category: 'Stews & Curries' },
      { id: 'stew-11', name: 'Laal Maas with Rice or Indian Bread', description: createDescription(null, '650'), price: parsePrice('650'), category: 'Stews & Curries' },
      { id: 'stew-12', name: 'Rogan Josh with Rice or Indian Bread', description: createDescription(null, '600'), price: parsePrice('600'), category: 'Stews & Curries' },
      { id: 'stew-13', name: 'Keema with Rice or Indian Bread', description: createDescription(null, '650'), price: parsePrice('650'), category: 'Stews & Curries' },
      { id: 'stew-14', name: 'Paneer Butter Masala with Rice or Indian Bread', description: createDescription(null, '500'), price: parsePrice('500'), category: 'Stews & Curries' },
      { id: 'stew-15', name: 'Mushroom Lababdar with Rice or Indian Bread', description: createDescription(null, '500'), price: parsePrice('500'), category: 'Stews & Curries' },
      { id: 'stew-16', name: 'Chicken Tikka Masala with Rice or Indian Bread', description: createDescription(null, '550'), price: parsePrice('550'), category: 'Stews & Curries' },

      // Asian & Chinese
      { id: 'asian-1', name: 'Veg Platter', description: createDescription(null, '1500'), price: parsePrice('1500'), category: 'Asian & Chinese' },
      { id: 'asian-2', name: 'Non-Veg Platter', description: createDescription(null, '2000'), price: parsePrice('2000'), category: 'Asian & Chinese' },
      { id: 'asian-3', name: 'Sea Food Platter', description: createDescription(null, '3000'), price: parsePrice('3000'), category: 'Asian & Chinese' },
      { id: 'asian-4', name: 'Roasted Lamb Leg (As Per Size)', description: createDescription(null, null), price: 0, category: 'Asian & Chinese' },
      { id: 'asian-5', name: 'Grilled Lobster (As Per Size)', description: createDescription(null, null), price: 0, category: 'Asian & Chinese' },
      { id: 'asian-6', name: 'Grilled Murrel (As Per Size)', description: createDescription(null, null), price: 0, category: 'Asian & Chinese' },

      // Rice Specials
      { id: 'rice-1', name: 'Curd Rice', description: createDescription(null, '300'), price: parsePrice('300'), category: 'Rice Specials' },
      { id: 'rice-2', name: 'Khichdi', description: createDescription(null, '400'), price: parsePrice('400'), category: 'Rice Specials' },
      { id: 'rice-3', name: 'Pad Thai Noodles', description: createDescription('Tofu/Chicken', '500/550'), price: parsePrice('500/550'), category: 'Rice Specials' },
      { id: 'rice-4', name: 'Kebab Barg', description: createDescription('Lamb', '650'), price: parsePrice('650'), category: 'Rice Specials' },
      { id: 'rice-5', name: 'Hyderabadi Biryani', description: createDescription('Veg/Chicken/Mutton', '450/500/650'), price: parsePrice('450/500/650'), category: 'Rice Specials' },
      { id: 'rice-6', name: 'Fried Rice', description: createDescription('Veg/Egg/Chicken/Mix', '300/350/400/500'), price: parsePrice('300/350/400/500'), category: 'Rice Specials' },
      { id: 'rice-7', name: 'Noodles', description: createDescription('Veg/Egg/Chicken/Mix', '300/350/400/500'), price: parsePrice('300/350/400/500'), category: 'Rice Specials' },

      // Indian Breads (Note: The JSON had salads here, but I'll use the correct category)
      { id: 'bread-1', name: 'Plain Roti', description: createDescription(null, null), price: 0, category: 'Indian Breads' },
      { id: 'bread-2', name: 'Plain Naan', description: createDescription(null, null), price: 0, category: 'Indian Breads' },
      { id: 'bread-3', name: 'Butter Roti', description: createDescription(null, null), price: 0, category: 'Indian Breads' },
      { id: 'bread-4', name: 'Butter Naan', description: createDescription(null, null), price: 0, category: 'Indian Breads' },
      { id: 'bread-5', name: 'Garlic Naan', description: createDescription(null, null), price: 0, category: 'Indian Breads' },
      { id: 'bread-6', name: 'Lachha Paratha', description: createDescription(null, null), price: 0, category: 'Indian Breads' },

      // Desserts & Snacks
      { id: 'dessert-1', name: 'Grilled Cheese Sandwich', description: createDescription('Veg/Chicken', '350/400'), price: parsePrice('350/400'), category: 'Desserts & Snacks' },
      { id: 'dessert-2', name: 'Quesadilla', description: createDescription('Veg/Chicken', '350/400'), price: parsePrice('350/400'), category: 'Desserts & Snacks' },
      { id: 'dessert-3', name: 'Club Sandwich', description: createDescription('Veg/Chicken/Bacon', '450/500/550'), price: parsePrice('450/500/550'), category: 'Desserts & Snacks' },
      { id: 'dessert-4', name: 'Kati Roll', description: createDescription('Veg/Chicken', '350/400'), price: parsePrice('350/400'), category: 'Desserts & Snacks' },
      { id: 'dessert-5', name: 'Cheese Cake', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Desserts & Snacks' },
      { id: 'dessert-6', name: 'Gulab Jamun', description: createDescription(null, '400'), price: parsePrice('400'), category: 'Desserts & Snacks' },
      { id: 'dessert-7', name: 'Brownies', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Desserts & Snacks' },
      { id: 'dessert-8', name: 'Panna Cotta', description: createDescription(null, '400'), price: parsePrice('400'), category: 'Desserts & Snacks' },
      { id: 'dessert-9', name: 'Tiramisu', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Desserts & Snacks' },
      { id: 'dessert-10', name: 'Churros', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Desserts & Snacks' },
      { id: 'dessert-11', name: 'Chocolate of Heaven', description: createDescription(null, '450'), price: parsePrice('450'), category: 'Desserts & Snacks' },
      { id: 'dessert-12', name: 'Flavour of Ice-Cream', description: createDescription(null, '300'), price: parsePrice('300'), category: 'Desserts & Snacks' }
    ]
  },

  beverages: {
    categories: ['All', 'Whiskey - Blended', 'Whiskey - Single Malts', 'Whiskey - Rye/American/Canadian/Irish', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Cognac/Brandy', 'Liqueurs', 'Aperitif', 'Ales/Brews/Crafts', 'Premium Ales & Brews', 'Champagne/Sparkling Wine', 'Wines', 'Cocktails', 'Shots', 'Mocktails', 'Soft Beverages', 'Aerated Beverages'],
    items: [
      // Whiskey - Blended
      {
        id: 'whiskey-blended-1',
        name: 'DEWARS WITE LABEL',
        description: 'Blended Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-2',
        name: 'Royal Salute',
        description: 'Blended Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-3',
        name: 'Hibiki',
        description: 'Blended Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-4',
        name: 'Chivas Regal 18 YO',
        description: 'Blended Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-5',
        name: 'Toki',
        description: 'Blended Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-6',
        name: 'Chivas Regal 12 YO',
        description: 'Blended Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-7',
        name: 'JW Black Label',
        description: 'Blended Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-8',
        name: 'JW Blonde',
        description: 'Blended Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-9',
        name: 'Ballentine&apos;s Finest',
        description: 'Blended Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-10',
        name: 'JW Red Label',
        description: 'Blended Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Blended'
      },

      // Whiskey - Single Malts
      {
        id: 'whiskey-single-1',
        name: 'Dalmore 15 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-2',
        name: 'The Singleton 15 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-3',
        name: 'Jura 12 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-4',
        name: 'Glenfiddich 15 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-5',
        name: 'The Singleton 12 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-6',
        name: 'Glenfiddich 12 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-7',
        name: 'Talisker 10 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-8',
        name: 'Godawan 01 / 02',
        description: 'Single Malts Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Single Malts'
      },

      // Whiskey - Rye/American/Canadian/Irish
      {
        id: 'whiskey-rye-1',
        name: 'Templeton Rye 6 YO',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },
      {
        id: 'whiskey-rye-2',
        name: 'Gentleman Jack',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },
      {
        id: 'whiskey-rye-3',
        name: 'Jack Daniel&apos;s',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },
      {
        id: 'whiskey-rye-4',
        name: 'Bushmills Original',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },
      {
        id: 'whiskey-rye-5',
        name: 'Black Velvet',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },
      {
        id: 'whiskey-rye-6',
        name: 'Jameson',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },
      {
        id: 'whiskey-rye-7',
        name: 'Jim Beam',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 127,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },

      // Vodka
      {
        id: 'vodka-1',
        name: 'SMIRNOFF VODKA',
        description: 'Vodka (30ML)',
        price: 127,
        category: 'Vodka'
      },
      {
        id: 'vodka-2',
        name: 'Crystal Head',
        description: 'Vodka (30ML)',
        price: 127,
        category: 'Vodka'
      },
      {
        id: 'vodka-3',
        name: 'Roberto Cavalli',
        description: 'Vodka (30ML)',
        price: 127,
        category: 'Vodka'
      },
      {
        id: 'vodka-4',
        name: 'Uluvka',
        description: 'Vodka (30ML)',
        price: 127,
        category: 'Vodka'
      },
      {
        id: 'vodka-5',
        name: 'Beluga',
        description: 'Vodka (30ML)',
        price: 127,
        category: 'Vodka'
      },
      {
        id: 'vodka-6',
        name: 'Belvedere',
        description: 'Vodka (30ML)',
        price: 127,
        category: 'Vodka'
      },
      {
        id: 'vodka-7',
        name: 'Grey Goose',
        description: 'Vodka (30ML)',
        price: 127,
        category: 'Vodka'
      },
      {
        id: 'vodka-8',
        name: 'Absolut',
        description: 'Vodka (30ML)',
        price: 127,
        category: 'Vodka'
      },
      {
        id: 'vodka-9',
        name: 'Ketel One',
        description: 'Vodka (30ML)',
        price: 127,
        category: 'Vodka'
      },

      // Gin
      {
        id: 'gin-1',
        name: 'GREAT INDIAN GIN',
        description: 'Gin (30ML)',
        price: 127,
        category: 'Gin'
      },
      {
        id: 'gin-2',
        name: 'Roku',
        description: 'Gin (30ML)',
        price: 127,
        category: 'Gin'
      },
      {
        id: 'gin-3',
        name: 'Tanqueray No. 10',
        description: 'Gin (30ML)',
        price: 127,
        category: 'Gin'
      },
      {
        id: 'gin-4',
        name: 'Bombay Sapphire',
        description: 'Gin (30ML)',
        price: 127,
        category: 'Gin'
      },
      {
        id: 'gin-5',
        name: 'Beefeater',
        description: 'Gin (30ML)',
        price: 127,
        category: 'Gin'
      },
      {
        id: 'gin-6',
        name: 'Gordons',
        description: 'Gin (30ML)',
        price: 127,
        category: 'Gin'
      },

      // Rum
      {
        id: 'rum-1',
        name: 'BACARDI RUM - WHITE / BLACK',
        description: 'Rum (30ML)',
        price: 127,
        category: 'Rum'
      },
      {
        id: 'rum-2',
        name: 'BACARDI RUM - MANGO CHILLY',
        description: 'Rum (30ML)',
        price: 127,
        category: 'Rum'
      },
      {
        id: 'rum-3',
        name: 'BACARDI RUM - GINGER',
        description: 'Rum (30ML)',
        price: 127,
        category: 'Rum'
      },
      {
        id: 'rum-4',
        name: 'BACARDI RUM - ORANGE',
        description: 'Rum (30ML)',
        price: 127,
        category: 'Rum'
      },
      {
        id: 'rum-5',
        name: 'BACARDI RUM - LEMON',
        description: 'Rum (30ML)',
        price: 127,
        category: 'Rum'
      },
      {
        id: 'rum-6',
        name: 'OLD MONK LEGEND RUM',
        description: 'Rum (30ML)',
        price: 127,
        category: 'Rum'
      },
      {
        id: 'rum-7',
        name: 'Viva El Ron De Cuba',
        description: 'Rum (30ML)',
        price: 127,
        category: 'Rum'
      },
      {
        id: 'rum-8',
        name: 'Captain Morgan Dark',
        description: 'Rum (30ML)',
        price: 127,
        category: 'Rum'
      },
      {
        id: 'rum-9',
        name: 'Bacardi Carta Blanca',
        description: 'Rum (30ML)',
        price: 127,
        category: 'Rum'
      },

      // Tequila
      {
        id: 'tequila-1',
        name: 'DESMONDJI TEQUILA 51% AGAVE',
        description: 'Tequila (30ML)',
        price: 127,
        category: 'Tequila'
      },
      {
        id: 'tequila-2',
        name: 'Don Julio Reposado',
        description: 'Tequila (30ML)',
        price: 127,
        category: 'Tequila'
      },
      {
        id: 'tequila-3',
        name: 'Patron Reposado',
        description: 'Tequila (30ML)',
        price: 127,
        category: 'Tequila'
      },
      {
        id: 'tequila-4',
        name: 'Patron Silver',
        description: 'Tequila (30ML)',
        price: 127,
        category: 'Tequila'
      },
      {
        id: 'tequila-5',
        name: 'Jose Cuervo Gold',
        description: 'Tequila (30ML)',
        price: 127,
        category: 'Tequila'
      },
      {
        id: 'tequila-6',
        name: 'Jose Cuervo Silver',
        description: 'Tequila (30ML)',
        price: 127,
        category: 'Tequila'
      },

      // Cognac/Brandy
      {
        id: 'cognac-1',
        name: 'KYRON BRANDY',
        description: 'Cognac / Brandy (30ML)',
        price: 127,
        category: 'Cognac/Brandy'
      },
      {
        id: 'cognac-2',
        name: 'Hennessy V.S',
        description: 'Cognac / Brandy (30ML)',
        price: 127,
        category: 'Cognac/Brandy'
      },
      {
        id: 'cognac-3',
        name: 'Victor Fauconnier',
        description: 'Cognac / Brandy (30ML)',
        price: 127,
        category: 'Cognac/Brandy'
      },
      {
        id: 'cognac-4',
        name: 'Vecchia Romagna',
        description: 'Cognac / Brandy (30ML)',
        price: 127,
        category: 'Cognac/Brandy'
      },
      {
        id: 'cognac-5',
        name: 'St-Remy VSOP',
        description: 'Cognac / Brandy (30ML)',
        price: 127,
        category: 'Cognac/Brandy'
      },
      {
        id: 'cognac-6',
        name: 'Kyron',
        description: 'Cognac / Brandy (30ML)',
        price: 127,
        category: 'Cognac/Brandy'
      },

      // Aperitif
      {
        id: 'aperitif-1',
        name: 'Campari',
        description: 'Aperitif (30ML)',
        price: 127,
        category: 'Aperitif'
      },
      {
        id: 'aperitif-2',
        name: 'Aperol',
        description: 'Aperitif (30ML)',
        price: 127,
        category: 'Aperitif'
      },
      {
        id: 'aperitif-3',
        name: 'Martini Dry / Bianco',
        description: 'Aperitif (30ML)',
        price: 127,
        category: 'Aperitif'
      },

      // Ales/Brews/Crafts
      {
        id: 'ales-1',
        name: 'Bira Belgium Style Wheat Ale (4.7%)',
        description: '330ML / 1500ML / 3000ML',
        price: 127,
        category: 'Ales/Brews/Crafts'
      },
      {
        id: 'ales-2',
        name: 'Geist Dunkelweizen (5.4%)',
        description: '330ML / 1500ML / 3000ML',
        price: 127,
        category: 'Ales/Brews/Crafts'
      },
      {
        id: 'ales-3',
        name: 'Beer Sampler - 6 x 100ML',
        description: 'Choose 6 beers from above',
        price: 127,
        category: 'Ales/Brews/Crafts'
      },

      // Premium Ales & Brews
      {
        id: 'premium-ales-1',
        name: 'KF PREMIUM DRAUGHT BEER',
        description: '330ML',
        price: 127,
        category: 'Premium Ales & Brews'
      },
      {
        id: 'premium-ales-2',
        name: 'KF ULTRA',
        description: 'Premium Lager',
        price: 189,
        category: 'Premium Ales & Brews'
      },
      {
        id: 'premium-ales-3',
        name: 'KF ULTRA MAX',
        description: 'Premium Lager',
        price: 199,
        category: 'Premium Ales & Brews'
      },
      {
        id: 'premium-ales-4',
        name: 'KF ULTRA WIT',
        description: 'Premium Lager',
        price: 269,
        category: 'Premium Ales & Brews'
      },
      {
        id: 'premium-ales-5',
        name: 'Coopers Pale Ale (4.5%)',
        description: '375ML bottle',
        price: 127,
        category: 'Premium Ales & Brews'
      },
      {
        id: 'premium-ales-6',
        name: 'Corona Extra Lager (5%)',
        description: '330ML bottle',
        price: 127,
        category: 'Premium Ales & Brews'
      },

      // Cocktails
      {
        id: 'cocktail-1',
        name: 'WHISKEY SOUR',
        description: 'Modern Classics (Glass)',
        price: 127,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-2',
        name: 'CAIPIROSKA',
        description: 'Modern Classics (Glass)',
        price: 127,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-3',
        name: 'COSMOPOLITAN',
        description: 'Modern Classics (Glass)',
        price: 127,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-4',
        name: 'MOJITO',
        description: 'Modern Classics (Glass)',
        price: 127,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-5',
        name: 'DAIQUIRI',
        description: 'Modern Classics (Glass)',
        price: 127,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-6',
        name: 'GIMLET',
        description: 'Modern Classics (Glass)',
        price: 127,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-7',
        name: 'Mimosa Margarita',
        description: 'Sparkling Wine Based (Glass)',
        price: 127,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-8',
        name: 'Mojito Classic',
        description: 'Modern Classics (Glass)',
        price: 127,
        category: 'Cocktails'
      },

      // Mocktails
      {
        id: 'mocktail-1',
        name: 'MOJITO',
        description: 'Mocktails (Glass)',
        price: 127,
        category: 'Mocktails'
      },
      {
        id: 'mocktail-2',
        name: 'BLUE ANGEL',
        description: 'Mocktails (Glass)',
        price: 127,
        category: 'Mocktails'
      },
      {
        id: 'mocktail-3',
        name: 'STRAWBERRY COLADA',
        description: 'Mocktails (Glass)',
        price: 127,
        category: 'Mocktails'
      },
      {
        id: 'mocktail-4',
        name: 'VIRGIN GUAVA MARRY',
        description: 'Mocktails (Glass)',
        price: 127,
        category: 'Mocktails'
      },
      {
        id: 'mocktail-5',
        name: 'MANGO BLOOM',
        description: 'Mocktails (Glass)',
        price: 127,
        category: 'Mocktails'
      },
      {
        id: 'mocktail-6',
        name: 'COLD PRESSED JUICES',
        description: 'Mocktails (Glass)',
        price: 127,
        category: 'Mocktails'
      },
      {
        id: 'mocktail-7',
        name: 'Spice Cooler',
        description: 'Mocktails (Glass)',
        price: 127,
        category: 'Mocktails'
      },
      {
        id: 'mocktail-8',
        name: 'Nutty Dream',
        description: 'Mocktails (Glass)',
        price: 127,
        category: 'Mocktails'
      }
    ]
  },

  happyhour: {
    categories: ['All', 'Premium Ales & Brews - Bottles & Cans', 'Ales/Brews/Crafts - 330ML', 'Spirits - 30ML', 'Non-House Spirits', 'Happy Hour Food - Vegetarian', 'Happy Hour Food - Non-Vegetarian'],
    items: [
      // Premium Ales & Brews by Bottles & Cans
      {
        id: 'premium-ale-1',
        name: 'Coopers Pale Ale (ABV 4.5%)',
        description: '375ML bottle',
        price: 749,
        category: 'Premium Ales & Brews - Bottles & Cans'
      },
      {
        id: 'premium-ale-2',
        name: 'Coopers Extra Stout (ABV 6.3%)',
        description: '375ML bottle',
        price: 749,
        category: 'Premium Ales & Brews - Bottles & Cans'
      },
      {
        id: 'premium-ale-3',
        name: 'Ottinger Schwarz Dark Lager (ABV 4.9%)',
        description: '500ML bottle',
        price: 559,
        category: 'Premium Ales & Brews - Bottles & Cans'
      },
      {
        id: 'premium-ale-4',
        name: 'Ottinger Export Lager (ABV 5.4%)',
        description: '500ML bottle',
        price: 559,
        category: 'Premium Ales & Brews - Bottles & Cans'
      },
      {
        id: 'premium-ale-5',
        name: 'Ottinger Weissbier (ABV 4.9%)',
        description: '500ML bottle',
        price: 559,
        category: 'Premium Ales & Brews - Bottles & Cans'
      },
      {
        id: 'premium-ale-6',
        name: 'Hoegaarden Belgian Wheat Ale (ABV 5%)',
        description: '330ML bottle',
        price: 399,
        category: 'Premium Ales & Brews - Bottles & Cans'
      },
      {
        id: 'premium-ale-7',
        name: 'Corona Extra Lager (ABV 5%)',
        description: '330ML bottle',
        price: 389,
        category: 'Premium Ales & Brews - Bottles & Cans'
      },

      // Ales/Brews/Crafts - 330ML
      {
        id: 'craft-330-1',
        name: 'Bira Belgium Style Wheat Ale (ABV 4.7%)',
        description: '330ML bottle',
        price: 229,
        category: 'Ales/Brews/Crafts - 330ML'
      },
      {
        id: 'craft-330-2',
        name: 'Geist Dunkelweizen (ABV 5.4%)',
        description: '330ML bottle',
        price: 209,
        category: 'Ales/Brews/Crafts - 330ML'
      },
      {
        id: 'craft-330-3',
        name: 'Geist German Weizenbier (ABV 5.2%)',
        description: '330ML bottle',
        price: 209,
        category: 'Ales/Brews/Crafts - 330ML'
      },
      {
        id: 'craft-330-4',
        name: 'Geist Belgium Witbier (ABV 5%)',
        description: '330ML bottle',
        price: 209,
        category: 'Ales/Brews/Crafts - 330ML'
      },
      {
        id: 'craft-330-5',
        name: 'Geist Belgium Blonde Ale (ABV 7.7%)',
        description: '330ML bottle',
        price: 209,
        category: 'Ales/Brews/Crafts - 330ML'
      },
      {
        id: 'craft-330-6',
        name: 'Bira Sarachi Asian Rice Lager (ABV 8%)',
        description: '330ML bottle',
        price: 189,
        category: 'Ales/Brews/Crafts - 330ML'
      },
      {
        id: 'craft-330-7',
        name: 'Bud American Pale Lager (ABV 5%)',
        description: '330ML bottle',
        price: 169,
        category: 'Ales/Brews/Crafts - 330ML'
      },
      {
        id: 'craft-330-8',
        name: 'KF American Adjunct Lager (ABV 4.8%)',
        description: '330ML bottle',
        price: 149,
        category: 'Ales/Brews/Crafts - 330ML'
      },

      // Spirits - 30ML
      {
        id: 'spirit-30-1',
        name: 'Don Julio Reposado Tequila',
        description: '30ML serving',
        price: 869,
        category: 'Spirits - 30ML'
      },
      {
        id: 'spirit-30-2',
        name: 'The Singleton Singlemalt Scotch 15 YO',
        description: '30ML serving',
        price: 569,
        category: 'Spirits - 30ML'
      },
      {
        id: 'spirit-30-3',
        name: 'The Singleton Singlemalt Scotch 12 YO',
        description: '30ML serving',
        price: 489,
        category: 'Spirits - 30ML'
      },
      {
        id: 'spirit-30-4',
        name: 'Tanqueray No 10 Gin',
        description: '30ML serving',
        price: 389,
        category: 'Spirits - 30ML'
      },
      {
        id: 'spirit-30-5',
        name: 'Talisker Singlemalt Scotch 10 YO',
        description: '30ML serving',
        price: 369,
        category: 'Spirits - 30ML'
      },
      {
        id: 'spirit-30-6',
        name: 'Godawan 01 Rich & Round Indian Singlemalt',
        description: '30ML serving',
        price: 349,
        category: 'Spirits - 30ML'
      },
      {
        id: 'spirit-30-7',
        name: 'Godawan 02 Fruit & Spice Indian Singlemalt',
        description: '30ML serving',
        price: 349,
        category: 'Spirits - 30ML'
      },
      {
        id: 'spirit-30-8',
        name: 'JW Black Label Blended Scotch',
        description: '30ML serving',
        price: 309,
        category: 'Spirits - 30ML'
      },
      {
        id: 'spirit-30-9',
        name: 'Baileys Irish Cream',
        description: '30ML serving',
        price: 289,
        category: 'Spirits - 30ML'
      },
      {
        id: 'spirit-30-10',
        name: 'JW Blonde Blended Scotch',
        description: '30ML serving',
        price: 249,
        category: 'Spirits - 30ML'
      },
      {
        id: 'spirit-30-11',
        name: 'JW Red Label Blended Scotch',
        description: '30ML serving',
        price: 159,
        category: 'Spirits - 30ML'
      },
      {
        id: 'spirit-30-12',
        name: 'Ketel One Vodka',
        description: '30ML serving',
        price: 159,
        category: 'Spirits - 30ML'
      },
      {
        id: 'spirit-30-13',
        name: 'Gordons Gin',
        description: '30ML serving',
        price: 149,
        category: 'Spirits - 30ML'
      },

      // Non-House Spirits
      {
        id: 'nonhouse-1',
        name: 'Chivas Regal Blended Scotch 18 YO',
        description: 'Premium non-house spirit',
        price: 589,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-2',
        name: 'Toki Japanese Whiskey',
        description: 'Premium non-house spirit',
        price: 369,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-3',
        name: 'Chivas Regal Blended Scotch 12 YO',
        description: 'Premium non-house spirit',
        price: 349,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-4',
        name: 'Jagermeister Ice Cold',
        description: 'Premium non-house spirit',
        price: 339,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-5',
        name: 'Grey Goose Vodka',
        description: 'Premium non-house spirit',
        price: 329,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-6',
        name: 'Jose Cuervo Tequila',
        description: 'Premium non-house spirit',
        price: 329,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-7',
        name: 'Jack Daniels Tennessee Whiskey',
        description: 'Premium non-house spirit',
        price: 309,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-8',
        name: 'Bushmills Irish Whiskey',
        description: 'Premium non-house spirit',
        price: 269,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-9',
        name: 'Jameson Irish Whiskey',
        description: 'Premium non-house spirit',
        price: 249,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-10',
        name: 'Jim Beam Bourbon Whiskey',
        description: 'Premium non-house spirit',
        price: 199,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-11',
        name: 'Ballentines Blended Scotch',
        description: 'Premium non-house spirit',
        price: 189,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-12',
        name: 'Absolut Vodka',
        description: 'Premium non-house spirit',
        price: 189,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-13',
        name: 'Beefeater Gin',
        description: 'Premium non-house spirit',
        price: 179,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-14',
        name: 'Bacardi Carta Blanca',
        description: 'Premium non-house spirit',
        price: 139,
        category: 'Non-House Spirits'
      },
      {
        id: 'nonhouse-15',
        name: 'Kyron Brandy',
        description: 'Premium non-house spirit',
        price: 129,
        category: 'Non-House Spirits'
      },

      // Happy Hour Food - Vegetarian
      {
        id: 'hh-veg-1',
        name: 'Tomato & Olive Bruschetta',
        description: 'Happy hour special pricing',
        price: 149,
        category: 'Happy Hour Food - Vegetarian'
      },
      {
        id: 'hh-veg-2',
        name: 'Chilli Paneer',
        description: 'Happy hour special pricing',
        price: 169,
        category: 'Happy Hour Food - Vegetarian'
      },
      {
        id: 'hh-veg-3',
        name: 'Chilli Mushroom',
        description: 'Happy hour special pricing',
        price: 149,
        category: 'Happy Hour Food - Vegetarian'
      },
      {
        id: 'hh-veg-4',
        name: 'Schezwan Paneer',
        description: 'Happy hour special pricing',
        price: 169,
        category: 'Happy Hour Food - Vegetarian'
      },
      {
        id: 'hh-veg-5',
        name: 'Paneer Tikka',
        description: 'Happy hour special pricing',
        price: 169,
        category: 'Happy Hour Food - Vegetarian'
      },
      {
        id: 'hh-veg-6',
        name: 'Loaded Veg Nachos',
        description: 'Happy hour special pricing',
        price: 189,
        category: 'Happy Hour Food - Vegetarian'
      },
      {
        id: 'hh-veg-7',
        name: 'Dahi Ke Kebab',
        description: 'Happy hour special pricing',
        price: 189,
        category: 'Happy Hour Food - Vegetarian'
      },
      {
        id: 'hh-veg-8',
        name: 'Malai Broccoli',
        description: 'Happy hour special pricing',
        price: 169,
        category: 'Happy Hour Food - Vegetarian'
      },
      {
        id: 'hh-veg-9',
        name: 'Funghi Cigar Rolls',
        description: 'Happy hour special pricing',
        price: 189,
        category: 'Happy Hour Food - Vegetarian'
      },
      {
        id: 'hh-veg-10',
        name: 'Veg Garden Pizza',
        description: 'Happy hour special pricing',
        price: 229,
        category: 'Happy Hour Food - Vegetarian'
      },
      {
        id: 'hh-veg-11',
        name: 'Margarita Pizza',
        description: 'Happy hour special pricing',
        price: 229,
        category: 'Happy Hour Food - Vegetarian'
      },

      // Happy Hour Food - Non-Vegetarian
      {
        id: 'hh-nonveg-1',
        name: 'Honey Chilli Chicken',
        description: 'Happy hour special pricing',
        price: 189,
        category: 'Happy Hour Food - Non-Vegetarian'
      },
      {
        id: 'hh-nonveg-2',
        name: 'BBQ Chicken Wings',
        description: 'Happy hour special pricing',
        price: 199,
        category: 'Happy Hour Food - Non-Vegetarian'
      },
      {
        id: 'hh-nonveg-3',
        name: 'Grilled Chicken Tikka',
        description: 'Happy hour special pricing',
        price: 199,
        category: 'Happy Hour Food - Non-Vegetarian'
      },
      {
        id: 'hh-nonveg-4',
        name: 'Murgh Malai Kebab',
        description: 'Happy hour special pricing',
        price: 219,
        category: 'Happy Hour Food - Non-Vegetarian'
      },
      {
        id: 'hh-nonveg-5',
        name: 'Chicken Ghee Roast',
        description: 'Happy hour special pricing',
        price: 239,
        category: 'Happy Hour Food - Non-Vegetarian'
      },
      {
        id: 'hh-nonveg-6',
        name: 'Schezwan Chicken',
        description: 'Happy hour special pricing',
        price: 219,
        category: 'Happy Hour Food - Non-Vegetarian'
      },
      {
        id: 'hh-nonveg-7',
        name: 'Crispy Crumb Fried Chicken',
        description: 'Happy hour special pricing',
        price: 229,
        category: 'Happy Hour Food - Non-Vegetarian'
      },
      {
        id: 'hh-nonveg-8',
        name: 'Chicken Nachos',
        description: 'Happy hour special pricing',
        price: 249,
        category: 'Happy Hour Food - Non-Vegetarian'
      },
      {
        id: 'hh-nonveg-9',
        name: 'Peri Peri Chicken Pizza',
        description: 'Happy hour special pricing',
        price: 269,
        category: 'Happy Hour Food - Non-Vegetarian'
      },
      {
        id: 'hh-nonveg-10',
        name: 'BBQ Chicken Pizza',
        description: 'Happy hour special pricing',
        price: 269,
        category: 'Happy Hour Food - Non-Vegetarian'
      },
      {
        id: 'hh-nonveg-11',
        name: 'Crispy Lamb',
        description: 'Happy hour special pricing',
        price: 249,
        category: 'Happy Hour Food - Non-Vegetarian'
      },
      {
        id: 'hh-nonveg-12',
        name: 'Chilli Fish',
        description: 'Happy hour special pricing',
        price: 229,
        category: 'Happy Hour Food - Non-Vegetarian'
      },
      {
        id: 'hh-nonveg-13',
        name: 'Loose Prawns',
        description: 'Happy hour special pricing',
        price: 259,
        category: 'Happy Hour Food - Non-Vegetarian'
      }
    ]
  }
};
