"use client"

import { useState } from "react"
import { Calendar, Users, Settings, BarChart3, Building2, Package, ArrowLeft, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DashboardOverview } from "./dashboard-overview"
import { RoomManagement } from "./room-management"
import { BookingManagement } from "./booking-management"
import { UserManagement } from "./user-management"
import { ResourceManagement } from "./resource-management"
import { ReportsAnalytics } from "./reports-analytics"
import { SettingsPage } from "./settings-page"

interface AdminDashboardProps {
  onBack: () => void
}

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: BarChart3 },
  { id: "rooms", title: "Room Management", icon: Building2 },
  { id: "bookings", title: "Booking Management", icon: Calendar },
  { id: "users", title: "User Management", icon: Users },
  { id: "resources", title: "Resource Management", icon: Package },
  { id: "reports", title: "Reports & Analytics", icon: BarChart3 },
  { id: "settings", title: "Settings", icon: Settings },
]

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { theme, setTheme } = useTheme()

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />
      case "rooms":
        return <RoomManagement />
      case "bookings":
        return <BookingManagement />
      case "users":
        return <UserManagement />
      case "resources":
        return <ResourceManagement />
      case "reports":
        return <ReportsAnalytics />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="font-semibold">ConferenceHub</h2>
              <p className="text-xs text-muted-foreground">Admin Portal</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={activeTab === item.id} onClick={() => setActiveTab(item.id)}>
                      <button className="w-full flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                    A
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@company.com</p>
                  </div>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 flex-1">
            <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </header>

        <main className="flex-1 p-6">{renderContent()}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
