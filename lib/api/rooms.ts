import { get, post, PaginationParams, generateId } from './index';

export interface Room {
  id: string;
  name: string;
  capacity: number;
  location: string;
  features: string[];
  hourlyRate: number;
  availability: {
    [key: string]: string[];
  };
  image: string;
  status: string;
}

interface RoomsResponse {
  rooms: Room[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Get rooms with pagination, filtering and sorting
 */
export async function getRooms({
  page = 1,
  pageSize = 10,
  searchTerm = '',
  sortField = 'name',
  sortOrder = 'asc',
  status = '',
  minCapacity = 0,
}: {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  minCapacity?: number;
} = {}): Promise<RoomsResponse> {
  return get<RoomsResponse>('/rooms', {
    page,
    pageSize,
    searchTerm,
    sortField,
    sortOrder,
    status,
    minCapacity
  });
}

/**
 * Get a room by ID
 */
export async function getRoomById(id: string): Promise<Room | null> {
  try {
    return await post<Room>('/rooms', { id });
  } catch (error) {
    console.error('Error fetching room:', error);
    return null;
  }
}

/**
 * Check room availability for a specific time period
 */
export async function checkRoomAvailability(
  roomId: string,
  startTime: string,
  endTime: string
): Promise<boolean> {
  try {
    const room = await getRoomById(roomId);
    if (!room) return false;
    
    // In a real implementation, we would check the room's availability
    // against existing bookings for the specified time period
    
    // For this dummy implementation, we'll just check if the room is available
    return room.status === 'available';
  } catch (error) {
    console.error('Error checking room availability:', error);
    return false;
  }
} 