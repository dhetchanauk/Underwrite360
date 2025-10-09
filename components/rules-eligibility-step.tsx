"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { useAppState } from "@/lib/state-context"
import StatusChip from "@/components/ui/status-chip"

export default function RulesEligibilityStep() {
  const { setCurrentStep, setCompletedStep } = useAppState()

  const handleNext = () => {
    setCompletedStep(4) // Mark Rules & Eligibility as complete
    setCurrentStep(5) // Move to Risk Scoring
  }

  const eligibilityResult = "Conditional" // Simulated result for now
  const showMissingDataHelper = false // Simulated condition

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Rules & Eligibility</h2>
      <p className="text-gray-600">Evaluating the submission against predefined underwriting rules and criteria.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Rules Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      Radius ≤ 300 mi — <Badge variant="success">Pass</Badge>
                    </p>
                    <p className="text-sm text-gray-600">Vehicle garaging radius is within acceptable limits.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      Roof age ≤ 15 yrs — <Badge variant="warning">Conditional</Badge>
                    </p>
                    <p className="text-sm text-gray-600">Roof age is 18 years; needs endorsement for full coverage.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      Prior DUI within 3 yrs — <Badge variant="destructive">Fail</Badge>
                    </p>
                    <p className="text-sm text-gray-600">Driver with DUI conviction in the last 2 years detected.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      Vehicle age ≤ 10 yrs — <Badge variant="success">Pass</Badge>
                    </p>
                    <p className="text-sm text-gray-600">All vehicles are within the acceptable age range.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {showMissingDataHelper && (
            <Card className="shadow-md rounded-xl bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Missing Data Helper</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-yellow-700">
                  Detected missing driver license numbers. Please request updated driver lists or individual DL#s.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Eligibility Result</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-24">
              <StatusChip status={eligibilityResult} />
            </CardContent>
          </Card>

          {eligibilityResult === "Decline" && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <p className="font-bold">
                Hard rule fail detected (e.g., prior DUI {"<"} 3 yrs). Recommend Refer/Decline.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          Next ➜ Risk & Tiering
        </Button>
      </div>
    </div>
  )
}
