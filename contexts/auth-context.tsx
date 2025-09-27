"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = () => {
      const userData = localStorage.getItem("buyit_user")
      if (userData) {
        try {
          const user = JSON.parse(userData)
          setState({
            user,
            isLoading: false,
            isAuthenticated: true,
          })
        } catch {
          localStorage.removeItem("buyit_user")
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          })
        }
      } else {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - in real app, this would be an API call
      if (email && password.length >= 6) {
        const user: User = {
          id: Date.now().toString(),
          email,
          firstName: "John",
          lastName: "Doe",
        }

        localStorage.setItem("buyit_user", JSON.stringify(user))
        setState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const signup = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock registration - in real app, this would be an API call
      if (email && password.length >= 6 && firstName && lastName) {
        const user: User = {
          id: Date.now().toString(),
          email,
          firstName,
          lastName,
        }

        localStorage.setItem("buyit_user", JSON.stringify(user))
        setState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("buyit_user")
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      if (state.user) {
        const updatedUser = { ...state.user, ...data }
        localStorage.setItem("buyit_user", JSON.stringify(updatedUser))
        setState((prev) => ({
          ...prev,
          user: updatedUser,
        }))
        return true
      }
      return false
    } catch {
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
