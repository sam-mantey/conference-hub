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

// POST /api/users/auth - Authenticate user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    const data = await readJsonFile('users.json');
    const user = data.users.find((u: any) => u.email === email);
    
    // For demo purposes, we'll just check if the user exists and is active
    // In a real app, you would verify the password here
    if (!user || user.status !== 'active') {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // In a real app, you would update the last login time in the database
    
    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error in user authentication:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 