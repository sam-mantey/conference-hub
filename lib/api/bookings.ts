import { get, post, PaginationParams, generateId } from './index';
import { getRoomById } from './rooms';

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  resources: string[];
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  recurring: boolean;
  recurrencePattern?: string;
  recurrenceEndDate?: string;
  notes: string;
  cancellationReason?: string;
}

interface BookingsResponse {
  bookings: Booking[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Get bookings with pagination, filtering and sorting
 */
export async function getBookings({
  page = 1,
  pageSize = 10,
  searchTerm = '',
  sortField = 'startTime',
  sortOrder = 'asc',
  status = '',
  roomId = '',
  userId = '',
  startDate = '',
  endDate = '',
}: {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  roomId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
} = {}): Promise<BookingsResponse> {
  return get<BookingsResponse>('/bookings', {
    page,
    pageSize,
    searchTerm,
    sortField,
    sortOrder,
    status,
    roomId,
    userId,
    startDate,
    endDate
  });
}

/**
 * Get a booking by ID
 */
export async function getBookingById(id: string): Promise<Booking | null> {
  try {
    return await post<Booking>('/bookings', { id });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return null;
  }
}

/**
 * Get bookings for a specific room
 */
export async function getBookingsByRoom(roomId: string): Promise<Booking[]> {
  try {
    const response = await getBookings({ roomId, pageSize: 100 });
    return response.bookings;
  } catch (error) {
    console.error('Error fetching room bookings:', error);
    return [];
  }
}

/**
 * Get bookings for a specific user
 */
export async function getBookingsByUser(userId: string): Promise<Booking[]> {
  try {
    const response = await getBookings({ userId, pageSize: 100 });
    return response.bookings;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return [];
  }
}

/**
 * Check if a room is available for booking in the specified time period
 */
export async function isRoomAvailableForBooking(
  roomId: string,
  startTime: string,
  endTime: string,
  excludeBookingId?: string
): Promise<boolean> {
  try {
    // Check if room exists and is available for booking
    const room = await getRoomById(roomId);
    if (!room || room.status !== 'available') {
      return false;
    }
    
    // Get all confirmed bookings for this room
    const bookings = await getBookingsByRoom(roomId);
    const confirmedBookings = bookings.filter(
      booking => 
        booking.status === 'confirmed' && 
        (excludeBookingId ? booking.id !== excludeBookingId : true)
    );
    
    // Check for time conflicts
    for (const booking of confirmedBookings) {
      if (
        (startTime >= booking.startTime && startTime < booking.endTime) || // Start time is within existing booking
        (endTime > booking.startTime && endTime <= booking.endTime) || // End time is within existing booking
        (startTime <= booking.startTime && endTime >= booking.endTime) // Booking completely encompasses existing booking
      ) {
        return false; // Conflict found
      }
    }
    
    return true; // No conflicts found
  } catch (error) {
    console.error('Error checking room availability:', error);
    return false;
  }
} 