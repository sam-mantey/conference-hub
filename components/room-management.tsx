"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, Edit, Trash2, Eye, MapPin, Users, Monitor, Wifi, Camera } from "lucide-react"

const rooms = [
  {
    id: 1,
    name: "Conference Room A",
    location: "Floor 1, East Wing",
    capacity: 12,
    equipment: ["Projector", "Whiteboard", "Video Conferencing", "WiFi"],
    status: "Available",
    description: "Large conference room with modern AV equipment",
    bookingPolicy: "Max 4 hours per booking",
  },
  {
    id: 2,
    name: "Meeting Room B",
    location: "Floor 1, West Wing",
    capacity: 6,
    equipment: ["TV Display", "Whiteboard", "WiFi"],
    status: "Occupied",
    description: "Cozy meeting room perfect for small team discussions",
    bookingPolicy: "Max 2 hours per booking",
  },
  {
    id: 3,
    name: "Board Room",
    location: "Floor 2, Center",
    capacity: 20,
    equipment: ["Large Display", "Video Conferencing", "Sound System", "WiFi"],
    status: "Available",
    description: "Executive boardroom with premium facilities",
    bookingPolicy: "Executive approval required",
  },
  {
    id: 4,
    name: "Training Room",
    location: "Floor 2, North Wing",
    capacity: 30,
    equipment: ["Projector", "Sound System", "Microphone", "WiFi"],
    status: "Maintenance",
    description: "Large training room for workshops and presentations",
    bookingPolicy: "Max 8 hours per booking",
  },
  {
    id: 5,
    name: "Conference Room C",
    location: "Floor 3, South Wing",
    capacity: 8,
    equipment: ["TV Display", "Whiteboard", "WiFi"],
    status: "Available",
    description: "Modern conference room with natural lighting",
    bookingPolicy: "Max 3 hours per booking",
  },
]

export function RoomManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Occupied":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Maintenance":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getEquipmentIcon = (equipment: string) => {
    switch (equipment.toLowerCase()) {
      case "projector":
        return <Monitor className="h-3 w-3" />
      case "wifi":
        return <Wifi className="h-3 w-3" />
      case "video conferencing":
        return <Camera className="h-3 w-3" />
      default:
        return <Monitor className="h-3 w-3" />
    }
  }

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || room.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const RoomForm = ({ room, onClose }: { room?: any; onClose: () => void }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Room Name</Label>
          <Input id="name" defaultValue={room?.name} placeholder="Enter room name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" defaultValue={room?.location} placeholder="Floor, Wing" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input id="capacity" type="number" defaultValue={room?.capacity} placeholder="Number of people" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={room?.status || "Available"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Occupied">Occupied</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Equipment</Label>
        <div className="grid grid-cols-2 gap-2">
          {["Projector", "Whiteboard", "Video Conferencing", "WiFi", "Sound System", "Microphone"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox id={item} defaultChecked={room?.equipment?.includes(item)} />
              <Label htmlFor={item} className="text-sm">
                {item}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" defaultValue={room?.description} placeholder="Room description" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="policy">Booking Policy</Label>
        <Input id="policy" defaultValue={room?.bookingPolicy} placeholder="Booking rules and restrictions" />
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
          <p className="text-muted-foreground">Manage conference rooms, their equipment, and availability.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>Create a new conference room with equipment and policies.</DialogDescription>
            </DialogHeader>
            <RoomForm onClose={() => setIsAddDialogOpen(false)} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Create Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rooms by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rooms ({filteredRooms.length})</CardTitle>
          <CardDescription>Manage your conference rooms and their configurations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{room.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>{room.capacity}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {room.equipment.slice(0, 2).map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <span className="mr-1">{getEquipmentIcon(item)}</span>
                          {item}
                        </Badge>
                      ))}
                      {room.equipment.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{room.equipment.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog
                        open={isViewDialogOpen && selectedRoom?.id === room.id}
                        onOpenChange={(open) => {
                          setIsViewDialogOpen(open)
                          if (!open) setSelectedRoom(null)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedRoom(room)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{room.name}</DialogTitle>
                            <DialogDescription>Room details and specifications</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Location</Label>
                                <p className="text-sm text-muted-foreground">{room.location}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Capacity</Label>
                                <p className="text-sm text-muted-foreground">{room.capacity} people</p>
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Equipment</Label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {room.equipment.map((item, index) => (
                                  <Badge key={index} variant="secondary">
                                    <span className="mr-1">{getEquipmentIcon(item)}</span>
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Description</Label>
                              <p className="text-sm text-muted-foreground">{room.description}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Booking Policy</Label>
                              <p className="text-sm text-muted-foreground">{room.bookingPolicy}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Status</Label>
                              <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={isEditDialogOpen && selectedRoom?.id === room.id}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (!open) setSelectedRoom(null)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedRoom(room)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Room</DialogTitle>
                            <DialogDescription>Update room information and settings.</DialogDescription>
                          </DialogHeader>
                          <RoomForm room={room} onClose={() => setIsEditDialogOpen(false)} />
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
