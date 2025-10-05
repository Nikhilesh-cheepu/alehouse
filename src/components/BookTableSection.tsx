'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaCalendarAlt, FaClock, FaWhatsapp } from 'react-icons/fa';
import { track } from '@vercel/analytics';

interface TimeOption {
  value: string;
  label: string;
  available: boolean;
}

const BookTableSection = () => {

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    men: '',
    women: '',
    couples: '',
    date: 'Tue, 7 Oct, 2025', // Default date as requested
    time: '2 PM' // Default time to make form work
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    // Check if at least one category has people
    const totalPeople = (parseInt(formData.men) || 0) + (parseInt(formData.women) || 0) + (parseInt(formData.couples) || 0) * 2;
    
    if (totalPeople === 0) {
      newErrors.people = 'Please enter number of people in at least one category';
    } else if (totalPeople < 1) {
      newErrors.people = 'Total number of people must be at least 1';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const formattedDate = new Date(formData.date).toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const formattedTime = new Date(`2000-01-01T${formData.time}`).toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const men = parseInt(formData.men) || 0;
    const women = parseInt(formData.women) || 0;
    const couples = parseInt(formData.couples) || 0;
    const totalPeople = men + women + (couples * 2);

    const message = `🏰 I would like to book a table at AleHouse.

BOOKING DETAILS

Name: ${formData.name}

Mobile: ${formData.mobile}

Guest Count:
Men: ${men}
Women: ${women}
Couples: ${couples}
Total People: ${totalPeople}

Date: ${formattedDate}

Time: ${formattedTime}

Please confirm my table reservation for this medieval dining experience. Thank you!`;

    return encodeURIComponent(message);
  };

  const handleBookTable = async () => {
    console.log('Book button clicked, form data:', formData);
    console.log('Form validation result:', validateForm());
    if (validateForm()) {
      const totalPeople = ((parseInt(formData.men) || 0) + (parseInt(formData.women) || 0) + (parseInt(formData.couples) || 0) * 2);
      
      // Track booking attempt with Vercel Analytics
      track('booking_attempt', {
        name: formData.name,
        mobile: formData.mobile,
        total_people: totalPeople,
        date: formData.date,
        time: formData.time
      });
      
      // Send booking data to your API (for Google Sheets integration)
      try {
        await fetch('/api/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name: formData.name,
            mobile: formData.mobile,
            men: parseInt(formData.men) || 0,
            women: parseInt(formData.women) || 0,
            couples: parseInt(formData.couples) || 0,
            total_people: totalPeople,
            date: formData.date,
            time: formData.time,
            source: 'website'
          }),
        });
      } catch (error) {
        console.error('Error sending booking data:', error);
      }
      
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/918096060606?text=${message}`;
      
      // Use Instagram browser approach for ALL browsers - direct navigation
      try {
        // Direct navigation works better for all browsers (like Instagram browser)
        window.location.href = whatsappUrl;
      } catch (error) {
        console.log('Direct navigation failed, trying clipboard method:', error);
        // Fallback to clipboard if direct navigation fails
        navigator.clipboard.writeText(message).then(() => {
          alert('Your booking message has been copied! Please open WhatsApp and paste it to complete your booking.');
        }).catch(() => {
          alert(`Please copy this message and send it to WhatsApp: ${message}`);
        });
      }
    }
  };

  // Real-time form validation for button state
  const isFormValid = React.useMemo(() => {
    const hasName = formData.name.trim().length > 0;
    const hasValidMobile = formData.mobile.trim().length >= 10 && /^\d{10}$/.test(formData.mobile.replace(/\s/g, ''));
    const totalPeople = ((parseInt(formData.men) || 0) + (parseInt(formData.women) || 0) + (parseInt(formData.couples) || 0) * 2);
    const hasValidPeople = totalPeople > 0;
    const hasDate = formData.date.length > 0;
    const hasTime = formData.time.length > 0;
    
    // Debug logging
    console.log('Form validation:', {
      hasName,
      hasValidMobile,
      hasValidPeople,
      hasDate,
      hasTime,
      totalPeople,
      formData,
      mobileTest: /^\d{10}$/.test(formData.mobile.replace(/\s/g, '')),
      mobileLength: formData.mobile.trim().length
    });
    
    return hasName && hasValidMobile && hasValidPeople && hasDate && hasTime;
  }, [formData]);

  // Apple-style calendar component state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  
  // All browsers now use the same approach (Instagram browser style)

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const today = new Date();
    
    // Get first day of month
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday
    
    const days = [];
    const currentDate = new Date(startDate);
    
    // Generate 6 weeks (42 days) to fill the calendar
    for (let i = 0; i < 42; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const isCurrentMonth = currentDate.getMonth() === month;
      const isPast = currentDate < today || (currentDate.toDateString() === today.toDateString() && new Date().getHours() >= 18);
      const isSelected = formData.date === dateStr;
      
      days.push({
        date: new Date(currentDate),
        dateStr,
        day: currentDate.getDate(),
        isCurrentMonth,
        isPast,
        isSelected,
        isToday: currentDate.toDateString() === today.toDateString()
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  // Generate time options (12 PM to 11 PM)
  const generateTimeOptions = () => {
    const times = [];
    
    for (let hour = 12; hour <= 23; hour++) {
      const displayHour = hour === 12 ? 12 : hour - 12;
      const period = 'PM';
      
      times.push({
        value: `${hour.toString().padStart(2, '0')}:00`,
        label: `${displayHour} ${period}`,
        available: true
      });
    }
    
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleTimeSelect = (time: TimeOption) => {
    setFormData(prev => ({ ...prev, time: time.value }));
    setShowTimeDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCalendar || showTimeDropdown) {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-dropdown]')) {
          setShowCalendar(false);
          setShowTimeDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar, showTimeDropdown]);

  return (
    <section 
      id="book-table" 
      className="relative w-full flex items-center justify-center overflow-hidden bg-black my-24 md:my-16"
      style={{
        padding: '6rem 0 4rem 0',
        minHeight: '80vh'
      }}
    >
      
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            style={{ 
              fontFamily: 'Game of Thrones, serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            Book Your Table
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-medium mb-8" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
            Reserve your seat for an unforgettable medieval dining experience at AleHouse
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div 
            className="relative rounded-2xl p-6 md:p-8"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            
            <form onSubmit={(e) => e.preventDefault()} className="relative z-10">
              {/* Name Field */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-white mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-sm" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-base"
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                    }}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Mobile Field */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-white mb-2">
                  Mobile Number *
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-sm" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter your 10-digit mobile number"
                    maxLength={10}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-base"
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                    }}
                  />
                </div>
                {errors.mobile && (
                  <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Guest Count Fields */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-yellow-300 mb-3" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                  Guest Count *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {/* Men Count */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Men</label>
                    <input
                      type="number"
                      name="men"
                      value={formData.men}
                      onChange={handleInputChange}
                      min="0"
                      max="20"
                      placeholder="0"
                      className="w-full px-3 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white text-center focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-base"
                      style={{
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                      }}
                    />
                  </div>

                  {/* Women Count */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Women</label>
                    <input
                      type="number"
                      name="women"
                      value={formData.women}
                      onChange={handleInputChange}
                      min="0"
                      max="20"
                      placeholder="0"
                      className="w-full px-3 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white text-center focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-base"
                      style={{
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                      }}
                    />
                  </div>

                  {/* Couples Count */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Couples</label>
                    <input
                      type="number"
                      name="couples"
                      value={formData.couples}
                      onChange={handleInputChange}
                      min="0"
                      max="10"
                      placeholder="0"
                      className="w-full px-3 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white text-center focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 text-base"
                      style={{
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                      }}
                    />
                  </div>
                </div>
                {errors.people && (
                  <p className="text-red-400 text-xs mt-2">{errors.people}</p>
                )}
                <p className="text-gray-300 text-sm font-medium mt-3 text-center">
                  Total: {((parseInt(formData.men) || 0) + (parseInt(formData.women) || 0) + (parseInt(formData.couples) || 0) * 2)} people
                </p>
              </div>

              {/* Date and Time Selection */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div data-dropdown className="relative">
                    <label className="block text-sm font-semibold text-white mb-2">
                      Select Date *
                    </label>
                    <div className="relative">
                      <div
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="w-full p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white cursor-pointer transition-all duration-300 flex items-center justify-between hover:border-white/40 hover:bg-white/10 text-base"
                      >
                        <span className={formData.date ? 'text-white' : 'text-gray-400'}>
                          {formData.date 
                            ? new Date(formData.date).toLocaleDateString('en-IN', { 
                                weekday: 'short', 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })
                            : 'Select Date'
                          }
                        </span>
                        <FaCalendarAlt className="text-yellow-400 text-sm" />
                      </div>
                      
                      {showCalendar && (
                        <>
                          {/* Full Screen Modal Backdrop */}
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
                            onClick={() => setShowCalendar(false)}
                          />
                          
                          {/* Full Screen Calendar Modal */}
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="fixed inset-2 md:inset-4 z-[9999] bg-black/95 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] md:max-h-[80vh]"
                          >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 border-b border-white/10">
                              <h3 className="text-white text-lg font-semibold">Select Date</h3>
                              <button
                                onClick={() => setShowCalendar(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            
                            {/* Calendar Content */}
                            <div className="flex-1 p-4 overflow-y-auto">
                              {/* Calendar Header */}
                              <div className="flex items-center justify-between mb-6">
                                <button
                                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                  className="p-3 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                  </svg>
                                </button>
                                
                                <h3 className="text-white font-semibold text-xl">
                                  {currentMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                                </h3>
                                
                                <button
                                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                  className="p-3 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              </div>
                              
                              {/* Calendar Grid */}
                              <div className="grid grid-cols-7 gap-2 mb-4">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                  <div key={day} className="text-center text-sm text-gray-400 font-medium py-3">
                                    {day}
                                  </div>
                                ))}
                              </div>
                              
                              <div className="grid grid-cols-7 gap-2">
                                {calendarDays.map((day, index) => (
                                  <button
                                    key={index}
                                    onClick={() => {
                                      if (!day.isPast && day.isCurrentMonth) {
                                        setFormData(prev => ({ ...prev, date: day.dateStr }));
                                        setShowCalendar(false);
                                      }
                                    }}
                                    disabled={day.isPast || !day.isCurrentMonth}
                                    className={`p-3 text-base rounded-lg transition-all duration-200 min-h-[44px] flex items-center justify-center ${
                                      day.isSelected
                                        ? 'bg-yellow-500 text-black font-semibold'
                                        : day.isToday
                                        ? 'bg-yellow-500/20 text-yellow-300 font-semibold'
                                        : day.isCurrentMonth && !day.isPast
                                        ? 'text-white hover:bg-white/10'
                                        : 'text-gray-500 cursor-not-allowed'
                                    }`}
                                  >
                                    {day.day}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </div>
                    {errors.date && (
                      <p className="text-red-400 text-xs mt-1">{errors.date}</p>
                    )}
                  </div>

                  {/* Time Picker */}
                  <div data-dropdown>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Select Time *
                    </label>
                    <div className="relative">
                      <div
                        onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                        className="w-full p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white cursor-pointer transition-all duration-300 flex items-center justify-between hover:border-white/40 hover:bg-white/10 text-base"
                      >
                        <span className={formData.time ? 'text-white' : 'text-gray-400'}>
                          {formData.time 
                            ? timeOptions.find(t => t.value === formData.time)?.label || formData.time
                            : 'Select Time'
                          }
                        </span>
                        <FaClock className="text-yellow-400 text-sm" />
                      </div>
                      
                      {showTimeDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-sm border border-white/20 rounded-xl z-50 max-h-48 overflow-y-auto shadow-2xl">
                          {timeOptions.map((time) => (
                            <div
                              key={time.value}
                              onClick={() => handleTimeSelect(time)}
                              className={`p-3 cursor-pointer transition-all duration-200 ${
                                formData.time === time.value 
                                  ? 'bg-yellow-500/20 text-yellow-300' 
                                  : 'text-white hover:bg-yellow-500/10'
                              }`}
                            >
                              {time.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.time && (
                      <p className="text-red-400 text-xs mt-1">{errors.time}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* All browsers now use the same WhatsApp opening approach */}

              {/* Book Table Button */}
              <motion.button
                type="button"
                onClick={handleBookTable}
                disabled={!isFormValid}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  isFormValid 
                    ? 'bg-green-500 hover:bg-green-600 text-white border border-green-500 hover:border-green-600' 
                    : 'bg-white/5 text-gray-400 cursor-not-allowed border border-white/10'
                }`}
                whileHover={isFormValid ? {
                  scale: 1.02,
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.4)'
                } : {}}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                <FaWhatsapp className="text-xl" />
                {isFormValid ? 'Book Table via WhatsApp' : 'Fill all fields to book'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookTableSection;
