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

export const menuData: { [key: string]: MenuData } = {
  food: {
    categories: ['All', 'Soups', 'Fresh Salads', 'Sizzling Starters - Vegetarian', 'Sizzling Starters - Non-Vegetarian', 'Main Course - Vegetarian', 'Main Course - Non-Vegetarian', 'Asian & Chinese - Veg Starters', 'Asian & Chinese - Non-Veg Starters', 'Rice and Noodles - Vegetarian', 'Rice and Noodles - Non-Vegetarian', 'Pizza - Vegetarian', 'Pizza - Non-Vegetarian', 'Pasta - Vegetarian', 'Pasta - Non-Vegetarian', 'Rice Specials - Vegetarian', 'Rice Specials - Non-Vegetarian', 'Indian Breads', 'Desserts'],
    items: [
      // Soups
      {
        id: 'soup-1',
        name: 'Spinach & Broccoli Soup',
        description: 'Hearty, rich, and satisfying dish perfect as a standalone meal',
        price: 349,
        category: 'Soups'
      },
      {
        id: 'soup-2',
        name: 'Mushroom & Barley Soup',
        description: 'Hearty, rich, and satisfying dish perfect as a standalone meal',
        price: 349,
        category: 'Soups'
      },
      {
        id: 'soup-3',
        name: 'Herb Roasted Chicken Soup',
        description: 'Hearty, rich, and satisfying dish perfect as a standalone meal',
        price: 349,
        category: 'Soups'
      },
      {
        id: 'soup-4',
        name: 'Mutton Paya Soup',
        description: 'Hearty, rich, and satisfying dish perfect as a standalone meal',
        price: 469,
        category: 'Soups'
      },
      {
        id: 'soup-5',
        name: 'Thai Prawns Coconut Soup',
        description: 'Hearty, rich, and satisfying dish perfect as a standalone meal',
        price: 449,
        category: 'Soups'
      },

      // Fresh Salads
      {
        id: 'salad-1',
        name: 'Honey Glazed Vegetable Salad',
        description: 'Light, bold flavors from fresh produce and grilled meats',
        price: 389,
        category: 'Fresh Salads'
      },
      {
        id: 'salad-2',
        name: 'Feta & Fruit Salad',
        description: 'Light, bold flavors from fresh produce and grilled meats',
        price: 389,
        category: 'Fresh Salads'
      },
      {
        id: 'salad-3',
        name: 'Caesar Salad Veg',
        description: 'Light, bold flavors from fresh produce and grilled meats',
        price: 389,
        category: 'Fresh Salads'
      },
      {
        id: 'salad-4',
        name: 'Greek Chicken Salad',
        description: 'Light, bold flavors from fresh produce and grilled meats',
        price: 449,
        category: 'Fresh Salads'
      },
      {
        id: 'salad-5',
        name: 'Chicken Caesar Salad',
        description: 'Light, bold flavors from fresh produce and grilled meats',
        price: 449,
        category: 'Fresh Salads'
      },
      {
        id: 'salad-6',
        name: 'Peri Peri Grilled Chicken Salad',
        description: 'Light, bold flavors from fresh produce and grilled meats',
        price: 449,
        category: 'Fresh Salads'
      },

      // Sizzling Starters - Vegetarian
      {
        id: 'veg-starter-1',
        name: 'Pommies Fries',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 349,
        category: 'Sizzling Starters - Vegetarian'
      },
      {
        id: 'veg-starter-2',
        name: 'Tomato Olive Bruschetta',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 399,
        category: 'Sizzling Starters - Vegetarian'
      },
      {
        id: 'veg-starter-3',
        name: 'Paneer Tikka',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 429,
        category: 'Sizzling Starters - Vegetarian'
      },
      {
        id: 'veg-starter-4',
        name: 'Dahi Ke Kebab',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 399,
        category: 'Sizzling Starters - Vegetarian'
      },
      {
        id: 'veg-starter-5',
        name: 'Cheese-Creamed Broccoli',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 399,
        category: 'Sizzling Starters - Vegetarian'
      },
      {
        id: 'veg-starter-6',
        name: 'Garlic Butter Mushrooms',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 399,
        category: 'Sizzling Starters - Vegetarian'
      },
      {
        id: 'veg-starter-7',
        name: 'Peri Peri Paneer Skewers',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 429,
        category: 'Sizzling Starters - Vegetarian'
      },
      {
        id: 'veg-starter-8',
        name: 'Loaded Veg Nachos',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 399,
        category: 'Sizzling Starters - Vegetarian'
      },
      {
        id: 'veg-starter-9',
        name: 'Veg Cheese Croquettes',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 399,
        category: 'Sizzling Starters - Vegetarian'
      },

      // Sizzling Starters - Non-Vegetarian
      {
        id: 'nonveg-starter-1',
        name: 'BBQ Chicken Wings',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 489,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-2',
        name: 'Loaded Chicken Nachos',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 449,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-3',
        name: 'Herb-Crusted Chicken Breast',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 489,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-4',
        name: 'Peri Peri Chicken Kebab',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 489,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-5',
        name: 'Grilled Chicken Tikka',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 489,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-6',
        name: 'Hariyali Chicken Tikka',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 489,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-7',
        name: 'Crispy Fried Chicken Strips',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 489,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-8',
        name: 'Chicken Ghee Roast',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 489,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-9',
        name: 'Chicken 65',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 489,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-10',
        name: 'Murgh Malai Kebab',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 489,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-11',
        name: 'Mutton Boti Kebab',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 599,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-12',
        name: 'Mutton Ghee Roast',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 649,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-13',
        name: 'Nilgiri Lamb',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 599,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-14',
        name: 'Lamb Seekh Kebab',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 649,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-15',
        name: 'Indian Lamb Chops',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 599,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-16',
        name: 'Moroccan Fish Tikka',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 499,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-17',
        name: 'Mustard Fish Tikka',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 499,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-18',
        name: 'Appolo Fish',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 499,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-19',
        name: 'Fish & Chips',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 529,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-20',
        name: 'Charred Prawns',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 599,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-21',
        name: 'Tandoori Prawns',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 599,
        category: 'Sizzling Starters - Non-Vegetarian'
      },
      {
        id: 'nonveg-starter-22',
        name: 'Creamy Butter Garlic Prawns',
        description: 'A mouthwatering selection of grilled, fried, perfect to kick off your feast',
        price: 589,
        category: 'Sizzling Starters - Non-Vegetarian'
      },

      // Main Course - Vegetarian
      {
        id: 'main-veg-1',
        name: 'Vegetable Karahi',
        description: 'Spiced mixed vegetables served with Indian bread and steam rice.',
        price: 469,
        category: 'Main Course - Vegetarian'
      },
      {
        id: 'main-veg-2',
        name: 'Dal Makhani',
        description: 'Creamy black lentils, slow cooked with butter and spices, served with your choice of Indian bread or steam rice.',
        price: 489,
        category: 'Main Course - Vegetarian'
      },
      {
        id: 'main-veg-3',
        name: 'Dal Tadka',
        description: 'Slow cooked toor dal in Indian style tadka with jeera rice.',
        price: 499,
        category: 'Main Course - Vegetarian'
      },
      {
        id: 'main-veg-4',
        name: 'Mushroom and Green Peas Curry',
        description: 'Mushroom and green peas toasted in Indian spice and herbs and creamy, with roti.',
        price: 499,
        category: 'Main Course - Vegetarian'
      },
      {
        id: 'main-veg-5',
        name: 'Paneer Butter Masala',
        description: 'Grilled paneer in creamy makhani sauce, with Indian bread.',
        price: 449,
        category: 'Main Course - Vegetarian'
      },

      // Main Course - Non-Vegetarian
      {
        id: 'main-nonveg-1',
        name: 'Chicken Karahi',
        description: 'Grilled chicken in spiced karahi sauce, with Indian bread.',
        price: 549,
        category: 'Main Course - Non-Vegetarian'
      },
      {
        id: 'main-nonveg-2',
        name: 'Methi Chicken Curry',
        description: 'Methi flavours and Indian spiced chicken gravy with garlic naan.',
        price: 499,
        category: 'Main Course - Non-Vegetarian'
      },
      {
        id: 'main-nonveg-3',
        name: 'Pesto Chicken',
        description: 'Grilled chicken marinated in pesto with roti.',
        price: 549,
        category: 'Main Course - Non-Vegetarian'
      },
      {
        id: 'main-nonveg-4',
        name: 'Madras Curry Chicken',
        description: 'A spicy, flavourful South Indian curry with steam rice.',
        price: 599,
        category: 'Main Course - Non-Vegetarian'
      },
      {
        id: 'main-nonveg-5',
        name: 'Creamy Butter Chicken',
        description: 'Grilled chicken in creamy makhani sauce, served with butter naan.',
        price: 599,
        category: 'Main Course - Non-Vegetarian'
      },
      {
        id: 'main-nonveg-6',
        name: 'Thai Curry Chicken (Yellow/Green/Red)',
        description: 'A rich and creamy Thai curry with tender chicken, coconut milk, and aromatic spices served with fragrant jasmine rice.',
        price: 649,
        category: 'Main Course - Non-Vegetarian'
      },
      {
        id: 'main-nonveg-7',
        name: 'Thyme Grilled Chicken with Hunter Sauce',
        description: 'Breast chicken marinated in thyme, garlic and herbs with grilled vegetable and mash potato.',
        price: 619,
        category: 'Main Course - Non-Vegetarian'
      },
      {
        id: 'main-nonveg-8',
        name: 'Lahori Mutton',
        description: 'Mutton with bone marinated in aromatic spice and rich flavor with butter naan.',
        price: 629,
        category: 'Main Course - Non-Vegetarian'
      },
      {
        id: 'main-nonveg-9',
        name: 'Lamb Shepherd\'s Pie',
        description: 'Minced lamb with peas and mashed potatoes.',
        price: 599,
        category: 'Main Course - Non-Vegetarian'
      },
      {
        id: 'main-nonveg-10',
        name: 'Cajun Grilled Fish with Lemon Butter Sauce',
        description: 'Basa fish marinated in Cajun spice, with grilled vegetable and mash potato.',
        price: 649,
        category: 'Main Course - Non-Vegetarian'
      },
      {
        id: 'main-nonveg-11',
        name: 'Malabar Prawns Curry',
        description: 'Creamy and coconut flavor in Madras curry spice with Malabar paratha.',
        price: 649,
        category: 'Main Course - Non-Vegetarian'
      },

      // Asian & Chinese - Veg Starters
      {
        id: 'asian-veg-1',
        name: 'Chilli Paneer',
        description: 'Asian & Chinese vegetarian starter',
        price: 449,
        category: 'Asian & Chinese - Veg Starters'
      },
      {
        id: 'asian-veg-2',
        name: 'Funghi Cigar Roll',
        description: 'Asian & Chinese vegetarian starter',
        price: 449,
        category: 'Asian & Chinese - Veg Starters'
      },
      {
        id: 'asian-veg-3',
        name: 'Burmese Parcel',
        description: 'Asian & Chinese vegetarian starter',
        price: 449,
        category: 'Asian & Chinese - Veg Starters'
      },
      {
        id: 'asian-veg-4',
        name: 'Chilli Mushroom',
        description: 'Asian & Chinese vegetarian starter',
        price: 399,
        category: 'Asian & Chinese - Veg Starters'
      },
      {
        id: 'asian-veg-5',
        name: 'Schezwan Paneer',
        description: 'Asian & Chinese vegetarian starter',
        price: 449,
        category: 'Asian & Chinese - Veg Starters'
      },

      // Asian & Chinese - Non-Veg Starters
      {
        id: 'asian-nonveg-1',
        name: 'Honey Chilli Chicken',
        description: 'Asian & Chinese non-vegetarian starter',
        price: 489,
        category: 'Asian & Chinese - Non-Veg Starters'
      },
      {
        id: 'asian-nonveg-2',
        name: 'Coriander Chicken',
        description: 'Asian & Chinese non-vegetarian starter',
        price: 489,
        category: 'Asian & Chinese - Non-Veg Starters'
      },
      {
        id: 'asian-nonveg-3',
        name: 'Diced Schezwan Chicken',
        description: 'Asian & Chinese non-vegetarian starter',
        price: 489,
        category: 'Asian & Chinese - Non-Veg Starters'
      },
      {
        id: 'asian-nonveg-4',
        name: 'Crispy Lamb',
        description: 'Asian & Chinese non-vegetarian starter',
        price: 499,
        category: 'Asian & Chinese - Non-Veg Starters'
      },
      {
        id: 'asian-nonveg-5',
        name: 'Hot Garlic Chilli Fish',
        description: 'Asian & Chinese non-vegetarian starter',
        price: 499,
        category: 'Asian & Chinese - Non-Veg Starters'
      },
      {
        id: 'asian-nonveg-6',
        name: 'Crispy Fried Pepper Prawns',
        description: 'Asian & Chinese non-vegetarian starter',
        price: 569,
        category: 'Asian & Chinese - Non-Veg Starters'
      },
      {
        id: 'asian-nonveg-7',
        name: 'Chilli Basil Prawns',
        description: 'Asian & Chinese non-vegetarian starter',
        price: 569,
        category: 'Asian & Chinese - Non-Veg Starters'
      },

      // Rice and Noodles - Vegetarian
      {
        id: 'rice-noodles-veg-1',
        name: 'Chilli Basil Fried Rice Veg',
        description: 'Main course rice and noodles - vegetarian',
        price: 499,
        category: 'Rice and Noodles - Vegetarian'
      },
      {
        id: 'rice-noodles-veg-2',
        name: 'Classic Veg Fried Rice with Hot Garlic Sauce',
        description: 'Main course rice and noodles - vegetarian',
        price: 489,
        category: 'Rice and Noodles - Vegetarian'
      },
      {
        id: 'rice-noodles-veg-3',
        name: 'Chilli Garlic Noodles',
        description: 'Main course rice and noodles - vegetarian',
        price: 499,
        category: 'Rice and Noodles - Vegetarian'
      },

      // Rice and Noodles - Non-Vegetarian
      {
        id: 'rice-noodles-nonveg-1',
        name: 'Chilli Basil Fried Rice Chicken',
        description: 'Main course rice and noodles - non-vegetarian',
        price: 549,
        category: 'Rice and Noodles - Non-Vegetarian'
      },
      {
        id: 'rice-noodles-nonveg-2',
        name: 'Classic Chicken Fried Rice with Hot Garlic Sauce',
        description: 'Main course rice and noodles - non-vegetarian',
        price: 529,
        category: 'Rice and Noodles - Non-Vegetarian'
      },
      {
        id: 'rice-noodles-nonveg-3',
        name: 'Spicy Schezwan Chicken Noodles',
        description: 'Main course rice and noodles - non-vegetarian',
        price: 549,
        category: 'Rice and Noodles - Non-Vegetarian'
      },

      // Pizza - Vegetarian
      {
        id: 'pizza-veg-1',
        name: 'Veg Garden Pizza',
        description: 'Vegetarian pizza',
        price: 519,
        category: 'Pizza - Vegetarian'
      },
      {
        id: 'pizza-veg-2',
        name: 'Quattro Formaggi Pizza',
        description: 'Vegetarian pizza',
        price: 519,
        category: 'Pizza - Vegetarian'
      },
      {
        id: 'pizza-veg-3',
        name: 'Cottage Cheese Tikka Pizza',
        description: 'Vegetarian pizza',
        price: 529,
        category: 'Pizza - Vegetarian'
      },
      {
        id: 'pizza-veg-4',
        name: 'Classic Margherita Pizza',
        description: 'Vegetarian pizza',
        price: 499,
        category: 'Pizza - Vegetarian'
      },
      {
        id: 'pizza-veg-5',
        name: 'Mexican Veg Pizza',
        description: 'Vegetarian pizza',
        price: 519,
        category: 'Pizza - Vegetarian'
      },

      // Pizza - Non-Vegetarian
      {
        id: 'pizza-nonveg-1',
        name: 'Peri Peri Chicken Pizza',
        description: 'Non-vegetarian pizza',
        price: 549,
        category: 'Pizza - Non-Vegetarian'
      },
      {
        id: 'pizza-nonveg-2',
        name: 'BBQ Chicken Pizza',
        description: 'Non-vegetarian pizza',
        price: 549,
        category: 'Pizza - Non-Vegetarian'
      },
      {
        id: 'pizza-nonveg-3',
        name: 'Chicken Tikka Pizza',
        description: 'Non-vegetarian pizza',
        price: 589,
        category: 'Pizza - Non-Vegetarian'
      },
      {
        id: 'pizza-nonveg-4',
        name: 'Mutton Keema Pizza',
        description: 'Non-vegetarian pizza',
        price: 589,
        category: 'Pizza - Non-Vegetarian'
      },
      {
        id: 'pizza-nonveg-5',
        name: 'Lamb Pepperoni Pizza',
        description: 'Non-vegetarian pizza',
        price: 589,
        category: 'Pizza - Non-Vegetarian'
      },

      // Pasta - Vegetarian
      {
        id: 'pasta-veg-1',
        name: 'Penne Arrabbiata Veg',
        description: 'Vegetarian pasta',
        price: 489,
        category: 'Pasta - Vegetarian'
      },
      {
        id: 'pasta-veg-2',
        name: 'Penne Veg Alfredo Sauce',
        description: 'Vegetarian pasta',
        price: 489,
        category: 'Pasta - Vegetarian'
      },
      {
        id: 'pasta-veg-3',
        name: 'Spaghetti Aglio Olio Pasta Veg',
        description: 'Vegetarian pasta',
        price: 489,
        category: 'Pasta - Vegetarian'
      },
      {
        id: 'pasta-veg-4',
        name: 'Pesto Pasta Veg',
        description: 'Vegetarian pasta',
        price: 489,
        category: 'Pasta - Vegetarian'
      },
      {
        id: 'pasta-veg-5',
        name: 'Veg Lasagna',
        description: 'Vegetarian pasta',
        price: 489,
        category: 'Pasta - Vegetarian'
      },
      {
        id: 'pasta-veg-6',
        name: 'Creamy Mac N Cheese Pasta Veg',
        description: 'Vegetarian pasta',
        price: 489,
        category: 'Pasta - Vegetarian'
      },

      // Pasta - Non-Vegetarian
      {
        id: 'pasta-nonveg-1',
        name: 'Penne Arrabbiata Chicken',
        description: 'Non-vegetarian pasta',
        price: 529,
        category: 'Pasta - Non-Vegetarian'
      },
      {
        id: 'pasta-nonveg-2',
        name: 'Penne Chicken Alfredo Sauce',
        description: 'Non-vegetarian pasta',
        price: 529,
        category: 'Pasta - Non-Vegetarian'
      },
      {
        id: 'pasta-nonveg-3',
        name: 'Spaghetti Aglio Olio Pasta Chicken',
        description: 'Non-vegetarian pasta',
        price: 529,
        category: 'Pasta - Non-Vegetarian'
      },
      {
        id: 'pasta-nonveg-4',
        name: 'Pesto Pasta Chicken',
        description: 'Non-vegetarian pasta',
        price: 529,
        category: 'Pasta - Non-Vegetarian'
      },
      {
        id: 'pasta-nonveg-5',
        name: 'Chicken Lasagna',
        description: 'Non-vegetarian pasta',
        price: 529,
        category: 'Pasta - Non-Vegetarian'
      },
      {
        id: 'pasta-nonveg-6',
        name: 'Creamy Mac N Cheese Pasta Chicken',
        description: 'Non-vegetarian pasta',
        price: 529,
        category: 'Pasta - Non-Vegetarian'
      },
      {
        id: 'pasta-nonveg-7',
        name: 'Lamb Lasagna',
        description: 'Non-vegetarian pasta',
        price: 589,
        category: 'Pasta - Non-Vegetarian'
      },
      {
        id: 'pasta-nonveg-8',
        name: 'Spaghetti & Meatballs',
        description: 'Non-vegetarian pasta',
        price: 589,
        category: 'Pasta - Non-Vegetarian'
      },

      // Rice Specials - Vegetarian
      {
        id: 'rice-special-veg-1',
        name: 'Vegetable Pulao',
        description: 'Rice special - vegetarian',
        price: 499,
        category: 'Rice Specials - Vegetarian'
      },
      {
        id: 'rice-special-veg-2',
        name: 'Vegetable Risotto',
        description: 'Rice special - vegetarian',
        price: 499,
        category: 'Rice Specials - Vegetarian'
      },
      {
        id: 'rice-special-veg-3',
        name: 'Paneer 65 Pulao',
        description: 'Rice special - vegetarian',
        price: 499,
        category: 'Rice Specials - Vegetarian'
      },
      {
        id: 'rice-special-veg-4',
        name: 'Jeera Rice',
        description: 'Rice special - vegetarian',
        price: 249,
        category: 'Rice Specials - Vegetarian'
      },
      {
        id: 'rice-special-veg-5',
        name: 'Steam Rice',
        description: 'Rice special - vegetarian',
        price: 249,
        category: 'Rice Specials - Vegetarian'
      },

      // Rice Specials - Non-Vegetarian
      {
        id: 'rice-special-nonveg-1',
        name: 'Chicken Stroganoff',
        description: 'Rice special - non-vegetarian',
        price: 529,
        category: 'Rice Specials - Non-Vegetarian'
      },
      {
        id: 'rice-special-nonveg-2',
        name: 'Chicken Pulao',
        description: 'Rice special - non-vegetarian',
        price: 549,
        category: 'Rice Specials - Non-Vegetarian'
      },
      {
        id: 'rice-special-nonveg-3',
        name: 'Chicken Biryani',
        description: 'Rice special - non-vegetarian',
        price: 549,
        category: 'Rice Specials - Non-Vegetarian'
      },
      {
        id: 'rice-special-nonveg-4',
        name: 'Mutton Pulao',
        description: 'Rice special - non-vegetarian',
        price: 599,
        category: 'Rice Specials - Non-Vegetarian'
      },
      {
        id: 'rice-special-nonveg-5',
        name: 'Spiced Prawn Rice',
        description: 'Rice special - non-vegetarian',
        price: 589,
        category: 'Rice Specials - Non-Vegetarian'
      },

      // Indian Breads
      {
        id: 'bread-1',
        name: 'Plain Roti / Plain Naan',
        description: 'Indian bread',
        price: 89,
        category: 'Indian Breads'
      },
      {
        id: 'bread-2',
        name: 'Butter Roti / Butter Naan',
        description: 'Indian bread',
        price: 99,
        category: 'Indian Breads'
      },
      {
        id: 'bread-3',
        name: 'Garlic Naan',
        description: 'Indian bread',
        price: 109,
        category: 'Indian Breads'
      },
      {
        id: 'bread-4',
        name: 'Lachha Paratha',
        description: 'Indian bread',
        price: 119,
        category: 'Indian Breads'
      },

      // Desserts
      {
        id: 'dessert-1',
        name: 'Vanilla Panna Cotta',
        description: 'Creamy and smooth vanilla flavors with fresh crushed strawberry topping.',
        price: 449,
        category: 'Desserts'
      },
      {
        id: 'dessert-2',
        name: 'Layers Topping Shahi Tukda',
        description: 'Layers of crisp bread and saffron syrup, creamy rabri and topped with a touch of nuts.',
        price: 449,
        category: 'Desserts'
      },
      {
        id: 'dessert-3',
        name: 'Chocolate of Heaven',
        description: 'Rich dark chocolate layered with creamy coconut, a perfect blend of indulgence and tropical sweetness.',
        price: 469,
        category: 'Desserts'
      },
      {
        id: 'dessert-4',
        name: 'Cheese Cake',
        description: 'Simple cheese cake topped with strawberry crush.',
        price: 469,
        category: 'Desserts'
      },
      {
        id: 'dessert-5',
        name: 'Chocolate Brownie',
        description: 'Chocolate baked dessert with vanilla ice cream scoop.',
        price: 449,
        category: 'Desserts'
      }
    ]
  },

  beverages: {
    categories: ['All', 'Whiskey - Blended', 'Whiskey - Single Malts', 'Whiskey - Rye/American/Canadian/Irish', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Cognac/Brandy', 'Liqueurs', 'Aperitif', 'Ales/Brews/Crafts', 'Premium Ales & Brews', 'Champagne/Sparkling Wine', 'Wines', 'Cocktails', 'Shots', 'Mocktails', 'Soft Beverages', 'Aerated Beverages'],
    items: [
      // Whiskey - Blended
      {
        id: 'whiskey-blended-1',
        name: 'Royal Salute',
        description: 'Blended Whiskey (30ML)',
        price: 1949,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-2',
        name: 'Hibiki',
        description: 'Blended Whiskey (30ML)',
        price: 1649,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-3',
        name: 'Chivas Regal 18 YO',
        description: 'Blended Whiskey (30ML)',
        price: 949,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-4',
        name: 'Toki',
        description: 'Blended Whiskey (30ML)',
        price: 589,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-5',
        name: 'Chivas Regal 12 YO',
        description: 'Blended Whiskey (30ML)',
        price: 549,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-6',
        name: 'JW Black Label',
        description: 'Blended Whiskey (30ML)',
        price: 529,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-7',
        name: 'JW Blonde',
        description: 'Blended Whiskey (30ML)',
        price: 489,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-8',
        name: 'Ballentine\'s Finest',
        description: 'Blended Whiskey (30ML)',
        price: 389,
        category: 'Whiskey - Blended'
      },
      {
        id: 'whiskey-blended-9',
        name: 'JW Red Label',
        description: 'Blended Whiskey (30ML)',
        price: 369,
        category: 'Whiskey - Blended'
      },

      // Whiskey - Single Malts
      {
        id: 'whiskey-single-1',
        name: 'Dalmore 15 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 1849,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-2',
        name: 'The Singleton 15 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 1249,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-3',
        name: 'Jura 12 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 969,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-4',
        name: 'Glenfiddich 15 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 969,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-5',
        name: 'The Singleton 12 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 849,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-6',
        name: 'Glenfiddich 12 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 749,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-7',
        name: 'Talisker 10 YO',
        description: 'Single Malts Whiskey (30ML)',
        price: 729,
        category: 'Whiskey - Single Malts'
      },
      {
        id: 'whiskey-single-8',
        name: 'Godawan 01 / 02',
        description: 'Single Malts Whiskey (30ML)',
        price: 649,
        category: 'Whiskey - Single Malts'
      },

      // Whiskey - Rye/American/Canadian/Irish
      {
        id: 'whiskey-rye-1',
        name: 'Templeton Rye 6 YO',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 1249,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },
      {
        id: 'whiskey-rye-2',
        name: 'Gentleman Jack',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 749,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },
      {
        id: 'whiskey-rye-3',
        name: 'Jack Daniel\'s',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 529,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },
      {
        id: 'whiskey-rye-4',
        name: 'Bushmills Original',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 489,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },
      {
        id: 'whiskey-rye-5',
        name: 'Black Velvet',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 469,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },
      {
        id: 'whiskey-rye-6',
        name: 'Jameson',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 449,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },
      {
        id: 'whiskey-rye-7',
        name: 'Jim Beam',
        description: 'Rye / American / Canadian / Irish Whiskey (30ML)',
        price: 429,
        category: 'Whiskey - Rye/American/Canadian/Irish'
      },

      // Vodka
      {
        id: 'vodka-1',
        name: 'Crystal Head',
        description: 'Vodka (30ML)',
        price: 1349,
        category: 'Vodka'
      },
      {
        id: 'vodka-2',
        name: 'Roberto Cavalli',
        description: 'Vodka (30ML)',
        price: 1249,
        category: 'Vodka'
      },
      {
        id: 'vodka-3',
        name: 'Uluvka',
        description: 'Vodka (30ML)',
        price: 949,
        category: 'Vodka'
      },
      {
        id: 'vodka-4',
        name: 'Beluga',
        description: 'Vodka (30ML)',
        price: 849,
        category: 'Vodka'
      },
      {
        id: 'vodka-5',
        name: 'Belvedere',
        description: 'Vodka (30ML)',
        price: 749,
        category: 'Vodka'
      },
      {
        id: 'vodka-6',
        name: 'Grey Goose',
        description: 'Vodka (30ML)',
        price: 649,
        category: 'Vodka'
      },
      {
        id: 'vodka-7',
        name: 'Absolut',
        description: 'Vodka (30ML)',
        price: 449,
        category: 'Vodka'
      },
      {
        id: 'vodka-8',
        name: 'Ketel One',
        description: 'Vodka (30ML)',
        price: 389,
        category: 'Vodka'
      },

      // Gin
      {
        id: 'gin-1',
        name: 'Roku',
        description: 'Gin (30ML)',
        price: 849,
        category: 'Gin'
      },
      {
        id: 'gin-2',
        name: 'Tanqueray No. 10',
        description: 'Gin (30ML)',
        price: 649,
        category: 'Gin'
      },
      {
        id: 'gin-3',
        name: 'Bombay Sapphire',
        description: 'Gin (30ML)',
        price: 489,
        category: 'Gin'
      },
      {
        id: 'gin-4',
        name: 'Beefeater',
        description: 'Gin (30ML)',
        price: 449,
        category: 'Gin'
      },
      {
        id: 'gin-5',
        name: 'Gordons',
        description: 'Gin (30ML)',
        price: 389,
        category: 'Gin'
      },

      // Rum
      {
        id: 'rum-1',
        name: 'Viva El Ron De Cuba',
        description: 'Rum (30ML)',
        price: 449,
        category: 'Rum'
      },
      {
        id: 'rum-2',
        name: 'Captain Morgan Dark',
        description: 'Rum (30ML)',
        price: 349,
        category: 'Rum'
      },
      {
        id: 'rum-3',
        name: 'Bacardi Carta Blanca',
        description: 'Rum (30ML)',
        price: 349,
        category: 'Rum'
      },

      // Tequila
      {
        id: 'tequila-1',
        name: 'Don Julio Reposado',
        description: 'Tequila (30ML)',
        price: 1349,
        category: 'Tequila'
      },
      {
        id: 'tequila-2',
        name: 'Patron Reposado',
        description: 'Tequila (30ML)',
        price: 1249,
        category: 'Tequila'
      },
      {
        id: 'tequila-3',
        name: 'Patron Silver',
        description: 'Tequila (30ML)',
        price: 1149,
        category: 'Tequila'
      },
      {
        id: 'tequila-4',
        name: 'Jose Cuervo Gold',
        description: 'Tequila (30ML)',
        price: 489,
        category: 'Tequila'
      },
      {
        id: 'tequila-5',
        name: 'Jose Cuervo Silver',
        description: 'Tequila (30ML)',
        price: 469,
        category: 'Tequila'
      },

      // Cognac/Brandy
      {
        id: 'cognac-1',
        name: 'Hennessy V.S',
        description: 'Cognac / Brandy (30ML)',
        price: 1349,
        category: 'Cognac/Brandy'
      },
      {
        id: 'cognac-2',
        name: 'Victor Fauconnier',
        description: 'Cognac / Brandy (30ML)',
        price: 449,
        category: 'Cognac/Brandy'
      },
      {
        id: 'cognac-3',
        name: 'Vecchia Romagna',
        description: 'Cognac / Brandy (30ML)',
        price: 439,
        category: 'Cognac/Brandy'
      },
      {
        id: 'cognac-4',
        name: 'St-Remy VSOP',
        description: 'Cognac / Brandy (30ML)',
        price: 409,
        category: 'Cognac/Brandy'
      },
      {
        id: 'cognac-5',
        name: 'Kyron',
        description: 'Cognac / Brandy (30ML)',
        price: 349,
        category: 'Cognac/Brandy'
      },

      // Aperitif
      {
        id: 'aperitif-1',
        name: 'Campari',
        description: 'Aperitif (30ML)',
        price: 389,
        category: 'Aperitif'
      },
      {
        id: 'aperitif-2',
        name: 'Aperol',
        description: 'Aperitif (30ML)',
        price: 369,
        category: 'Aperitif'
      },
      {
        id: 'aperitif-3',
        name: 'Martini Dry / Bianco',
        description: 'Aperitif (30ML)',
        price: 389,
        category: 'Aperitif'
      },

      // Ales/Brews/Crafts
      {
        id: 'ales-1',
        name: 'Bira Belgium Style Wheat Ale (4.7%)',
        description: '330ML / 1500ML / 3000ML',
        price: 449,
        category: 'Ales/Brews/Crafts'
      },
      {
        id: 'ales-2',
        name: 'Geist Dunkelweizen (5.4%)',
        description: '330ML / 1500ML / 3000ML',
        price: 429,
        category: 'Ales/Brews/Crafts'
      },
      {
        id: 'ales-3',
        name: 'Beer Sampler - 6 x 100ML',
        description: 'Choose 6 beers from above',
        price: 649,
        category: 'Ales/Brews/Crafts'
      },

      // Premium Ales & Brews
      {
        id: 'premium-ales-1',
        name: 'Coopers Pale Ale (4.5%)',
        description: '375ML bottle',
        price: 989,
        category: 'Premium Ales & Brews'
      },
      {
        id: 'premium-ales-2',
        name: 'Corona Extra Lager (5%)',
        description: '330ML bottle',
        price: 669,
        category: 'Premium Ales & Brews'
      },

      // Cocktails
      {
        id: 'cocktail-1',
        name: 'Mimosa Margarita',
        description: 'Sparkling Wine Based (Glass)',
        price: 1896,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-2',
        name: 'Whiskey Sour',
        description: 'Modern Classics (Glass)',
        price: 689,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-3',
        name: 'Mojito Classic',
        description: 'Modern Classics (Glass)',
        price: 529,
        category: 'Cocktails'
      },

      // Mocktails
      {
        id: 'mocktail-1',
        name: 'Spice Cooler',
        description: 'Mocktails (Glass)',
        price: 429,
        category: 'Mocktails'
      },
      {
        id: 'mocktail-2',
        name: 'Nutty Dream',
        description: 'Mocktails (Glass)',
        price: 389,
        category: 'Mocktails'
      },
      {
        id: 'mocktail-3',
        name: 'Mojito',
        description: 'Mocktails (Glass)',
        price: 329,
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

