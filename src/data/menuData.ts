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
    categories: ['All', 'Starters', 'Burger', 'Pizza', 'Indian', 'Chinese', 'Extras'],
    items: [
      // Starters
      {
        id: 'starter-1',
        name: 'Crispy Chicken Wings',
        description: 'Spicy buffalo wings with ranch dip',
        price: 299,
        category: 'Starters'
      },
      {
        id: 'starter-2',
        name: 'Loaded Nachos',
        description: 'Tortilla chips with cheese, jalapeños, and sour cream',
        price: 249,
        category: 'Starters'
      },
      {
        id: 'starter-3',
        name: 'Mozzarella Sticks',
        description: 'Golden fried mozzarella with marinara sauce',
        price: 199,
        category: 'Starters'
      },
      {
        id: 'starter-4',
        name: 'Chicken Popcorn',
        description: 'Bite-sized crispy chicken pieces',
        price: 179,
        category: 'Starters'
      },

      // Burgers
      {
        id: 'burger-1',
        name: 'Classic Beef Burger',
        description: 'Juicy beef patty with lettuce, tomato, and special sauce',
        price: 399,
        category: 'Burger'
      },
      {
        id: 'burger-2',
        name: 'Chicken Deluxe',
        description: 'Grilled chicken breast with avocado and mayo',
        price: 349,
        category: 'Burger'
      },
      {
        id: 'burger-3',
        name: 'Veggie Supreme',
        description: 'Plant-based patty with fresh vegetables',
        price: 299,
        category: 'Burger'
      },
      {
        id: 'burger-4',
        name: 'Double Cheese Burger',
        description: 'Two beef patties with double cheese',
        price: 449,
        category: 'Burger'
      },

      // Pizza
      {
        id: 'pizza-1',
        name: 'Margherita Pizza',
        description: 'Classic tomato, mozzarella, and basil',
        price: 399,
        category: 'Pizza'
      },
      {
        id: 'pizza-2',
        name: 'Pepperoni Supreme',
        description: 'Pepperoni with extra cheese and herbs',
        price: 499,
        category: 'Pizza'
      },
      {
        id: 'pizza-3',
        name: 'BBQ Chicken Pizza',
        description: 'Grilled chicken with BBQ sauce and onions',
        price: 549,
        category: 'Pizza'
      },
      {
        id: 'pizza-4',
        name: 'Veggie Delight',
        description: 'Mixed vegetables with mozzarella cheese',
        price: 449,
        category: 'Pizza'
      },

      // Indian
      {
        id: 'indian-1',
        name: 'Butter Chicken',
        description: 'Tender chicken in creamy tomato sauce',
        price: 399,
        category: 'Indian'
      },
      {
        id: 'indian-2',
        name: 'Chicken Biryani',
        description: 'Fragrant basmati rice with spiced chicken',
        price: 349,
        category: 'Indian'
      },
      {
        id: 'indian-3',
        name: 'Dal Makhani',
        description: 'Creamy black lentils with butter',
        price: 249,
        category: 'Indian'
      },
      {
        id: 'indian-4',
        name: 'Chicken Tikka Masala',
        description: 'Grilled chicken in spiced tomato cream',
        price: 379,
        category: 'Indian'
      },

      // Chinese
      {
        id: 'chinese-1',
        name: 'Chicken Fried Rice',
        description: 'Wok-tossed rice with chicken and vegetables',
        price: 299,
        category: 'Chinese'
      },
      {
        id: 'chinese-2',
        name: 'Sweet and Sour Chicken',
        description: 'Crispy chicken with tangy sauce',
        price: 349,
        category: 'Chinese'
      },
      {
        id: 'chinese-3',
        name: 'Chicken Noodles',
        description: 'Stir-fried noodles with chicken and vegetables',
        price: 279,
        category: 'Chinese'
      },
      {
        id: 'chinese-4',
        name: 'Manchurian',
        description: 'Vegetable balls in spicy sauce',
        price: 229,
        category: 'Chinese'
      },

      // Extras
      {
        id: 'extra-1',
        name: 'French Fries',
        description: 'Golden crispy potato fries',
        price: 149,
        category: 'Extras'
      },
      {
        id: 'extra-2',
        name: 'Onion Rings',
        description: 'Crispy battered onion rings',
        price: 179,
        category: 'Extras'
      },
      {
        id: 'extra-3',
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter',
        price: 129,
        category: 'Extras'
      },
      {
        id: 'extra-4',
        name: 'Coleslaw',
        description: 'Fresh cabbage and carrot salad',
        price: 99,
        category: 'Extras'
      }
    ]
  },

  liquor: {
    categories: ['All', 'Drink & Munch at 69', 'Cocktails', 'Beer', 'Wine', 'Mocktails', 'Shots'],
    items: [
      // Drink & Munch at 69
      {
        id: 'drink-69-1',
        name: 'Beer + Chicken Wings',
        description: 'Any beer with 6 pieces of chicken wings',
        price: 399,
        category: 'Drink & Munch at 69'
      },
      {
        id: 'drink-69-2',
        name: 'Cocktail + Nachos',
        description: 'Any cocktail with loaded nachos',
        price: 499,
        category: 'Drink & Munch at 69'
      },
      {
        id: 'drink-69-3',
        name: 'Wine + Cheese Platter',
        description: 'House wine with assorted cheese',
        price: 699,
        category: 'Drink & Munch at 69'
      },
      {
        id: 'drink-69-4',
        name: 'Whiskey + Chicken Popcorn',
        description: 'Premium whiskey with chicken popcorn',
        price: 599,
        category: 'Drink & Munch at 69'
      },

      // Cocktails
      {
        id: 'cocktail-1',
        name: 'Mojito',
        description: 'White rum, mint, lime, and soda',
        price: 299,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-2',
        name: 'Margarita',
        description: 'Tequila, lime juice, and triple sec',
        price: 349,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-3',
        name: 'Old Fashioned',
        description: 'Whiskey, sugar, and bitters',
        price: 399,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-4',
        name: 'Cosmopolitan',
        description: 'Vodka, cranberry juice, and lime',
        price: 329,
        category: 'Cocktails'
      },
      {
        id: 'cocktail-5',
        name: 'Pina Colada',
        description: 'Rum, coconut cream, and pineapple',
        price: 279,
        category: 'Cocktails'
      },

      // Beer
      {
        id: 'beer-1',
        name: 'Kingfisher Premium',
        description: 'Indian lager beer',
        price: 199,
        category: 'Beer'
      },
      {
        id: 'beer-2',
        name: 'Tuborg Strong',
        description: 'Strong lager beer',
        price: 219,
        category: 'Beer'
      },
      {
        id: 'beer-3',
        name: 'Corona Extra',
        description: 'Mexican lager with lime',
        price: 299,
        category: 'Beer'
      },
      {
        id: 'beer-4',
        name: 'Heineken',
        description: 'Dutch premium lager',
        price: 279,
        category: 'Beer'
      },

      // Wine
      {
        id: 'wine-1',
        name: 'House Red Wine',
        description: 'Cabernet Sauvignon',
        price: 399,
        category: 'Wine'
      },
      {
        id: 'wine-2',
        name: 'House White Wine',
        description: 'Chardonnay',
        price: 399,
        category: 'Wine'
      },
      {
        id: 'wine-3',
        name: 'Rose Wine',
        description: 'French rose wine',
        price: 449,
        category: 'Wine'
      },
      {
        id: 'wine-4',
        name: 'Sparkling Wine',
        description: 'Prosecco',
        price: 599,
        category: 'Wine'
      },

      // Mocktails
      {
        id: 'mocktail-1',
        name: 'Virgin Mojito',
        description: 'Mint, lime, and soda without alcohol',
        price: 199,
        category: 'Mocktails'
      },
      {
        id: 'mocktail-2',
        name: 'Virgin Pina Colada',
        description: 'Coconut cream and pineapple',
        price: 179,
        category: 'Mocktails'
      },
      {
        id: 'mocktail-3',
        name: 'Fruit Punch',
        description: 'Mixed fruit juice with soda',
        price: 149,
        category: 'Mocktails'
      },
      {
        id: 'mocktail-4',
        name: 'Lemonade',
        description: 'Fresh lemon with mint and soda',
        price: 129,
        category: 'Mocktails'
      },

      // Shots
      {
        id: 'shot-1',
        name: 'Tequila Shot',
        description: 'Premium tequila with salt and lime',
        price: 199,
        category: 'Shots'
      },
      {
        id: 'shot-2',
        name: 'Vodka Shot',
        description: 'Premium vodka',
        price: 179,
        category: 'Shots'
      },
      {
        id: 'shot-3',
        name: 'Whiskey Shot',
        description: 'Premium whiskey',
        price: 219,
        category: 'Shots'
      },
      {
        id: 'shot-4',
        name: 'Rum Shot',
        description: 'Premium rum',
        price: 189,
        category: 'Shots'
      }
    ]
  }
};
