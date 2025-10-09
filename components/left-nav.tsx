"use client"

import { useAppState } from "@/lib/enhanced-state-context"
import { cn } from "@/lib/utils"
import { CheckCircle2, Circle } from "lucide-react"
import Image from "next/image"

const steps = [
  "Overview",
  "Company Selection",
  "Doc Parsing & Prefill",
  "Risk Data Pull (3rd-party)",
  "Risk Assessment & Scoring",
  "Final Review & Summary",
  "Quote & Bind",
]

export default function LeftNavigation() {
  const { currentStep, setCurrentStep, completedSteps } = useAppState()

  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col border-r border-gray-200">
      <div className="mb-8 flex items-center justify-center">
        <Image src="/trigent-logo.svg" alt="Company Logo" width={150} height={45} className="h-auto" />
      </div>
      <nav className="flex-1">
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={step}>
              <button
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "flex items-center w-full text-left p-2 rounded-lg transition-colors duration-200",
                  index === currentStep
                    ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                  completedSteps.has(index) && "text-green-700",
                )}
              >
                {completedSteps.has(index) ? (
                  <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" />
                ) : (
                  <Circle className={cn("w-5 h-5 mr-3", index === currentStep ? "text-blue-500" : "text-gray-400")} />
                )}
                <span className="text-sm">{step}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  )
}
