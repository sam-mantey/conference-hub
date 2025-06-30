"use client"

import { useState, useEffect } from "react"
import { getRooms, Room } from "@/lib/api/api"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ArrowUpDown } from "lucide-react"

interface RoomListProps {
  onSelectRoom?: (room: Room) => void
}

export function RoomList({ onSelectRoom }: RoomListProps) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [totalRooms, setTotalRooms] = useState(0)
  const [sortField, setSortField] = useState<keyof Room>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [statusFilter, setStatusFilter] = useState("")
  
  const pageSize = 6

  // Load rooms from API
  useEffect(() => {
    const loadRooms = async () => {
      setLoading(true)
      try {
        const result = await getRooms({
          page,
          pageSize,
          searchTerm,
          sortField,
          sortOrder,
          status: statusFilter,
        })
        
        setRooms(result.rooms)
        setTotalRooms(result.total)
      } catch (err) {
        console.error("Error loading rooms:", err)
        setError("Failed to load rooms. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    
    loadRooms()
  }, [page, searchTerm, sortField, sortOrder, statusFilter])

  // Handle sorting
  const handleSort = (field: keyof Room) => {
    if (field === sortField) {
      // Toggle sort order if clicking the same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      // Default to ascending for a new sort field
      setSortField(field)
      setSortOrder("asc")
    }
  }

  // Handle status filter
  const handleStatusFilter = (status: string) => {
    setStatusFilter(status === statusFilter ? "" : status)
    setPage(1) // Reset to first page when changing filters
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1) // Reset to first page when searching
  }

  // Calculate total pages
  const totalPages = Math.ceil(totalRooms / pageSize)

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search rooms..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
        
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "available" ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusFilter("available")}
          >
            Available
          </Button>
          <Button
            variant={statusFilter === "maintenance" ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusFilter("maintenance")}
          >
            Maintenance
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort("capacity")}
            className="gap-1"
          >
            <ArrowUpDown className="h-4 w-4" />
            Capacity
          </Button>
        </div>
      </div>

      {/* Room list */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
              <CardHeader>
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {rooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No rooms found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <Card 
                  key={room.id} 
                  className={`overflow-hidden transition-all hover:shadow-md ${
                    room.status === "maintenance" ? "opacity-70" : ""
                  }`}
                >
                  <div 
                    className="h-40 bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(${room.image || "/placeholder.jpg"})`
                    }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{room.name}</CardTitle>
                      <Badge variant={room.status === "available" ? "default" : "outline"}>
                        {room.status}
                      </Badge>
                    </div>
                    <CardDescription>{room.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm">
                      <span>Capacity: {room.capacity} people</span>
                      <span>${room.hourlyRate}/hour</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {room.features.slice(0, 3).map((feature, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {room.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{room.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      disabled={room.status !== "available"}
                      onClick={() => onSelectRoom?.(room)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <div className="flex items-center text-sm">
                Page {page} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
} 