import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
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
