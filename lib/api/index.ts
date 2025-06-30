/**
 * API utilities for accessing the backend data
 */

import { get, post, PaginationParams } from './api';

// Export the API utilities
export * from './api';

/**
 * Helper function for filtering results by a search term
 */
export function filterBySearchTerm<T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  fields: string[]
): T[] {
  if (!searchTerm) return items;
  
  const term = searchTerm.toLowerCase();
  
  return items.filter(item => {
    return fields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term);
      }
      return false;
    });
  });
}

/**
 * Helper function for sorting results
 */
export function sortResults<T extends Record<string, any>>(
  items: T[],
  sortField: keyof T,
  sortOrder: 'asc' | 'desc' = 'asc'
): T[] {
  return [...items].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
    
    if (valueA === valueB) return 0;
    
    if (sortOrder === 'asc') {
      return valueA < valueB ? -1 : 1;
    } else {
      return valueA > valueB ? -1 : 1;
    }
  });
}

/**
 * Helper function to generate a unique ID
 */
export function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}${randomStr}`;
} 