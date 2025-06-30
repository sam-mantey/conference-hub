# Conference Room Booking System API

This directory contains the API layer for the Conference Room Booking System, which interfaces with the JSON data files in the `/data` directory.

## API Structure

The API is organized into several modules:

### Core API (`index.ts`)

Contains utility functions for:
- Reading and writing data from/to JSON files
- Pagination, filtering, and sorting
- Generating unique IDs

### Room API (`rooms.ts`)

Functions for managing conference rooms:
- `getAllRooms()`: Get all rooms
- `getRooms()`: Get rooms with pagination, filtering, and sorting
- `getRoomById(id)`: Get a specific room by ID
- `createRoom(roomData)`: Create a new room
- `updateRoom(id, roomData)`: Update an existing room
- `deleteRoom(id)`: Delete a room
- `checkRoomAvailability(roomId, startTime, endTime)`: Check if a room is available for a specific time period

### Booking API (`bookings.ts`)

Functions for managing bookings:
- `getAllBookings()`: Get all bookings
- `getBookings()`: Get bookings with pagination, filtering, and sorting
- `getBookingById(id)`: Get a specific booking by ID
- `createBooking(bookingData)`: Create a new booking
- `updateBooking(id, bookingData)`: Update an existing booking
- `cancelBooking(id, reason)`: Cancel a booking
- `deleteBooking(id)`: Delete a booking
- `getBookingsByRoom(roomId)`: Get all bookings for a specific room
- `getBookingsByUser(userId)`: Get all bookings for a specific user
- `isRoomAvailableForBooking(roomId, startTime, endTime)`: Check if a room is available for booking

### User API (`users.ts`)

Functions for managing users:
- `getAllUsers()`: Get all users
- `getUsers()`: Get users with pagination, filtering, and sorting
- `getUserById(id)`: Get a specific user by ID
- `getUserByEmail(email)`: Get a user by email address
- `createUser(userData)`: Create a new user
- `updateUser(id, userData)`: Update an existing user
- `deleteUser(id)`: Delete a user
- `updateLastLogin(id)`: Update a user's last login time
- `getDepartments()`: Get a list of all departments
- `authenticateUser(email, password)`: Authenticate a user

### Resource API (`resources.ts`)

Functions for managing resources:
- `getAllResources()`: Get all resources
- `getResources()`: Get resources with pagination, filtering, and sorting
- `getResourceById(id)`: Get a specific resource by ID
- `createResource(resourceData)`: Create a new resource
- `updateResource(id, resourceData)`: Update an existing resource
- `deleteResource(id)`: Delete a resource
- `getResourcesByType(type)`: Get resources by type (equipment or service)
- `getAvailableResources()`: Get all available resources
- `checkResourcesAvailability(resourceIds, startTime, endTime)`: Check if resources are available for a booking

### Main API Export (`api.ts`)

A consolidated export file that re-exports all functions from the various API modules for easier importing.

## How to Use the API

Import the API functions in your components:

```typescript
// Import specific functions
import { getRooms, createBooking } from '@/lib/api/api';

// Or import everything
import * as API from '@/lib/api/api';
```

Then call the functions as needed:

```typescript
// Example: Get rooms with filtering
async function loadRooms() {
  try {
    const result = await getRooms({
      page: 1,
      pageSize: 10,
      searchTerm: 'conference',
      status: 'available',
      minCapacity: 8
    });
    
    console.log(`Found ${result.total} rooms, showing ${result.rooms.length}`);
    return result.rooms;
  } catch (error) {
    console.error('Error loading rooms:', error);
    return [];
  }
}

// Example: Create a booking
async function bookRoom(roomId, userId, startTime, endTime) {
  try {
    const newBooking = await createBooking({
      roomId,
      userId,
      title: 'Team Meeting',
      description: 'Weekly team sync',
      startTime,
      endTime,
      attendees: [userId],
      resources: [],
      status: 'pending',
      recurring: false,
      notes: ''
    });
    
    return newBooking;
  } catch (error) {
    console.error('Error creating booking:', error);
    return null;
  }
}
```

## Error Handling

All API functions use try/catch blocks and will throw errors if something goes wrong. Make sure to wrap your API calls in try/catch blocks to handle potential errors.

## Notes for Implementation

- This API is designed to work with the JSON data files in the `/data` directory
- In a real application, you would replace the file operations with database calls
- The authentication is simplified for demo purposes and should be replaced with a proper authentication system in production 