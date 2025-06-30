import { get, post, PaginationParams, generateId } from './index';

export interface Resource {
  id: string;
  name: string;
  type: 'equipment' | 'service';
  description: string;
  quantity: number | null;
  status: 'available' | 'maintenance' | 'unavailable';
  location?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  image: string;
  assignable: boolean;
  leadTime?: string;
  provider?: string;
  contactPerson?: string;
  contactEmail?: string;
  cost?: number;
  costUnit?: string;
  notes?: string;
}

interface ResourcesResponse {
  resources: Resource[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Get resources with pagination, filtering and sorting
 */
export async function getResources({
  page = 1,
  pageSize = 10,
  searchTerm = '',
  sortField = 'name',
  sortOrder = 'asc',
  type = '',
  status = '',
  assignableOnly = false,
}: {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  type?: string;
  status?: string;
  assignableOnly?: boolean;
} = {}): Promise<ResourcesResponse> {
  return get<ResourcesResponse>('/resources', {
    page,
    pageSize,
    searchTerm,
    sortField,
    sortOrder,
    type,
    status,
    assignableOnly: assignableOnly ? 'true' : ''
  });
}

/**
 * Get a resource by ID
 */
export async function getResourceById(id: string): Promise<Resource | null> {
  try {
    return await post<Resource>('/resources', { id });
  } catch (error) {
    console.error('Error fetching resource:', error);
    return null;
  }
}

/**
 * Get resources by type
 */
export async function getResourcesByType(type: 'equipment' | 'service'): Promise<Resource[]> {
  try {
    const response = await getResources({ type, pageSize: 100 });
    return response.resources;
  } catch (error) {
    console.error('Error fetching resources by type:', error);
    return [];
  }
}

/**
 * Get available resources
 */
export async function getAvailableResources(): Promise<Resource[]> {
  try {
    const response = await getResources({ 
      status: 'available', 
      assignableOnly: true,
      pageSize: 100 
    });
    return response.resources;
  } catch (error) {
    console.error('Error fetching available resources:', error);
    return [];
  }
}

/**
 * Check if resources are available for a booking
 */
export async function checkResourcesAvailability(
  resourceIds: string[],
  startTime: string,
  endTime: string
): Promise<{ available: boolean; unavailableResources: Resource[] }> {
  try {
    // Get all requested resources
    const resources: Resource[] = [];
    
    for (const id of resourceIds) {
      const resource = await getResourceById(id);
      if (resource) {
        resources.push(resource);
      }
    }
    
    const unavailableResources = resources.filter(resource => 
      resource.status !== 'available' || !resource.assignable
    );
    
    // In a real implementation, we would also check if the resources are already
    // booked for the specified time period
    
    return {
      available: unavailableResources.length === 0,
      unavailableResources,
    };
  } catch (error) {
    console.error('Error checking resources availability:', error);
    return {
      available: false,
      unavailableResources: [],
    };
  }
} 