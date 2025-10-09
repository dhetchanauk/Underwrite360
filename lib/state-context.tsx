"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AppState {
  appStarted: boolean
  setAppStarted: (started: boolean) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  completedSteps: Set<number>
  setCompletedStep: (step: number) => void
  setCompletedSteps: (steps: Set<number>) => void
}

const AppContext = createContext<AppState | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appStarted, setAppStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const router = useRouter()

  // Effect to handle initial load and redirect if app is not started
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAppStarted = localStorage.getItem("appStarted")
      const storedCurrentStep = localStorage.getItem("currentStep")
      const storedCompletedSteps = localStorage.getItem("completedSteps")

      if (storedAppStarted === "true") {
        setAppStarted(true)
        if (storedCurrentStep) {
          setCurrentStep(Number.parseInt(storedCurrentStep, 10))
        }
        if (storedCompletedSteps) {
          setCompletedSteps(new Set(JSON.parse(storedCompletedSteps)))
        }
        // If app is started but on root, redirect to dashboard
        if (window.location.pathname === "/") {
          router.replace("/dashboard")
        }
      } else {
        // If app is not started and not on root, redirect to root
        if (window.location.pathname !== "/") {
          router.replace("/")
        }
      }
    }
  }, [router])

  // Effects to persist state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("appStarted", String(appStarted))
    }
  }, [appStarted])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentStep", String(currentStep))
    }
  }, [currentStep])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("completedSteps", JSON.stringify(Array.from(completedSteps)))
    }
  }, [completedSteps])

  const handleSetCompletedStep = (step: number) => {
    setCompletedSteps((prev) => new Set(prev).add(step))
  }

  return (
    <AppContext.Provider
      value={{
        appStarted,
        setAppStarted,
        currentStep,
        setCurrentStep,
        completedSteps,
        setCompletedStep: handleSetCompletedStep,
        setCompletedSteps,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppState = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider")
  }
  return context
}
