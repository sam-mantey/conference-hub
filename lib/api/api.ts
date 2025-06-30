/**
 * Main API export file
 * This file exports all API functions from the various modules
 */

// Room API
export * from './rooms';

// Booking API
export * from './bookings';

// User API
export * from './users';

// Resource API
export * from './resources';

// Helper functions
export { 
  paginateResults, 
  filterBySearchTerm, 
  sortResults, 
  generateId 
} from './index'; 

/**
 * API utility functions for making requests to the server
 */

// Base API URL
const API_BASE_URL = '/api';

// Generic fetch function with error handling
export async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API error for ${endpoint}:`, error);
    throw error;
  }
}

// Helper for GET requests
export function get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
  const url = new URL(`${window.location.origin}${API_BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return fetchApi<T>(url.pathname + url.search);
}

// Helper for POST requests
export function post<T>(endpoint: string, data: any): Promise<T> {
  return fetchApi<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Types for pagination and filtering
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: any; // For additional filter parameters
}

// Generic paginated response type
export interface PaginatedResponse<T> {
  total: number;
  page: number;
  pageSize: number;
  [key: string]: any; // For the actual data array (e.g., rooms, bookings, etc.)
} 