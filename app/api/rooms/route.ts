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

// GET /api/rooms
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const searchTerm = searchParams.get('searchTerm') || '';
    const sortField = searchParams.get('sortField') || 'name';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const status = searchParams.get('status') || '';
    const minCapacity = parseInt(searchParams.get('minCapacity') || '0');
    
    // Read data
    const data = await readJsonFile('rooms.json');
    let rooms = data.rooms;
    
    // Apply filters
    if (status) {
      rooms = rooms.filter((room: any) => room.status === status);
    }
    
    if (minCapacity > 0) {
      rooms = rooms.filter((room: any) => room.capacity >= minCapacity);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      rooms = rooms.filter((room: any) => 
        room.name.toLowerCase().includes(term) || 
        room.location.toLowerCase().includes(term)
      );
    }
    
    // Get total count before pagination
    const total = rooms.length;
    
    // Apply sorting
    rooms.sort((a: any, b: any) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      if (valueA === valueB) return 0;
      
      const comparison = valueA < valueB ? -1 : 1;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedRooms = rooms.slice(startIndex, startIndex + pageSize);
    
    return NextResponse.json({
      rooms: paginatedRooms,
      total,
      page,
      pageSize
    });
  } catch (error) {
    console.error('Error in rooms API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}

// GET /api/rooms/:id
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Room ID is required' },
        { status: 400 }
      );
    }
    
    const data = await readJsonFile('rooms.json');
    const room = data.rooms.find((r: any) => r.id === id);
    
    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(room);
  } catch (error) {
    console.error('Error in rooms API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch room details' },
      { status: 500 }
    );
  }
} 