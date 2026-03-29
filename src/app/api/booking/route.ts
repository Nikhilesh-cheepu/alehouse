import { NextRequest, NextResponse } from 'next/server';
import { BOOKING_DISABLED, BOOKING_DISABLED_MESSAGE } from '@/config/booking';

export async function POST(request: NextRequest) {
  if (BOOKING_DISABLED) {
    return NextResponse.json(
      { success: false, message: BOOKING_DISABLED_MESSAGE },
      { status: 403 }
    );
  }
  try {
    const bookingData = await request.json();
    
    // Log the booking data (you can see this in Vercel logs)
    console.log('New booking received:', bookingData);
    
    // Here you can add Google Sheets integration
    // For now, we'll just log it and return success
    // You can integrate with Google Sheets API later
    
    return NextResponse.json({ 
      success: true, 
      message: 'Booking data received successfully',
      data: bookingData 
    });
    
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing booking' },
      { status: 500 }
    );
  }
}
