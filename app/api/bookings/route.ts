import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the base path for our data files
const DATA_DIR = path.join(process.cwd(), 'data');

// Helper function to read JSON data
async function readJsonFile(fileName: string) {
  try {
    const filePath = path.join(DATA_DIR, fileName);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    throw new Error(`Failed to read data from ${fileName}`);
  }
}

// GET /api/bookings
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const searchTerm = searchParams.get('searchTerm') || '';
    const sortField = searchParams.get('sortField') || 'startTime';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const status = searchParams.get('status') || '';
    const roomId = searchParams.get('roomId') || '';
    const userId = searchParams.get('userId') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    
    // Read data
    const data = await readJsonFile('bookings.json');
    let bookings = data.bookings;
    
    // Apply filters
    if (status) {
      bookings = bookings.filter((booking: any) => booking.status === status);
    }
    
    if (roomId) {
      bookings = bookings.filter((booking: any) => booking.roomId === roomId);
    }
    
    if (userId) {
      bookings = bookings.filter((booking: any) => 
        booking.userId === userId || booking.attendees.includes(userId)
      );
    }
    
    if (startDate) {
      bookings = bookings.filter((booking: any) => booking.startTime >= startDate);
    }
    
    if (endDate) {
      bookings = bookings.filter((booking: any) => booking.endTime <= endDate);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      bookings = bookings.filter((booking: any) => 
        booking.title.toLowerCase().includes(term) || 
        booking.description.toLowerCase().includes(term) ||
        (booking.notes && booking.notes.toLowerCase().includes(term))
      );
    }
    
    // Get total count before pagination
    const total = bookings.length;
    
    // Apply sorting
    bookings.sort((a: any, b: any) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      if (valueA === valueB) return 0;
      
      const comparison = valueA < valueB ? -1 : 1;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedBookings = bookings.slice(startIndex, startIndex + pageSize);
    
    return NextResponse.json({
      bookings: paginatedBookings,
      total,
      page,
      pageSize
    });
  } catch (error) {
    console.error('Error in bookings API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Get booking by ID
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }
    
    const data = await readJsonFile('bookings.json');
    const booking = data.bookings.find((b: any) => b.id === id);
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error in bookings API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking details' },
      { status: 500 }
    );
  }
} 