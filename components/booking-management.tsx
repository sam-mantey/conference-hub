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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Eye, Check, X, Clock, CalendarIcon, Users, MoreHorizontal } from "lucide-react"
import { format } from "date-fns"

const bookings = [
  {
    id: "BK001",
    room: "Conference Room A",
    user: "John Smith",
    email: "john.smith@company.com",
    department: "Engineering",
    date: "2024-01-15",
    startTime: "09:00",
    endTime: "10:30",
    duration: "1h 30m",
    status: "Confirmed",
    attendees: 8,
    purpose: "Sprint Planning Meeting",
    resources: ["Projector", "Whiteboard"],
  },
  {
    id: "BK002",
    room: "Meeting Room B",
    user: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    department: "Marketing",
    date: "2024-01-15",
    startTime: "10:00",
    endTime: "11:00",
    duration: "1h",
    status: "Active",
    attendees: 4,
    purpose: "Campaign Review",
    resources: ["TV Display"],
  },
  {
    id: "BK003",
    room: "Board Room",
    user: "Mike Davis",
    email: "mike.davis@company.com",
    department: "Sales",
    date: "2024-01-15",
    startTime: "14:00",
    endTime: "16:00",
    duration: "2h",
    status: "Pending",
    attendees: 12,
    purpose: "Quarterly Sales Review",
    resources: ["Video Conferencing", "Sound System"],
  },
  {
    id: "BK004",
    room: "Training Room",
    user: "Lisa Wilson",
    email: "lisa.wilson@company.com",
    department: "HR",
    date: "2024-01-16",
    startTime: "11:00",
    endTime: "12:00",
    duration: "1h",
    status: "Confirmed",
    attendees: 15,
    purpose: "New Employee Orientation",
    resources: ["Projector", "Microphone"],
  },
  {
    id: "BK005",
    room: "Conference Room C",
    user: "Tom Brown",
    email: "tom.brown@company.com",
    department: "Finance",
    date: "2024-01-16",
    startTime: "15:30",
    endTime: "16:30",
    duration: "1h",
    status: "Cancelled",
    attendees: 6,
    purpose: "Budget Planning",
    resources: ["Whiteboard"],
  },
]

const calendarBookings = [
  { date: "2024-01-15", bookings: 3 },
  { date: "2024-01-16", bookings: 2 },
  { date: "2024-01-17", bookings: 4 },
  { date: "2024-01-18", bookings: 1 },
  { date: "2024-01-19", bookings: 5 },
]

export function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<Date>()
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("table")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesDate = !dateFilter || booking.date === format(dateFilter, "yyyy-MM-dd")
    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
          <p className="text-muted-foreground">Manage conference room bookings, approvals, and scheduling.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>New Booking</Button>
        </div>
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
                  placeholder="Search by booking ID, room, or user..."
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
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? format(dateFilter, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
              </PopoverContent>
            </Popover>
            {dateFilter && (
              <Button variant="ghost" onClick={() => setDateFilter(undefined)}>
                Clear Date
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
              <CardDescription>Manage and track all conference room bookings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.room}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.user}</div>
                          <div className="text-sm text-muted-foreground">{booking.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.date}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.startTime} - {booking.endTime}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{booking.attendees}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog
                            open={isViewDialogOpen && selectedBooking?.id === booking.id}
                            onOpenChange={(open) => {
                              setIsViewDialogOpen(open)
                              if (!open) setSelectedBooking(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(booking)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Booking Details - {booking.id}</DialogTitle>
                                <DialogDescription>
                                  Complete booking information and management options
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Room</Label>
                                    <p className="text-sm text-muted-foreground">{booking.room}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Organizer</Label>
                                    <p className="text-sm text-muted-foreground">{booking.user}</p>
                                    <p className="text-xs text-muted-foreground">{booking.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Department</Label>
                                    <p className="text-sm text-muted-foreground">{booking.department}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Date</Label>
                                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Time</Label>
                                    <p className="text-sm text-muted-foreground">
                                      {booking.startTime} - {booking.endTime}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Duration</Label>
                                    <p className="text-sm text-muted-foreground">{booking.duration}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Attendees</Label>
                                    <p className="text-sm text-muted-foreground">{booking.attendees} people</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Purpose</Label>
                                    <p className="text-sm text-muted-foreground">{booking.purpose}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Requested Resources</Label>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {booking.resources.map((resource, index) => (
                                      <Badge key={index} variant="secondary">
                                        {resource}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                  {booking.status === "Pending" && (
                                    <>
                                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <Check className="h-4 w-4 mr-1" />
                                        Approve
                                      </Button>
                                      <Button size="sm" variant="destructive">
                                        <X className="h-4 w-4 mr-1" />
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                  {booking.status === "Confirmed" && (
                                    <Button size="sm" variant="outline">
                                      <Clock className="h-4 w-4 mr-1" />
                                      Reschedule
                                    </Button>
                                  )}
                                  <Button size="sm" variant="outline">
                                    Edit Booking
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {booking.status === "Pending" && (
                            <>
                              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>
                View bookings in a calendar format to better understand scheduling patterns.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} className="rounded-md border" />
                <div className="space-y-4">
                  <h3 className="font-medium">Bookings for Selected Date</h3>
                  {dateFilter ? (
                    <div className="space-y-2">
                      {filteredBookings
                        .filter((booking) => booking.date === format(dateFilter, "yyyy-MM-dd"))
                        .map((booking) => (
                          <div key={booking.id} className="border rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                                <span className="font-medium">{booking.room}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {booking.startTime} - {booking.endTime}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <p>
                                {booking.user} • {booking.purpose}
                              </p>
                              <p className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {booking.attendees} attendees
                              </p>
                            </div>
                          </div>
                        ))}
                      {filteredBookings.filter((booking) => booking.date === format(dateFilter, "yyyy-MM-dd"))
                        .length === 0 && (
                        <p className="text-muted-foreground text-center py-4">No bookings found for this date.</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">Select a date to view bookings.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
