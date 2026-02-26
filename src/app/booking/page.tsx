'use client';

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { BOOKING_OFFERS } from '@/data/bookingOffers';

const OUTLET_NAME = 'Alehouse';
const WHATSAPP_NUMBER = '918096060606';

type Tab = 'lunch' | 'dinner';

type DayItem = { dateStr: string; label: string; dayNum: number };

function get15Days(): DayItem[] {
  const out: DayItem[] = [];
  const today = new Date();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let i = 0; i < 15; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${day}`;
    const label = i === 0 ? 'Today' : weekdays[d.getDay()];
    out.push({ dateStr, label, dayNum: d.getDate() });
  }
  return out;
}

function getLunchSlots(): string[] {
  const slots: string[] = [];
  for (let h = 12; h <= 18; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 18 && m > 0) break;
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
}

function getDinnerSlots(): string[] {
  const slots: string[] = [];
  for (let h = 18; h <= 23; h++) {
    for (let m = h === 18 ? 15 : 0; m < 60; m += 15) {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
}

function timeToMinutes(time24: string): number {
  const [h, m] = time24.split(':').map(Number);
  return h * 60 + m;
}

function isSlotInPast(dateStr: string, time24: string): boolean {
  const [y, mo, d] = dateStr.split('-').map(Number);
  const [h, min] = time24.split(':').map(Number);
  const slot = new Date(y, mo - 1, d, h, min);
  return slot <= new Date();
}

function formatTime12(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const period = h < 12 ? 'AM' : 'PM';
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

function formatDateForMessage(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const LUNCH_SLOTS = getLunchSlots();
const DINNER_SLOTS = getDinnerSlots();

export default function BookingPage() {
  const [days, setDays] = useState<DayItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('lunch');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedOfferIds, setSelectedOfferIds] = useState<Set<string>>(new Set());
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Compute date-dependent state only on client to avoid hydration mismatch
  useEffect(() => {
    const d = get15Days();
    setDays(d);
    if (d.length) {
      setSelectedDate(d[0].dateStr);
      setActiveTab(new Date().getHours() >= 18 ? 'dinner' : 'lunch');
    }
  }, []);

  const isToday = selectedDate
    ? new Date(selectedDate).toDateString() === new Date().toDateString()
    : false;

  const slots = activeTab === 'lunch' ? LUNCH_SLOTS : DINNER_SLOTS;
  const visibleSlots = useMemo(() => {
    if (!selectedDate || !isToday) return slots;
    return slots.filter((t) => !isSlotInPast(selectedDate, t));
  }, [isToday, selectedDate, slots]);

  const handleSelectDate = useCallback((dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedTime(null);
    setSelectedOfferIds(new Set());
    const isTodaySelected =
      new Date(dateStr).toDateString() === new Date().toDateString();
    setActiveTab(
      isTodaySelected && new Date().getHours() >= 18 ? 'dinner' : 'lunch'
    );
  }, []);

  const handleSwitchTab = useCallback((tab: Tab) => {
    setActiveTab(tab);
    setSelectedTime(null);
    setSelectedOfferIds(new Set());
  }, []);

  const selectedTimeMinutes = selectedTime ? timeToMinutes(selectedTime) : 0;
  const offersForTime = useMemo(() => {
    if (!selectedTime) return [];
    return BOOKING_OFFERS.filter(
      (o) =>
        selectedTimeMinutes >= o.startMinutes && selectedTimeMinutes < o.endMinutes
    );
  }, [selectedTime, selectedTimeMinutes]);

  const toggleOffer = useCallback((id: string) => {
    setSelectedOfferIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    const e: Record<string, string> = {};
    if (!selectedDate) e.date = 'Select a date';
    if (!selectedTime) e.time = 'Select a time';
    if (guests < 1 || guests > 20) e.guests = 'Guests must be 1–20';
    if (!name.trim()) e.name = 'Full name is required';
    const digits = mobile.replace(/\D/g, '');
    if (digits.length !== 10) e.mobile = 'Enter a valid 10-digit mobile number';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [selectedDate, selectedTime, guests, name, mobile]);

  const buildWhatsAppUrl = useCallback(() => {
    const dateLine = formatDateForMessage(selectedDate!);
    const timeLine = formatTime12(selectedTime!);
    const guestLine = `${guests} Guest${guests !== 1 ? 's' : ''}`;
    const offerLines = offersForTime
      .filter((o) => selectedOfferIds.has(o.id))
      .map((o) => o.title);
    const lines = [
      `Table Reservation | ${OUTLET_NAME}`,
      '',
      `${name.trim()} | ${mobile.replace(/\D/g, '')}`,
      '',
      `${dateLine} | ${timeLine}`,
      '',
      guestLine,
      ...offerLines,
      ...(notes.trim() ? ['', notes.trim()] : []),
      '',
      'Reservation submitted via Alehouse',
    ];
    const message = lines.join('\n');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [
    selectedDate,
    selectedTime,
    guests,
    name,
    mobile,
    notes,
    selectedOfferIds,
    offersForTime,
  ]);

  const handleConfirm = useCallback(() => {
    if (!validate()) return;
    const url = buildWhatsAppUrl();
    window.location.href = url;
  }, [validate, buildWhatsAppUrl]);

  const pill =
    'rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors border';
  const pillInactive =
    'bg-white/5 border-white/20 text-white hover:bg-white/10';
  const pillActive =
    'bg-amber-500/20 border-amber-500/50 text-amber-300';

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main
        id="booking-main"
        className="relative w-full bg-black min-h-screen"
        style={{
          paddingTop: 'var(--nav-height, 8rem)',
          paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
        }}
      >
        <div className="w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="scroll-mt-[var(--nav-height,8rem)]" id="book-your-table">
              <h1
                className="text-xl md:text-2xl font-bold text-white text-center mb-1"
                style={{ fontFamily: 'Game of Thrones, serif' }}
              >
                Book Your Table
              </h1>
              <p className="text-gray-400 text-center text-xs">
                Reserve your seat at Alehouse
              </p>
            </div>

            {/* 15-day date strip - render only after client mount to avoid hydration mismatch */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {days.length === 0 ? (
              <div className="flex gap-1.5 flex-shrink-0">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 rounded-full px-3 py-2 bg-white/10 border border-white/10"
                  >
                    <span className="block text-xs text-white/50">—</span>
                    <span className="block font-semibold text-white/50">—</span>
                  </div>
                ))}
              </div>
            ) : (
              days.map(({ dateStr, label, dayNum }) => {
                const isSelected = selectedDate === dateStr;
                return (
                  <button
                    key={dateStr}
                    type="button"
                    onClick={() => handleSelectDate(dateStr)}
                    className={`flex-shrink-0 ${pill} ${
                      isSelected ? pillActive : pillInactive
                    }`}
                  >
                    <span className="block text-xs opacity-90">{label}</span>
                    <span className="block font-semibold">{dayNum}</span>
                  </button>
                );
              })
            )}
          </div>

          {/* Lunch / Dinner tabs */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleSwitchTab('lunch')}
              className={`flex-1 ${pill} ${
                activeTab === 'lunch' ? pillActive : pillInactive
              }`}
            >
              Lunch
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('dinner')}
              className={`flex-1 ${pill} ${
                activeTab === 'dinner' ? pillActive : pillInactive
              }`}
            >
              Dinner
            </button>
          </div>

          {/* Time slots grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {visibleSlots.map((time24) => {
              const isSelected = selectedTime === time24;
              const [h, m] = time24.split(':').map(Number);
              const label =
                h === 0
                  ? `12:${String(m).padStart(2, '0')}AM`
                  : h < 12
                    ? `${h}:${String(m).padStart(2, '0')}AM`
                    : h === 12
                      ? `12:${String(m).padStart(2, '0')}PM`
                      : `${h - 12}:${String(m).padStart(2, '0')}PM`;
              return (
                <button
                  key={time24}
                  type="button"
                  onClick={() => setSelectedTime(time24)}
                  className={`${pill} ${
                    isSelected ? pillActive : pillInactive
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Offers (only after time selected) */}
          {selectedTime && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <p className="text-amber-400/90 text-xs font-medium mb-2 flex items-center gap-1">
                <span>✨</span> Available for {formatTime12(selectedTime)}
              </p>
              <div className="space-y-1.5">
                {offersForTime.map((offer) => (
                  <label
                    key={offer.id}
                    className={`flex items-start gap-2 rounded-lg border p-2.5 cursor-pointer ${
                      offer.soldOut
                        ? 'opacity-60 cursor-not-allowed border-white/10 bg-white/5'
                        : 'border-white/15 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedOfferIds.has(offer.id)}
                      onChange={() => !offer.soldOut && toggleOffer(offer.id)}
                      disabled={offer.soldOut}
                      className="mt-1 rounded border-amber-500/50 text-amber-500"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-white font-medium">
                        {offer.title}
                      </span>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {offer.timeWindowLabel}
                      </p>
                      {offer.badge && (
                        <span className="text-amber-400/80 text-xs">
                          {offer.badge}
                        </span>
                      )}
                      {offer.soldOut && (
                        <span className="text-red-400 text-xs">SOLD OUT</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {/* Guests */}
          <div>
            <label className="block text-white font-medium text-xs mb-1">
              Guests *
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-base ${pillInactive}`}
              >
                −
              </button>
              <span className="text-white font-semibold w-6 text-center text-sm">
                {guests}
              </span>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(20, g + 1))}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-base ${pillActive}`}
              >
                +
              </button>
            </div>
            {errors.guests && (
              <p className="text-red-400 text-xs mt-1">{errors.guests}</p>
            )}
          </div>

          {/* Full name */}
          <div>
            <label className="block text-white font-medium text-xs mb-1">
              Full name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white text-sm placeholder-gray-500 focus:border-amber-500/40 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-white font-medium text-xs mb-1">
              10-digit mobile *
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter 10-digit mobile"
              maxLength={10}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white text-sm placeholder-gray-500 focus:border-amber-500/40 focus:outline-none"
            />
            {errors.mobile && (
              <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-white font-medium text-xs mb-1">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special requests"
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white text-sm placeholder-gray-500 focus:border-amber-500/40 focus:outline-none resize-none"
            />
          </div>

          {/* Confirm */}
          <motion.button
            type="button"
            onClick={handleConfirm}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-amber-500/90 hover:bg-amber-500 border border-amber-400/30"
          >
            Confirm Booking
          </motion.button>

          {errors.date && (
            <p className="text-red-400 text-center text-sm mt-2">{errors.date}</p>
          )}
          {errors.time && (
            <p className="text-red-400 text-center text-sm mt-1">{errors.time}</p>
          )}
        </div>
      </main>
    </div>
  );
}
