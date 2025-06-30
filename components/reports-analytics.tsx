"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Download, TrendingUp, TrendingDown, Users, Clock, Building2, CalendarDays } from "lucide-react"
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
  AreaChart,
  Area,
} from "recharts"
import { format } from "date-fns"
import { useState } from "react"

const utilizationData = [
  { month: "Jan", utilization: 78, bookings: 145 },
  { month: "Feb", utilization: 82, bookings: 167 },
  { month: "Mar", utilization: 85, bookings: 189 },
  { month: "Apr", utilization: 79, bookings: 156 },
  { month: "May", utilization: 88, bookings: 203 },
  { month: "Jun", utilization: 92, bookings: 234 },
  { month: "Jul", utilization: 87, bookings: 198 },
  { month: "Aug", utilization: 83, bookings: 176 },
  { month: "Sep", utilization: 89, bookings: 212 },
  { month: "Oct", utilization: 91, bookings: 225 },
  { month: "Nov", utilization: 86, bookings: 187 },
  { month: "Dec", utilization: 84, bookings: 178 },
]

const peakHoursData = [
  { hour: "8AM", bookings: 12, utilization: 45 },
  { hour: "9AM", bookings: 25, utilization: 78 },
  { hour: "10AM", bookings: 35, utilization: 89 },
  { hour: "11AM", bookings: 28, utilization: 82 },
  { hour: "12PM", bookings: 15, utilization: 56 },
  { hour: "1PM", bookings: 18, utilization: 67 },
  { hour: "2PM", bookings: 32, utilization: 85 },
  { hour: "3PM", bookings: 38, utilization: 92 },
  { hour: "4PM", bookings: 22, utilization: 73 },
  { hour: "5PM", bookings: 8, utilization: 34 },
  { hour: "6PM", bookings: 5, utilization: 23 },
]

const roomPopularityData = [
  { name: "Conference Room A", bookings: 89, utilization: 92, color: "#3b82f6" },
  { name: "Board Room", bookings: 67, utilization: 85, color: "#10b981" },
  { name: "Training Room", bookings: 54, utilization: 78, color: "#f59e0b" },
  { name: "Meeting Room B", bookings: 43, utilization: 71, color: "#ef4444" },
  { name: "Conference Room C", bookings: 38, utilization: 65, color: "#8b5cf6" },
  { name: "Meeting Room D", bookings: 29, utilization: 58, color: "#06b6d4" },
]

const departmentUsageData = [
  { department: "Engineering", bookings: 145, percentage: 28 },
  { department: "Sales", bookings: 123, percentage: 24 },
  { department: "Marketing", bookings: 98, percentage: 19 },
  { department: "HR", bookings: 67, percentage: 13 },
  { department: "Finance", bookings: 45, percentage: 9 },
  { department: "Operations", bookings: 34, percentage: 7 },
]

const noShowData = [
  { month: "Jan", noShows: 12, totalBookings: 145, rate: 8.3 },
  { month: "Feb", noShows: 15, totalBookings: 167, rate: 9.0 },
  { month: "Mar", noShows: 18, totalBookings: 189, rate: 9.5 },
  { month: "Apr", noShows: 14, totalBookings: 156, rate: 9.0 },
  { month: "May", noShows: 16, totalBookings: 203, rate: 7.9 },
  { month: "Jun", noShows: 19, totalBookings: 234, rate: 8.1 },
]

export function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [reportType, setReportType] = useState("utilization")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into room utilization, booking patterns, and usage analytics.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utilization">Utilization Report</SelectItem>
              <SelectItem value="booking-trends">Booking Trends</SelectItem>
              <SelectItem value="department-usage">Department Usage</SelectItem>
              <SelectItem value="no-show-analysis">No-Show Analysis</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.7%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.3%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No-Show Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+0.8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Usage Hour</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3:00 PM</div>
            <p className="text-xs text-muted-foreground">92% utilization rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Room Utilization Trends</CardTitle>
            <CardDescription>Monthly utilization rates and booking volumes over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="utilization"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  name="Utilization %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peak Usage Hours</CardTitle>
            <CardDescription>Booking distribution throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#10b981" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Room Popularity and Department Usage */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Room Popularity</CardTitle>
            <CardDescription>Most frequently booked rooms and their utilization rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomPopularityData.map((room, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{room.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{room.bookings} bookings</Badge>
                      <span className="text-sm text-muted-foreground">{room.utilization}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${room.utilization}%`,
                        backgroundColor: room.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Usage</CardTitle>
            <CardDescription>Booking distribution across different departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="bookings"
                >
                  {departmentUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {departmentUsageData.map((dept, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }} />
                    <span>{dept.department}</span>
                  </div>
                  <span className="font-medium">{dept.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* No-Show Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>No-Show Analysis</CardTitle>
          <CardDescription>Track no-show rates and identify patterns to improve booking policies</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={noShowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} name="No-Show Rate %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Popular Room</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Conference Room A</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>89 bookings this month</p>
                <p>92% utilization rate</p>
                <p>Most used by Engineering team</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Peak Usage Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span className="font-medium">2:00 PM - 4:00 PM</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Highest booking density</p>
                <p>Average 35 concurrent bookings</p>
                <p>92% utilization during peak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Engineering</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>145 bookings this month</p>
                <p>28% of total usage</p>
                <p>Prefers Conference Room A</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
