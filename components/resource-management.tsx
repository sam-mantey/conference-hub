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
import { Plus, Search, Edit, Trash2, Eye, Monitor, Wifi, Camera, Mic } from "lucide-react"

const resources = [
  {
    id: 1,
    name: "4K Projector - Sony VPL-VW295ES",
    type: "Projector",
    location: "Conference Room A",
    status: "Available",
    condition: "Excellent",
    serialNumber: "SNY-001-2023",
    purchaseDate: "2023-01-15",
    warranty: "2025-01-15",
    description: "High-end 4K HDR projector with laser light source",
  },
  {
    id: 2,
    name: "Wireless Presentation System",
    type: "Video Conferencing",
    location: "Meeting Room B",
    status: "In Use",
    condition: "Good",
    serialNumber: "WPS-002-2023",
    purchaseDate: "2023-03-20",
    warranty: "2026-03-20",
    description: "Wireless screen sharing and presentation system",
  },
  {
    id: 3,
    name: "Interactive Whiteboard - Smart Board",
    type: "Whiteboard",
    location: "Training Room",
    status: "Maintenance",
    condition: "Fair",
    serialNumber: "SB-003-2022",
    purchaseDate: "2022-08-10",
    warranty: "2024-08-10",
    description: "75-inch interactive whiteboard with touch capability",
  },
  {
    id: 4,
    name: "Conference Microphone System",
    type: "Audio",
    location: "Board Room",
    status: "Available",
    condition: "Excellent",
    serialNumber: "MIC-004-2023",
    purchaseDate: "2023-05-12",
    warranty: "2026-05-12",
    description: "Professional conference microphone with noise cancellation",
  },
  {
    id: 5,
    name: "65-inch 4K Display",
    type: "Display",
    location: "Conference Room C",
    status: "Available",
    condition: "Good",
    serialNumber: "DSP-005-2023",
    purchaseDate: "2023-02-28",
    warranty: "2026-02-28",
    description: "Ultra HD display for presentations and video conferencing",
  },
  {
    id: 6,
    name: "Wireless Router - Enterprise Grade",
    type: "Network",
    location: "Floor 2 - IT Closet",
    status: "Available",
    condition: "Excellent",
    serialNumber: "RTR-006-2023",
    purchaseDate: "2023-04-05",
    warranty: "2028-04-05",
    description: "High-performance wireless router for conference rooms",
  },
]

const resourceRequests = [
  {
    id: 1,
    user: "John Smith",
    resource: "Portable Projector",
    room: "Conference Room A",
    date: "2024-01-16",
    time: "14:00-16:00",
    status: "Pending",
    purpose: "Client Presentation",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    resource: "Wireless Microphone",
    room: "Training Room",
    date: "2024-01-17",
    time: "09:00-12:00",
    status: "Approved",
    purpose: "Training Session",
  },
  {
    id: 3,
    user: "Mike Davis",
    resource: "Video Camera",
    room: "Board Room",
    date: "2024-01-18",
    time: "10:00-11:00",
    status: "Pending",
    purpose: "Board Meeting Recording",
  },
]

export function ResourceManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedResource, setSelectedResource] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("inventory")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Use":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Maintenance":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Reserved":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Good":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Fair":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Poor":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "projector":
        return <Monitor className="h-4 w-4" />
      case "display":
        return <Monitor className="h-4 w-4" />
      case "video conferencing":
        return <Camera className="h-4 w-4" />
      case "audio":
        return <Mic className="h-4 w-4" />
      case "network":
        return <Wifi className="h-4 w-4" />
      case "whiteboard":
        return <Monitor className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || resource.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || resource.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesType && matchesStatus
  })

  const ResourceForm = ({ resource, onClose }: { resource?: any; onClose: () => void }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Resource Name</Label>
          <Input id="name" defaultValue={resource?.name} placeholder="Enter resource name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select defaultValue={resource?.type}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Projector">Projector</SelectItem>
              <SelectItem value="Display">Display</SelectItem>
              <SelectItem value="Video Conferencing">Video Conferencing</SelectItem>
              <SelectItem value="Audio">Audio</SelectItem>
              <SelectItem value="Network">Network</SelectItem>
              <SelectItem value="Whiteboard">Whiteboard</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" defaultValue={resource?.location} placeholder="Room or location" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="serialNumber">Serial Number</Label>
          <Input id="serialNumber" defaultValue={resource?.serialNumber} placeholder="Serial number" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={resource?.status || "Available"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="In Use">In Use</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Reserved">Reserved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="condition">Condition</Label>
          <Select defaultValue={resource?.condition || "Good"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Excellent">Excellent</SelectItem>
              <SelectItem value="Good">Good</SelectItem>
              <SelectItem value="Fair">Fair</SelectItem>
              <SelectItem value="Poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase Date</Label>
          <Input id="purchaseDate" type="date" defaultValue={resource?.purchaseDate} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="warranty">Warranty Expiry</Label>
        <Input id="warranty" type="date" defaultValue={resource?.warranty} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          defaultValue={resource?.description}
          placeholder="Resource description and specifications"
        />
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Management</h1>
          <p className="text-muted-foreground">Manage equipment inventory, requests, and maintenance schedules.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Inventory</Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>Add a new equipment or resource to the inventory.</DialogDescription>
              </DialogHeader>
              <ResourceForm onClose={() => setIsAddDialogOpen(false)} />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Add Resource</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b">
        <Button variant={activeTab === "inventory" ? "default" : "ghost"} onClick={() => setActiveTab("inventory")}>
          Equipment Inventory
        </Button>
        <Button variant={activeTab === "requests" ? "default" : "ghost"} onClick={() => setActiveTab("requests")}>
          Resource Requests
        </Button>
      </div>

      {activeTab === "inventory" && (
        <>
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
                      placeholder="Search by name, location, or serial number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="projector">Projector</SelectItem>
                    <SelectItem value="display">Display</SelectItem>
                    <SelectItem value="video conferencing">Video Conferencing</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                    <SelectItem value="whiteboard">Whiteboard</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="in use">In Use</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Resources Table */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Inventory ({filteredResources.length})</CardTitle>
              <CardDescription>Manage your equipment and resource inventory.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Warranty</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{resource.name}</div>
                          <div className="text-sm text-muted-foreground">{resource.serialNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(resource.type)}
                          <span>{resource.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{resource.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(resource.status)}>{resource.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getConditionColor(resource.condition)}>{resource.condition}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(resource.warranty) > new Date() ? (
                            <span className="text-green-600">Valid until {resource.warranty}</span>
                          ) : (
                            <span className="text-red-600">Expired</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog
                            open={isViewDialogOpen && selectedResource?.id === resource.id}
                            onOpenChange={(open) => {
                              setIsViewDialogOpen(open)
                              if (!open) setSelectedResource(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedResource(resource)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{resource.name}</DialogTitle>
                                <DialogDescription>Resource details and specifications</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Type</Label>
                                    <div className="flex items-center gap-2 mt-1">
                                      {getTypeIcon(resource.type)}
                                      <span className="text-sm">{resource.type}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Serial Number</Label>
                                    <p className="text-sm text-muted-foreground">{resource.serialNumber}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Location</Label>
                                    <p className="text-sm text-muted-foreground">{resource.location}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Purchase Date</Label>
                                    <p className="text-sm text-muted-foreground">{resource.purchaseDate}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    <Badge className={getStatusColor(resource.status)}>{resource.status}</Badge>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Condition</Label>
                                    <Badge className={getConditionColor(resource.condition)}>
                                      {resource.condition}
                                    </Badge>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Warranty</Label>
                                    <p className="text-sm text-muted-foreground">{resource.warranty}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Description</Label>
                                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog
                            open={isEditDialogOpen && selectedResource?.id === resource.id}
                            onOpenChange={(open) => {
                              setIsEditDialogOpen(open)
                              if (!open) setSelectedResource(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedResource(resource)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Resource</DialogTitle>
                                <DialogDescription>Update resource information and status.</DialogDescription>
                              </DialogHeader>
                              <ResourceForm resource={resource} onClose={() => setIsEditDialogOpen(false)} />
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
        </>
      )}

      {activeTab === "requests" && (
        <Card>
          <CardHeader>
            <CardTitle>Resource Requests</CardTitle>
            <CardDescription>Manage equipment requests from users for their bookings.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resourceRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.user}</TableCell>
                    <TableCell>{request.resource}</TableCell>
                    <TableCell>{request.room}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.date}</div>
                        <div className="text-sm text-muted-foreground">{request.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>{request.purpose}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {request.status === "Pending" && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive">
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
