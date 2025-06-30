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

// GET /api/resources
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
    const type = searchParams.get('type') || '';
    const roomId = searchParams.get('roomId') || '';
    
    // Read data
    const data = await readJsonFile('resources.json');
    let resources = data.resources;
    
    // Apply filters
    if (status) {
      resources = resources.filter((resource: any) => resource.status === status);
    }
    
    if (type) {
      resources = resources.filter((resource: any) => resource.type === type);
    }
    
    if (roomId) {
      resources = resources.filter((resource: any) => resource.roomId === roomId);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      resources = resources.filter((resource: any) => 
        resource.name.toLowerCase().includes(term) || 
        (resource.description && resource.description.toLowerCase().includes(term))
      );
    }
    
    // Get total count before pagination
    const total = resources.length;
    
    // Apply sorting
    resources.sort((a: any, b: any) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      if (valueA === valueB) return 0;
      
      const comparison = valueA < valueB ? -1 : 1;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedResources = resources.slice(startIndex, startIndex + pageSize);
    
    return NextResponse.json({
      resources: paginatedResources,
      total,
      page,
      pageSize
    });
  } catch (error) {
    console.error('Error in resources API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}

// POST /api/resources - Get resource by ID
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Resource ID is required' },
        { status: 400 }
      );
    }
    
    const data = await readJsonFile('resources.json');
    const resource = data.resources.find((r: any) => r.id === id);
    
    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(resource);
  } catch (error) {
    console.error('Error in resources API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resource details' },
      { status: 500 }
    );
  }
} 