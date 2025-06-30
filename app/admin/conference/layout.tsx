"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Users, Settings, BarChart3, Building2, Package, ArrowLeft, Moon, Sun, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useAuth } from "@/lib/auth-context"
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

interface ConferenceLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  { 
    id: "dashboard", 
    title: "Dashboard", 
    icon: BarChart3, 
    href: "/admin/conference"
  },
  { 
    id: "rooms", 
    title: "Rooms", 
    icon: Building2, 
    href: "/admin/conference/rooms"
  },
  { 
    id: "bookings", 
    title: "Bookings", 
    icon: Calendar, 
    href: "/admin/conference/bookings"
  },
  { 
    id: "users", 
    title: "Users", 
    icon: Users, 
    href: "/admin/conference/users"
  },
  { 
    id: "resources", 
    title: "Resources", 
    icon: Package, 
    href: "/admin/conference/resources"
  },
  { 
    id: "reports", 
    title: "Reports", 
    icon: BarChart3, 
    href: "/admin/conference/reports"
  },
  { 
    id: "settings", 
    title: "Settings", 
    icon: Settings, 
    href: "/admin/conference/settings"
  },
]

export default function ConferenceLayout({ children }: ConferenceLayoutProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { logout, user } = useAuth()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="font-semibold">ConferenceHub</h2>
              <p className="text-xs text-muted-foreground">Conference Management</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.href} className="w-full flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
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
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || 'admin@company.com'}</p>
                  </div>
                </div>
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 flex-1">
            <Button variant="ghost" size="sm" asChild className="flex items-center gap-2">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4" />
                Back to Admin
              </Link>
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
} 