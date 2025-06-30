"use client"

import { Calendar, Heart, Building2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function LandingPage() {
  const [currentView, setCurrentView] = useState<"landing" | "conference" | "health">("landing")

  if (currentView === "conference") {
    return <AdminDashboard onBack={() => setCurrentView("landing")} />
  }

  if (currentView === "health") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle>Health Management</CardTitle>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setCurrentView("landing")} className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">ConferenceHub</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Admin Portal</p>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Welcome, Administrator</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Administrative Dashboard</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your organization's resources and services from a centralized admin portal. Select a module below to
            get started.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Conference Room Booking Card */}
          <Card
            className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-blue-500 group"
            onClick={() => setCurrentView("conference")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-full w-fit group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                <Calendar className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Conference Room Booking
              </CardTitle>
              <CardDescription className="text-base">Manage meeting rooms, bookings, and resources</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                <li>• Room availability management</li>
                <li>• Booking scheduling & approval</li>
                <li>• User access control</li>
                <li>• Analytics & reporting</li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Access Dashboard</Button>
            </CardContent>
          </Card>

          {/* Health Management Card */}
          <Card
            className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-red-500 group"
            onClick={() => setCurrentView("health")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-red-100 dark:bg-red-900 rounded-full w-fit group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors">
                <Heart className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Health Management</CardTitle>
              <CardDescription className="text-base">Employee health and wellness administration</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                <li>• Health record management</li>
                <li>• Appointment scheduling</li>
                <li>• Wellness program tracking</li>
                <li>• Health analytics</li>
              </ul>
              <Button className="w-full bg-red-600 hover:bg-red-700">Coming Soon</Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-gray-900 dark:text-white">ConferenceHub</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Streamlining workspace management for modern organizations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>Email: admin@conferencehub.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Support: 24/7 Available</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>System Status</p>
                <p>Documentation</p>
                <p>Privacy Policy</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 ConferenceHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
