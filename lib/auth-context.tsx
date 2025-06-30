"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { User, authenticateUser, getUserByEmail } from "@/lib/api/users"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const loadSavedUser = async () => {
      const savedUserId = localStorage.getItem("conferenceHubUserId")
      if (savedUserId) {
        try {
          // Fetch the latest user data from our API
          const email = localStorage.getItem("conferenceHubUserEmail")
          if (email) {
            const userData = await getUserByEmail(email)
            if (userData && userData.status === 'active') {
              setUser(userData)
            } else {
              // User no longer exists or is inactive
              localStorage.removeItem("conferenceHubUserId")
              localStorage.removeItem("conferenceHubUserEmail")
            }
          }
        } catch (e) {
          console.error("Error loading saved user:", e)
          localStorage.removeItem("conferenceHubUserId")
          localStorage.removeItem("conferenceHubUserEmail")
        }
      }
      setIsLoading(false)
    }

    loadSavedUser()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const authenticatedUser = await authenticateUser(email, password)
      
      if (authenticatedUser) {
        setUser(authenticatedUser)
        localStorage.setItem("conferenceHubUserId", authenticatedUser.id)
        localStorage.setItem("conferenceHubUserEmail", authenticatedUser.email)
        return true
      }
      
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("conferenceHubUserId")
    localStorage.removeItem("conferenceHubUserEmail")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 