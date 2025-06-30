import { get, post, PaginationParams, generateId } from './index';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  department: string;
  position: string;
  phone: string;
  profileImage: string;
  dateCreated: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Get users with pagination, filtering and sorting
 */
export async function getUsers({
  page = 1,
  pageSize = 10,
  searchTerm = '',
  sortField = 'name',
  sortOrder = 'asc',
  role = '',
  department = '',
  status = '',
}: {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  role?: string;
  department?: string;
  status?: string;
} = {}): Promise<UsersResponse> {
  return get<UsersResponse>('/users', {
    page,
    pageSize,
    searchTerm,
    sortField,
    sortOrder,
    role,
    department,
    status
  });
}

/**
 * Get a user by ID
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    return await post<User>('/users', { id });
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

/**
 * Get a user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await post<User>('/users', { email });
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
}

/**
 * Get departments from users
 */
export async function getDepartments(): Promise<string[]> {
  try {
    const response = await getUsers({ pageSize: 100 });
    const departments = new Set<string>();
    
    response.users.forEach(user => {
      if (user.department) {
        departments.add(user.department);
      }
    });
    
    return Array.from(departments).sort();
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
}

/**
 * Authenticate a user
 */
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const response = await post<{ success: boolean; user: User }>('/users/auth', { 
      email, 
      password 
    });
    
    if (response.success) {
      return response.user;
    }
    
    return null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
} 