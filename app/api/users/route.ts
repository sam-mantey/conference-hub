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

// GET /api/users
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const searchTerm = searchParams.get('searchTerm') || '';
    const sortField = searchParams.get('sortField') || 'name';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const role = searchParams.get('role') || '';
    const department = searchParams.get('department') || '';
    const status = searchParams.get('status') || '';
    
    // Read data
    const data = await readJsonFile('users.json');
    let users = data.users;
    
    // Apply filters
    if (role) {
      users = users.filter((user: any) => user.role === role);
    }
    
    if (department) {
      users = users.filter((user: any) => user.department === department);
    }
    
    if (status) {
      users = users.filter((user: any) => user.status === status);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      users = users.filter((user: any) => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term) ||
        user.position.toLowerCase().includes(term)
      );
    }
    
    // Get total count before pagination
    const total = users.length;
    
    // Apply sorting
    users.sort((a: any, b: any) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      if (valueA === valueB) return 0;
      
      const comparison = valueA < valueB ? -1 : 1;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedUsers = users.slice(startIndex, startIndex + pageSize);
    
    return NextResponse.json({
      users: paginatedUsers,
      total,
      page,
      pageSize
    });
  } catch (error) {
    console.error('Error in users API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users - Get user by ID or email
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, email } = body;
    
    if (!id && !email) {
      return NextResponse.json(
        { error: 'User ID or email is required' },
        { status: 400 }
      );
    }
    
    const data = await readJsonFile('users.json');
    let user;
    
    if (id) {
      user = data.users.find((u: any) => u.id === id);
    } else if (email) {
      user = data.users.find((u: any) => u.email === email);
    }
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in users API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user details' },
      { status: 500 }
    );
  }
} 