/**
 * Offers valid for booking. Time window in 24h (start/end minutes from midnight).
 * An offer is shown only if selected time (in minutes) is >= start and < end.
 */
export interface BookingOffer {
  id: string;
  title: string;
  description?: string;
  timeWindowLabel: string;
  /** Start time in 24h minutes from midnight (e.g. 12*60 = 720 for 12:00) */
  startMinutes: number;
  /** End time in 24h minutes from midnight (e.g. 19*60 = 1140 for 19:00) */
  endMinutes: number;
  soldOut?: boolean;
  badge?: 'Limited slots' | 'Selling out fast' | 'Few slots left';
}

export const BOOKING_OFFERS: BookingOffer[] = [
  {
    id: 'eat-drink-127',
    title: 'Eat & Drink Anything @ ₹127',
    timeWindowLabel: '12PM – 7PM',
    startMinutes: 12 * 60,
    endMinutes: 19 * 60,
  },
  {
    id: '30-flat',
    title: '30% Flat Discount',
    timeWindowLabel: '12PM – 10PM',
    startMinutes: 12 * 60,
    endMinutes: 22 * 60,
  },
  {
    id: 'ladies-free',
    title: 'Unlimited Free Drinks for Ladies',
    timeWindowLabel: '8PM – Closing',
    startMinutes: 20 * 60,
    endMinutes: 24 * 60,
  },
];
