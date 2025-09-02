'use client';

import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="relative w-full h-screen overflow-hidden m-0 p-0"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/about_bg.jpeg)',
        }}
      >
        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full items-center">
            
            {/* Left Column - About Us Title */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 
                className="text-sm uppercase tracking-wider text-[#d1a954] font-bold"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                ABOUT US
              </h3>
              
              <div className="space-y-2">
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl text-[#f4f4f4] leading-tight"
                  style={{ fontFamily: 'Game of Thrones, serif' }}
                >
                  THE REALM
                </h1>
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl text-[#f4f4f4] leading-tight text-center"
                  style={{ fontFamily: 'Game of Thrones, serif' }}
                >
                  OF
                </h1>
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl text-[#f4f4f4] leading-tight"
                  style={{ fontFamily: 'Game of Thrones, serif' }}
                >
                  ALEHOUSE
                </h1>
              </div>
            </motion.div>

            {/* Center Column - Description & Button */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p 
                className="text-[#f4f4f4] leading-relaxed max-w-[80%]"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Born from a deep love for fantasy and fire, Alehouse is more than just a place to eat and drink, it&apos;s a realm where stories are shared over goblets, where every wall whispers a legend, and every corner invites you to play a part in the tale. Our vision was to create a world where fans and foodies collide, where medieval meets modern, and where Hyderabad gets a taste of epic fantasy with a side of ale and music. Built in the heart of Sarath City Capital Mall, we invite you to walk in not just as a guest, but as a ruler of your own night.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-white text-white rounded-md hover:bg-white/10 transition-all duration-300 uppercase tracking-wide"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                KNOW MORE
              </motion.button>
            </motion.div>

            {/* Right Column - Opening Hours */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-right space-y-6"
            >
              <h3 
                className="text-lg font-semibold text-[#f4f4f4]"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Opening Hours
              </h3>
              
              <div className="space-y-4">
                <div className="border-t border-white/30 pt-4">
                  <p 
                    className="text-[#f4f4f4] text-sm"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Sunday - Thursday
                  </p>
                  <p 
                    className="text-[#f4f4f4] text-sm"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    12 pm - 11:30 pm
                  </p>
                </div>
                
                <div className="border-t border-white/30 pt-4">
                  <p 
                    className="text-[#f4f4f4] text-sm"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Friday - Saturday
                  </p>
                  <p 
                    className="text-[#f4f4f4] text-sm"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    12 pm - 12:30 am
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
