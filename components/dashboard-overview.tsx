"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, Calendar, Users, TrendingUp, Clock, MapPin, MoreHorizontal } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const utilizationData = [
  { name: "Mon", utilization: 85 },
  { name: "Tue", utilization: 92 },
  { name: "Wed", utilization: 78 },
  { name: "Thu", utilization: 95 },
  { name: "Fri", utilization: 88 },
  { name: "Sat", utilization: 45 },
  { name: "Sun", utilization: 32 },
]

const peakHoursData = [
  { hour: "8AM", bookings: 12 },
  { hour: "9AM", bookings: 25 },
  { hour: "10AM", bookings: 35 },
  { hour: "11AM", bookings: 28 },
  { hour: "12PM", bookings: 15 },
  { hour: "1PM", bookings: 18 },
  { hour: "2PM", bookings: 32 },
  { hour: "3PM", bookings: 38 },
  { hour: "4PM", bookings: 22 },
  { hour: "5PM", bookings: 8 },
]

const roomStatusData = [
  { name: "Available", value: 12, color: "#10b981" },
  { name: "Occupied", value: 8, color: "#f59e0b" },
  { name: "Maintenance", value: 2, color: "#ef4444" },
]

const recentBookings = [
  {
    id: "BK001",
    room: "Conference Room A",
    user: "John Smith",
    time: "09:00 - 10:30",
    status: "Active",
    department: "Engineering",
  },
  {
    id: "BK002",
    room: "Meeting Room B",
    user: "Sarah Johnson",
    time: "10:00 - 11:00",
    status: "Confirmed",
    department: "Marketing",
  },
  {
    id: "BK003",
    room: "Board Room",
    user: "Mike Davis",
    time: "14:00 - 16:00",
    status: "Pending",
    department: "Sales",
  },
  {
    id: "BK004",
    room: "Training Room",
    user: "Lisa Wilson",
    time: "11:00 - 12:00",
    status: "Active",
    department: "HR",
  },
  {
    id: "BK005",
    room: "Conference Room C",
    user: "Tom Brown",
    time: "15:30 - 16:30",
    status: "Confirmed",
    department: "Finance",
  },
]

const roomStatuses = [
  { room: "Conference Room A", location: "Floor 1", status: "Occupied", nextAvailable: "10:30 AM", capacity: 12 },
  { room: "Meeting Room B", location: "Floor 1", status: "Available", nextAvailable: "Now", capacity: 6 },
  { room: "Board Room", location: "Floor 2", status: "Available", nextAvailable: "Now", capacity: 20 },
  { room: "Training Room", location: "Floor 2", status: "Occupied", nextAvailable: "12:00 PM", capacity: 30 },
  { room: "Conference Room C", location: "Floor 3", status: "Maintenance", nextAvailable: "2:00 PM", capacity: 8 },
  { room: "Meeting Room D", location: "Floor 3", status: "Available", nextAvailable: "Now", capacity: 4 },
]

export function DashboardOverview() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Occupied":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Maintenance":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your conference rooms today.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Room Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">284</div>
            <p className="text-xs text-muted-foreground">+18 new this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Room Utilization This Week</CardTitle>
            <CardDescription>Daily utilization percentage across all rooms</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="utilization" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Room Status</CardTitle>
            <CardDescription>Current status of all rooms</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roomStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {roomStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {roomStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peak Hours Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Peak Booking Hours</CardTitle>
          <CardDescription>Number of bookings by hour of the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Real-time Room Status */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Room Status</CardTitle>
          <CardDescription>Current availability and next available time for all rooms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roomStatuses.map((room, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{room.room}</h3>
                  <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{room.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>Capacity: {room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Next: {room.nextAvailable}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest booking activities and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.room}</TableCell>
                  <TableCell>{booking.user}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>{booking.department}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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
