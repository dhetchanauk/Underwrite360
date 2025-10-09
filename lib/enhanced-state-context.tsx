"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { generateSubmissionId, getScenarioData, type SubmissionData, type RiskData } from "./data-simulation"

interface AppState {
  appStarted: boolean
  setAppStarted: (started: boolean) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  completedSteps: Set<number>
  setCompletedStep: (step: number) => void
  setCompletedSteps: (steps: Set<number>) => void
  submissionData: SubmissionData | null
  setSubmissionData: (data: SubmissionData) => void
  riskData: RiskData | null
  setRiskData: (data: RiskData) => void
  testScenario: string
  setTestScenario: (scenario: string) => void
  underwritingScore: number
  setUnderwritingScore: (score: number) => void
  eligibilityStatus: "Eligible" | "Conditional" | "Refer" | "Decline"
  setEligibilityStatus: (status: "Eligible" | "Conditional" | "Refer" | "Decline") => void
  resetAppState: () => void
}

const AppContext = createContext<AppState | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appStarted, setAppStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null)
  const [riskData, setRiskData] = useState<RiskData | null>(null)
  const [testScenario, setTestScenario] = useState("clean-risk")
  const [underwritingScore, setUnderwritingScore] = useState(0)
  const [eligibilityStatus, setEligibilityStatus] = useState<"Eligible" | "Conditional" | "Refer" | "Decline">(
    "Eligible",
  )
  const router = useRouter()

  // Initialize submission data when test scenario changes
  useEffect(() => {
    if (testScenario) {
      const scenarioData = getScenarioData(testScenario)
      const newSubmissionData: SubmissionData = {
        id: generateSubmissionId(),
        testScenario: testScenario as any,
        territory: 1.0,
        classFactor: 1.0,
        ...scenarioData,
      } as SubmissionData

      setSubmissionData(newSubmissionData)

      // Initialize risk data based on scenario
      const newRiskData: RiskData = {
        mvrData: {
          points: newSubmissionData.drivers?.reduce((sum, d) => sum + d.mvrPoints, 0) || 0,
          violations: [],
          dui: testScenario === "high-risk-driver",
        },
        creditBand: testScenario === "high-risk-driver" ? "C" : testScenario === "adverse-loss" ? "B" : "A",
        telematicsData: {
          harshBrakingPercent: testScenario === "high-risk-driver" ? 12 : 3,
          speedingPercent: testScenario === "high-risk-driver" ? 8 : 2,
          nightDrivingPercent: 15,
        },
        territoryFactor: newSubmissionData.territory || 1.0,
        perilScores: {
          hail: 3,
          wind: 2,
          flood: 1,
          crime: 4,
        },
      }

      setRiskData(newRiskData)
    }
  }, [testScenario])

  // Effect to handle initial load and redirect if app is not started
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAppStarted = localStorage.getItem("appStarted")
      const storedCurrentStep = localStorage.getItem("currentStep")
      const storedCompletedSteps = localStorage.getItem("completedSteps")
      const storedTestScenario = localStorage.getItem("testScenario")

      if (storedAppStarted === "true") {
        setAppStarted(true)
        if (storedCurrentStep) {
          setCurrentStep(Number.parseInt(storedCurrentStep, 10))
        }
        if (storedCompletedSteps) {
          setCompletedSteps(new Set(JSON.parse(storedCompletedSteps)))
        }
        if (storedTestScenario) {
          setTestScenario(storedTestScenario)
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("testScenario", testScenario)
    }
  }, [testScenario])

  // Auto-scroll to top when step changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [currentStep])

  const handleSetCompletedStep = (step: number) => {
    setCompletedSteps((prev) => new Set(prev).add(step))
  }

  const resetAppState = () => {
    setAppStarted(false)
    setCurrentStep(0)
    setCompletedSteps(new Set())
    setSubmissionData(null)
    setRiskData(null)
    setTestScenario("clean-risk")
    setUnderwritingScore(0)
    setEligibilityStatus("Eligible")

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("appStarted")
      localStorage.removeItem("currentStep")
      localStorage.removeItem("completedSteps")
      localStorage.removeItem("testScenario")
    }
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
        submissionData,
        setSubmissionData,
        riskData,
        setRiskData,
        testScenario,
        setTestScenario,
        underwritingScore,
        setUnderwritingScore,
        eligibilityStatus,
        setEligibilityStatus,
        resetAppState,
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
