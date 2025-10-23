# Google Ads Conversion Tracking Setup

## Overview
Google Ads conversion tracking has been successfully integrated into the Alehouse website to track table booking conversions.

## What Was Implemented

### 1. Google Ads Tracking Component
**File:** `src/components/GoogleAdsTracking.tsx`
- Created a client-side component that loads the Google Ads tracking script
- Uses Next.js `Script` component with `afterInteractive` strategy for optimal performance
- Includes the Google tag with your conversion ID: `AW-17363117356`

### 2. Global Layout Integration
**File:** `src/app/layout.tsx`
- Added the `GoogleAdsTracking` component to the `<head>` section
- This ensures the Google tag is loaded on every page of your website

### 3. Conversion Tracking Utilities
**File:** `src/lib/gtag.ts`
- Created helper functions for tracking conversions:
  - `trackConversion()` - Tracks a basic conversion event
  - `trackConversionWithValue()` - Tracks a conversion with monetary value (optional)
- Includes TypeScript declarations for the gtag function

### 4. Booking Conversion Tracking
**File:** `src/components/BookTableSection.tsx`
- Integrated conversion tracking into the table booking flow
- The conversion event is triggered when a user successfully submits a booking form
- Conversion ID: `AW-17363117356/H-3GCLfqrKIbEKzKsNdA`

## How It Works

1. **Global Tag Installation**: The Google tag (`AW-17363117356`) is loaded on every page through the root layout
2. **Conversion Event**: When a user fills out the booking form and clicks "Book Table via WhatsApp", the following happens:
   - Form validation is performed
   - Vercel Analytics tracks the booking attempt
   - **Google Ads conversion is tracked** using `trackConversion()`
   - Booking data is sent to your API
   - User is redirected to WhatsApp to complete the booking

## Testing Conversion Tracking

To verify that conversion tracking is working:

1. Open your website in a browser
2. Open browser DevTools (F12) → Console tab
3. Fill out the booking form and submit it
4. In the Console, you should see network requests to `googletagmanager.com`
5. In Google Ads, conversions typically appear within 24-48 hours

You can also use the **Google Tag Assistant** browser extension to debug the tracking in real-time.

## Google Ads Dashboard

To view conversions in Google Ads:
1. Log in to Google Ads with `alehousesccm@gmail.com`
2. Go to **Tools & Settings** → **Conversions**
3. Look for the "Contact" conversion action
4. Monitor conversion data over time

## Notes

- The conversion event is triggered on the "Book Table" button click after successful form validation
- Conversions are tracked client-side using the gtag.js library
- The implementation follows Google's recommended practices for Next.js applications
- No AMP pages were detected, so only HTML page tracking was implemented

## Files Modified/Created

✅ **Created:**
- `src/components/GoogleAdsTracking.tsx` - Google Ads tracking component
- `src/lib/gtag.ts` - Conversion tracking utility functions
- `GOOGLE_ADS_SETUP.md` - This documentation file

✅ **Modified:**
- `src/app/layout.tsx` - Added GoogleAdsTracking component
- `src/components/BookTableSection.tsx` - Added conversion tracking to booking flow

## Support

If you need to modify the conversion tracking or add additional conversion events in the future, you can use the `trackConversion()` function from `src/lib/gtag.ts` anywhere in your application.

Example:
```typescript
import { trackConversion } from '@/lib/gtag';

// Track a conversion
trackConversion();

// Or track with a specific value
import { trackConversionWithValue } from '@/lib/gtag';
trackConversionWithValue(500, 'INR');
```


