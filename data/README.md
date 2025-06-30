# Conference Room Booking System - Dummy Backend

This directory contains JSON files that serve as a dummy backend for the Conference Room Booking System. These files can be used as a reference for developing the actual backend implementation.

## Data Structure

The dummy backend consists of the following JSON files:

### 1. `rooms.json`

Contains information about available conference rooms.

**Key fields:**
- `id`: Unique identifier for the room
- `name`: Room name
- `capacity`: Maximum number of people the room can accommodate
- `location`: Physical location of the room
- `features`: Array of amenities/features available in the room
- `hourlyRate`: Cost per hour to book the room
- `availability`: Weekly schedule showing when the room is generally available
- `status`: Current status of the room (available, maintenance, etc.)

### 2. `users.json`

Contains information about system users.

**Key fields:**
- `id`: Unique identifier for the user
- `name`: User's full name
- `email`: User's email address
- `role`: User's role in the system (admin, manager, user)
- `department`: User's department
- `status`: Whether the user account is active or inactive

### 3. `bookings.json`

Contains information about room bookings.

**Key fields:**
- `id`: Unique identifier for the booking
- `roomId`: ID of the booked room (references `rooms.json`)
- `userId`: ID of the user who made the booking (references `users.json`)
- `title`: Title/purpose of the meeting
- `startTime`: Start date and time of the booking
- `endTime`: End date and time of the booking
- `attendees`: Array of user IDs who will attend the meeting
- `resources`: Array of resource IDs requested for the meeting
- `status`: Booking status (confirmed, pending, cancelled)
- `recurring`: Whether this is a recurring booking
- `recurrencePattern`: For recurring bookings, the pattern (daily, weekly, monthly)

### 4. `resources.json`

Contains information about bookable resources and services.

**Key fields:**
- `id`: Unique identifier for the resource
- `name`: Resource name
- `type`: Type of resource (equipment, service)
- `description`: Detailed description of the resource
- `quantity`: Number of units available (null for services)
- `status`: Current status of the resource
- `location`: Where the resource is stored (for equipment)
- `assignable`: Whether the resource can be assigned to bookings

## Relationships Between Data

- Each booking in `bookings.json` references a room from `rooms.json` via `roomId`
- Each booking in `bookings.json` references a user from `users.json` via `userId`
- The `attendees` array in bookings contains user IDs from `users.json`
- The `resources` array in bookings contains resource IDs from `resources.json`

## How to Use This Data

When implementing the actual backend, you can use these JSON files as:

1. **Data Model Reference**: The structure of these files can guide your database schema design
2. **Sample Data**: Use this data to populate your database for testing
3. **API Response Format**: The JSON structure can serve as a template for your API responses

## Example API Endpoints

Based on this data structure, your backend might implement endpoints like:

- `GET /api/rooms` - List all rooms
- `GET /api/rooms/:id` - Get details of a specific room
- `GET /api/bookings` - List all bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/resources` - List all resources
- `GET /api/users` - List all users

## Authentication and Authorization

In a real implementation, you would need to add:

- JWT or session-based authentication
- Role-based access control (admin, manager, user)
- Validation logic for booking conflicts
- Business rules for resource allocation

This dummy backend provides a foundation that you can build upon when developing the actual backend system. 