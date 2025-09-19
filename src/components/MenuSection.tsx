import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUtensils, FaWineGlassAlt, FaFilter, FaShoppingCart, FaTimes, FaPlus } from 'react-icons/fa';
import { menuData, MenuItem } from '@/data/menuData';

interface CartItem extends MenuItem {
  quantity: number;
}

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState('food');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const [isMenuImageModalOpen, setIsMenuImageModalOpen] = useState(false);
  const [selectedMenuImage, setSelectedMenuImage] = useState('');
  const [selectedMenuTitle, setSelectedMenuTitle] = useState('');

  // Add section IDs for navigation
  useEffect(() => {
    // Add section IDs to menu categories for navigation
    const addSectionIds = () => {
      const startersSection = document.querySelector('[data-category="Starters"]');
      const mainCourseSection = document.querySelector('[data-category="Burger"], [data-category="Pizza"], [data-category="Indian"], [data-category="Chinese"]');
      const drinksSection = document.querySelector('[data-category="Drink & Munch at 69"]');
      
      if (startersSection) startersSection.id = 'starters-section';
      if (mainCourseSection) mainCourseSection.id = 'main-course-section';
      if (drinksSection) drinksSection.id = 'drinks-section';
    };
    
    // Add IDs after component mounts
    setTimeout(addSectionIds, 100);
  }, []);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('alehouse_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('alehouse_cart', JSON.stringify(cart));
  }, [cart]);

  // Get current menu data based on active tab
  const currentMenuData = menuData[activeTab];

  // Filter items based on search term and category
  const filteredItems = currentMenuData.items.filter((item: MenuItem) => {
    const matchesSearch = searchTerm.trim() === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group items by category with custom sorting
  const groupedItems = filteredItems.reduce((groups: { [key: string]: MenuItem[] }, item: MenuItem) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  // Sort items within each category by price
  Object.keys(groupedItems).forEach(category => {
    groupedItems[category].sort((a: MenuItem, b: MenuItem) => a.price - b.price);
  });

  // Custom sorting for categories
  const sortedCategories = Object.keys(groupedItems).sort((a: string, b: string) => {
    if (activeTab === 'food') {
      // Food menu: Starters first, then Extras, then rest alphabetically
      if (a === 'Starters') return -1;
      if (b === 'Starters') return 1;
      if (a === 'Extras') return -1;
      if (b === 'Extras') return 1;
      return a.localeCompare(b);
    } else {
      // Liquor menu: Drink & Munch at 69 first, then rest alphabetically
      if (a === 'Drink & Munch at 69') return -1;
      if (b === 'Drink & Munch at 69') return 1;
      return a.localeCompare(b);
    }
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchTerm('');
    setSelectedCategory('All');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  const handleAddToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      // Item already in cart - increase quantity
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      // Add new item to cart
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCost = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowCart(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <motion.section
      id="menu"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{
        padding: '4rem 0 2rem 0',
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(184, 134, 11, 0.05) 50%, rgba(0, 0, 0, 0.95) 100%)',
        minHeight: 'auto',
        position: 'relative'
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            color: '#ffffff',
            fontFamily: 'Game of Thrones, serif',
            marginBottom: '1rem',
            fontWeight: '400'
          }}>
            Our Menu
          </h2>
          <h3 style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            color: '#999999',
            marginBottom: '1.5rem',
            fontWeight: '400'
          }}>
            Browse over 100+ irresistible dishes & handcrafted drinks
          </h3>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            color: '#999999',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            From sizzling starters and gourmet mains to signature cocktails and mocktails, discover why ALEHOUSE is the perfect destination for exceptional food, drinks, and unforgettable experiences.
          </p>
        </motion.div>

        {/* Menu Image Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(0.5rem, 2vw, 1.5rem)',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}
        >
          {/* Food Menu Button */}
          <motion.button
            onClick={() => {
              setSelectedMenuImage('/menu/Ale House Food Menu copy.pdf');
              setSelectedMenuTitle('Food Menu');
              setIsMenuImageModalOpen(true);
            }}
            style={{
              position: 'relative',
              width: 'clamp(180px, 28vw, 240px)',
              height: 'clamp(120px, 20vw, 160px)',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(15px)',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{
              scale: 1.05,
              border: '2px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transform: 'translateY(-5px)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background Gradient */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.2), rgba(0, 0, 0, 0.8))',
              transition: 'opacity 0.3s ease'
            }} />
            
            {/* Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.3), rgba(0, 0, 0, 0.6))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textAlign: 'center',
              padding: 'clamp(0.5rem, 2vw, 1rem)'
            }}>
              <span style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>🍽️</span>
              <h3 style={{
                fontFamily: 'Bebas Neue, Arial Black, sans-serif',
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                fontWeight: '400',
                margin: '0',
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}>
                View Food Menu
              </h3>
            </div>
          </motion.button>

          {/* Liquor Menu Button */}
          <motion.button
            onClick={() => {
              setSelectedMenuImage('/menu/Alehouse Beverage Menu.pdf');
              setSelectedMenuTitle('Beverages Menu');
              setIsMenuImageModalOpen(true);
            }}
            style={{
              position: 'relative',
              width: 'clamp(180px, 28vw, 240px)',
              height: 'clamp(120px, 20vw, 160px)',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(15px)',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{
              scale: 1.05,
              border: '2px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transform: 'translateY(-5px)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background Gradient */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.2), rgba(0, 0, 0, 0.8))',
              transition: 'opacity 0.3s ease'
            }} />
            
            {/* Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.3), rgba(0, 0, 0, 0.6))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textAlign: 'center',
              padding: 'clamp(0.5rem, 2vw, 1rem)'
            }}>
              <span style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>🍸</span>
              <h3 style={{
                fontFamily: 'Bebas Neue, Arial Black, sans-serif',
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                fontWeight: '400',
                margin: '0',
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}>
                View Beverages Menu
              </h3>
            </div>
          </motion.button>

          {/* Happy Hour Menu Button */}
          <motion.button
            onClick={() => {
              setSelectedMenuImage('/menu/Ale House Happy Hour Menu copy.pdf');
              setSelectedMenuTitle('Happy Hour Menu');
              setIsMenuImageModalOpen(true);
            }}
            style={{
              position: 'relative',
              width: 'clamp(180px, 28vw, 240px)',
              height: 'clamp(120px, 20vw, 160px)',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(15px)',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{
              scale: 1.05,
              border: '2px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transform: 'translateY(-5px)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background Gradient */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.2), rgba(0, 0, 0, 0.8))',
              transition: 'opacity 0.3s ease'
            }} />
            
            {/* Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.3), rgba(0, 0, 0, 0.6))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textAlign: 'center',
              padding: 'clamp(0.5rem, 2vw, 1rem)'
            }}>
              <span style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>🍷</span>
              <h3 style={{
                fontFamily: 'Bebas Neue, Arial Black, sans-serif',
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                fontWeight: '400',
                margin: '0',
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}>
                View Happy Hour Menu
              </h3>
            </div>
          </motion.button>
        </motion.div>

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{
            fontFamily: 'Manrope, Inter, Segoe UI, Arial, sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            Use these quick links to explore our menu and place your order. We&apos;ll take care of everything else. 🍽️🍹
          </p>
        </motion.div>

        {/* Full Menu & Order Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}
        >
          <motion.button
            onClick={() => {
              setActiveTab('food');
              openModal();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
              padding: 'clamp(1.8rem, 4.5vw, 2.2rem) clamp(3rem, 7vw, 4rem)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '25px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
              backdropFilter: 'blur(30px)',
              color: '#ffffff',
              fontSize: 'clamp(1.2rem, 3.5vw, 1.4rem)',
              fontWeight: '800',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              fontFamily: 'Bebas Neue, Arial Black, sans-serif'
            }}
            whileHover={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
              border: '3px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 16px 50px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2)',
              transform: 'translateY(-6px)'
            }}
            whileTap={{ scale: 0.94 }}
          >
            <span style={{ 
              fontSize: 'clamp(1.6rem, 4vw, 1.8rem)',
              filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4))'
            }}>🧾</span>
            Full Menu & Order
          </motion.button>
        </motion.div>

        {/* Menu Image Popup Modal */}
        <AnimatePresence>
          {isMenuImageModalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(15px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}
              onClick={() => setIsMenuImageModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                style={{
                  position: 'relative',
                  width: '95vw',
                  height: '95vh',
                  maxWidth: '1200px',
                  maxHeight: '900px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {selectedMenuImage ? (
                  <iframe
                    src={selectedMenuImage}
                    title={selectedMenuTitle}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      display: 'block'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(184, 134, 11, 0.1))',
                    color: 'white',
                    textAlign: 'center',
                    padding: '2rem'
                  }}>
                    <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🍸</div>
                    <h2 style={{
                      fontSize: '2rem',
                      marginBottom: '1rem',
                      fontFamily: 'Game of Thrones, serif'
                    }}>
                      {selectedMenuTitle}
                    </h2>
                    <p style={{
                      fontSize: '1.2rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginBottom: '1rem'
                    }}>
                      Coming Soon!
                    </p>
                    <p style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}>
                      We&apos;re preparing an amazing menu for you. Stay tuned!
                    </p>
                  </div>
                )}
                <button
                  onClick={() => setIsMenuImageModalOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.background = 'rgba(255, 255, 255, 0.3)';
                    target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.background = 'rgba(255, 255, 255, 0.2)';
                    target.style.transform = 'scale(1)';
                  }}
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Screen Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(15px)',
                zIndex: 1000,
                overflow: 'hidden'
              }}
            >
              {/* Modal Header */}
              <div style={{
                position: 'sticky',
                top: 0,
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(20px)',
                padding: '1rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1001
              }}>
                 {/* Cart Button */}
                 <motion.button
                   onClick={() => setShowCart(!showCart)}
                   style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '0.5rem',
                     padding: '0.5rem 1rem',
                     border: 'none',
                     borderRadius: '8px',
                     background: 'rgba(255, 255, 255, 0.1)',
                     color: '#ffffff',
                     cursor: 'pointer',
                     position: 'relative'
                   }}
                   whileHover={{ background: 'rgba(255, 255, 255, 0.2)' }}
                   whileTap={{ scale: 0.95 }}
                 >
                   <FaShoppingCart />
                   <span>Cart</span>
                   {getTotalItems() > 0 && (
                     <motion.div
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       style={{
                         position: 'absolute',
                         top: '-8px',
                         right: '-8px',
                         background: '#B8860B',
                         color: '#ffffff',
                         borderRadius: '50%',
                         width: '20px',
                         height: '20px',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         fontSize: '0.8rem',
                         fontWeight: 'bold'
                       }}
                     >
                       {getTotalItems()}
                     </motion.div>
                   )}
                 </motion.button>

                {/* Close Button */}
                <motion.button
                  onClick={closeModal}
                  style={{
                    padding: '0.5rem',
                    border: 'none',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  whileHover={{ background: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <FaTimes />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div style={{
                height: 'calc(100vh - 80px)',
                overflow: 'auto',
                padding: '1rem 2rem'
              }}>
                {/* Tab Navigation */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  gap: '1rem'
                }}>
                  {[
                    { id: 'food', label: 'Food Menu', icon: <FaUtensils /> },
                    { id: 'beverages', label: 'Beverages Menu', icon: <FaWineGlassAlt /> },
                    { id: 'happyhour', label: 'Happy Hour Menu', icon: <FaWineGlassAlt /> }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '8px',
                        background: activeTab === tab.id ? '#B8860B' : 'rgba(255, 255, 255, 0.1)',
                        color: activeTab === tab.id ? '#ffffff' : '#ffffff',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ background: activeTab === tab.id ? 'rgba(184, 134, 11, 0.8)' : 'rgba(255, 255, 255, 0.2)' }}
                    >
                      {tab.icon}
                      {tab.label}
                    </motion.button>
                  ))}
                </div>

                {/* Search and Filter Controls */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  marginBottom: '2rem',
                  maxWidth: '800px',
                  margin: '0 auto 2rem auto'
                }}>
                  {/* Search Bar */}
                  <div style={{ position: 'relative' }}>
                    <FaSearch style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#999999',
                      fontSize: '1rem'
                    }} />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab === 'food' ? 'food' : 'drinks'}...`}
                      value={searchTerm}
                      onChange={handleSearchChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Filter Controls */}
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaFilter style={{ color: '#999999', fontSize: '0.9rem' }} />
                      <span style={{ color: '#999999', fontSize: '0.9rem' }}>Filter by:</span>
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      style={{
                        padding: '0.5rem 1rem',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {currentMenuData.categories.map((category: string) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    {(searchTerm || selectedCategory !== 'All') && (
                      <motion.button
                        onClick={clearFilters}
                        style={{
                          padding: '0.5rem 1rem',
                          border: '1px solid #B8860B',
                          borderRadius: '25px',
                          background: 'rgba(184, 134, 11, 0.1)',
                          color: '#DAA520',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        whileHover={{
                          background: '#B8860B',
                          color: '#ffffff'
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        Clear Filters
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Results Count */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: '2rem',
                  color: '#999999',
                  fontSize: '0.9rem'
                }}>
                  {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
                </div>

                {/* Menu Items List */}
                <div style={{
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  {sortedCategories.map(category => (
                    <div key={category} style={{ marginBottom: '2rem' }}>
                      <h3 
                        data-category={category}
                        style={{
                          color: '#ffffff',
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          marginBottom: '1rem',
                          paddingBottom: '0.5rem',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {category}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {groupedItems[category].map((item: MenuItem) => (
                          <motion.div
                            key={item.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '1rem',
                              background: 'rgba(255, 255, 255, 0.05)',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              transition: 'all 0.3s ease'
                            }}
                            whileHover={{
                              background: 'rgba(255, 255, 255, 0.1)',
                              border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <div style={{
                                color: '#ffffff',
                                fontWeight: '500',
                                marginBottom: '0.25rem'
                              }}>
                                {item.name}
                              </div>
                              {item.description && (
                                <div style={{
                                  color: '#999999',
                                  fontSize: '0.85rem',
                                  marginBottom: '0.5rem'
                                }}>
                                  {item.description}
                                </div>
                              )}
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem'
                            }}>
                              <div style={{
                                color: '#ffd700',
                                fontWeight: '600',
                                fontSize: '1.1rem'
                              }}>
                                ₹{item.price}
                              </div>
                                                             <div style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: '0.5rem'
                               }}>
                                 {/* Quantity Display */}
                                 {cart.find(cartItem => cartItem.id === item.id) && (
                                   <div style={{
                                     display: 'flex',
                                     alignItems: 'center',
                                     gap: '0.25rem',
                                     padding: '0.25rem 0.5rem',
                                     background: 'rgba(184, 134, 11, 0.2)',
                                     borderRadius: '12px',
                                     border: '1px solid rgba(184, 134, 11, 0.3)'
                                   }}>
                                     <span style={{
                                       color: '#DAA520',
                                       fontSize: '0.8rem',
                                       fontWeight: '600'
                                     }}>
                                       {cart.find(cartItem => cartItem.id === item.id)?.quantity || 0}
                                     </span>
                                   </div>
                                 )}
                                 
                                 {/* Add Button */}
                                 <motion.button
                                   onClick={() => handleAddToCart(item)}
                                   style={{
                                     width: '32px',
                                     height: '32px',
                                     border: 'none',
                                     borderRadius: '50%',
                                     background: '#B8860B',
                                     color: '#ffffff',
                                     cursor: 'pointer',
                                     display: 'flex',
                                     alignItems: 'center',
                                     justifyContent: 'center',
                                     fontSize: '0.9rem'
                                   }}
                                   whileHover={{ scale: 1.1 }}
                                   whileTap={{ scale: 0.9 }}
                                   transition={{ duration: 0.3 }}
                                 >
                                   <FaPlus />
                                 </motion.button>
                               </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: 'clamp(300px, 30vw, 400px)',
                height: '100vh',
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 1002,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Cart Header */}
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  margin: 0
                }}>
                  Your Cart
                </h3>
                <motion.button
                  onClick={() => setShowCart(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#999999',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: '0.25rem'
                  }}
                  whileHover={{ color: '#ffffff' }}
                >
                  <FaTimes />
                </motion.button>
              </div>

              {/* Cart Warning */}
              {cart.length > 0 && (
                <div style={{
                  padding: '1rem 1.5rem',
                  background: 'rgba(255, 193, 7, 0.1)',
                  borderBottom: '1px solid rgba(255, 193, 7, 0.3)',
                  borderTop: '1px solid rgba(255, 193, 7, 0.3)'
                }}>
                  <div style={{
                    textAlign: 'center',
                    color: '#ffc107',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    lineHeight: '1.4'
                  }}>
                    ⚠️ Important Notice<br />
                    Refreshing the page will clear your cart.<br />
                    Please complete your order before leaving! 🛒
                  </div>
                </div>
              )}

              {/* Cart Items */}
              <div style={{
                flex: 1,
                overflow: 'auto',
                padding: '1rem 1.5rem'
              }}>
                {cart.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    color: '#999999'
                  }}>
                    <FaShoppingCart style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   {cart.map((item) => (
                     <div key={item.id} style={{
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'space-between',
                       padding: '1rem',
                       borderRadius: '8px',
                       background: 'rgba(255, 255, 255, 0.05)',
                       border: '1px solid rgba(255, 255, 255, 0.1)'
                     }}>
                       <div style={{ flex: 1 }}>
                         <div style={{
                           color: '#ffffff',
                           fontWeight: '500',
                           marginBottom: '0.25rem'
                         }}>
                           {item.name}
                         </div>
                         <div style={{
                           color: '#ffd700',
                           fontWeight: '600'
                         }}>
                           ₹{item.price}
                         </div>
                       </div>
                       <div style={{
                         display: 'flex',
                         alignItems: 'center',
                         gap: '0.5rem'
                       }}>
                         <motion.button
                           onClick={() => updateQuantity(item.id, item.quantity - 1)}
                           style={{
                             width: '28px',
                             height: '28px',
                             border: 'none',
                             borderRadius: '4px',
                             background: 'rgba(184, 134, 11, 0.2)',
                             color: '#ffffff',
                             cursor: 'pointer',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center'
                           }}
                           whileHover={{ background: 'rgba(184, 134, 11, 0.3)' }}
                         >
                           -
                         </motion.button>
                         <span style={{
                           color: '#ffffff',
                           fontWeight: '600',
                           minWidth: '20px',
                           textAlign: 'center'
                         }}>
                           {item.quantity}
                         </span>
                         <motion.button
                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
                           style={{
                             width: '28px',
                             height: '28px',
                             border: 'none',
                             borderRadius: '4px',
                             background: '#B8860B',
                             color: '#ffffff',
                             cursor: 'pointer',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center'
                           }}
                           whileHover={{ background: 'rgba(184, 134, 11, 0.8)' }}
                         >
                           +
                         </motion.button>
                       </div>
                     </div>
                   ))}
                 </div>
                )}
              </div>

                             {/* Cart Footer */}
               {cart.length > 0 && (
                 <div style={{
                   padding: '1rem 1.5rem',
                   borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                   background: 'rgba(0, 0, 0, 0.5)'
                 }}>
                   <div style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     marginBottom: '1rem'
                   }}>
                     <span style={{ color: '#ffffff', fontWeight: '600' }}>
                       Total:
                     </span>
                     <span style={{
                       color: '#ffd700',
                       fontSize: '1.2rem',
                       fontWeight: 'bold'
                     }}>
                       ₹{getTotalCost()}
                     </span>
                   </div>
                   
                   {/* Clear Cart Button */}
                   <motion.button
                     onClick={clearCart}
                     style={{
                       width: '100%',
                       padding: '0.75rem',
                       marginBottom: '1rem',
                       border: '1px solid rgba(184, 134, 11, 0.3)',
                       borderRadius: '8px',
                       background: 'rgba(184, 134, 11, 0.1)',
                       color: '#DAA520',
                       cursor: 'pointer',
                       fontSize: '0.9rem',
                       fontWeight: '500',
                       transition: 'all 0.3s ease'
                     }}
                     whileHover={{
                       background: 'rgba(184, 134, 11, 0.2)',
                       border: '1px solid rgba(184, 134, 11, 0.5)'
                     }}
                     whileTap={{ scale: 0.95 }}
                   >
                     Clear Cart
                   </motion.button>
                   
                   <div style={{
                     fontSize: '0.9rem',
                     color: '#999999',
                     textAlign: 'center',
                     fontStyle: 'italic',
                     lineHeight: '1.4',
                     marginBottom: '1rem'
                   }}>
                     🧾 Show this cart to our staff and we&apos;ll prepare your order perfectly! 👨‍🍳
                   </div>
                   
                   <div style={{
                     fontSize: '0.8rem',
                     color: '#ffc107',
                     textAlign: 'center',
                     fontWeight: '500',
                     padding: '0.75rem',
                     background: 'rgba(255, 193, 7, 0.1)',
                     borderRadius: '6px',
                     border: '1px solid rgba(255, 193, 7, 0.3)',
                     lineHeight: '1.3'
                   }}>
                     ⚠️ Cart Notice: Refreshing will clear your selections! 🔄
                   </div>
                 </div>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default MenuSection; 