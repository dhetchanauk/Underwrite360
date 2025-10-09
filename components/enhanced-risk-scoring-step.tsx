"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppState } from "@/lib/enhanced-state-context"
import { calculateUnderwritingScore, getTierRecommendation, getScoreDrivers } from "@/lib/data-simulation"
import { useEffect, useState } from "react"

export default function EnhancedRiskScoringStep() {
  const { setCurrentStep, setCompletedStep, submissionData, riskData, testScenario, setUnderwritingScore } =
    useAppState()
  const [score, setScore] = useState(0)
  const [tier, setTier] = useState<"Preferred" | "Standard" | "Non-Standard">("Standard")
  const [scoreDrivers, setScoreDrivers] = useState<ReturnType<typeof getScoreDrivers>>([])

  useEffect(() => {
    if (submissionData && riskData) {
      const calculatedScore = calculateUnderwritingScore(submissionData, riskData)
      const tierRecommendation = getTierRecommendation(calculatedScore)
      const drivers = getScoreDrivers(submissionData, riskData)

      setScore(calculatedScore)
      setTier(tierRecommendation)
      setScoreDrivers(drivers)
      setUnderwritingScore(calculatedScore)
    }
  }, [submissionData, riskData, testScenario, setUnderwritingScore])

  const handleNext = () => {
    setCompletedStep(5) // Mark Risk Scoring as complete
    setCurrentStep(6) // Move to What-If
  }

  const getScoreCategory = (score: number) => {
    if (score < 40) return "Preferred"
    if (score < 60) return "Standard"
    if (score < 75) return "Substandard"
    return "Refer/Decline"
  }

  const getScoreColor = (score: number) => {
    if (score < 40) return "text-green-600"
    if (score < 60) return "text-blue-600"
    if (score < 75) return "text-orange-600"
    return "text-red-600"
  }

  const getGaugeColor = (score: number) => {
    if (score < 40) return "#22c55e"
    if (score < 60) return "#3b82f6"
    if (score < 75) return "#f59e0b"
    return "#ef4444"
  }

  const scoreCategory = getScoreCategory(score)

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Risk Scoring & Tiering</h2>
      <p className="text-gray-600">
        Assessing the overall risk profile for{" "}
        <span className="font-semibold text-blue-700">{submissionData?.namedInsured || "selected company"}</span> and
        recommending an appropriate underwriting tier.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>
                Underwriting Score Gauge (0–100) - {submissionData?.namedInsured || "Selected Company"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
              <div className="relative w-64 h-32 overflow-hidden">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Background arc */}
                  <path d="M 20 80 A 80 80 0 0 1 180 80" fill="none" stroke="#e5e7eb" strokeWidth="16" />
                  {/* Score arc */}
                  <path
                    d="M 20 80 A 80 80 0 0 1 180 80"
                    fill="none"
                    stroke={getGaugeColor(score)}
                    strokeWidth="16"
                    strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                    className="transition-all duration-1000 ease-out"
                  />
                  {/* Score text */}
                  <text x="100" y="70" textAnchor="middle" className="text-3xl font-bold fill-gray-800">
                    {score}
                  </text>
                </svg>
              </div>
              <div className="flex justify-between w-full max-w-xs text-xs font-medium text-gray-500">
                <span>0</span>
                <span>39</span>
                <span>59</span>
                <span>74</span>
                <span>100</span>
              </div>
              <div className="flex justify-between w-full max-w-xs text-xs font-medium">
                <span className="text-green-600">Preferred</span>
                <span className="text-blue-600">Standard</span>
                <span className="text-orange-600">Substandard</span>
                <span className="text-red-600">Refer/Decline</span>
              </div>
              <div className={`text-lg font-semibold ${getScoreColor(score)}`}>{scoreCategory}</div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Score Drivers (SHAP-style)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {scoreDrivers.map((driver, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="font-semibold text-gray-700">{driver.factor}:</span>
                      <span className="text-sm text-gray-600 ml-2">{driver.description}</span>
                    </div>
                    <Badge
                      variant={driver.impact > 0 ? "destructive" : "default"}
                      className={driver.impact > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}
                    >
                      {driver.impact > 0 ? "+" : ""}
                      {driver.impact}
                    </Badge>
                  </li>
                ))}
                {scoreDrivers.length === 0 && (
                  <li className="text-gray-500 text-center py-4">No significant risk factors identified</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Tier Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-32 space-y-3">
              <Badge
                className={`text-lg px-4 py-2 ${
                  tier === "Preferred"
                    ? "bg-green-100 text-green-700"
                    : tier === "Standard"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                }`}
              >
                {tier}
              </Badge>
              <p className="text-sm text-gray-600 text-center">
                Score of {score}
                {scoreDrivers.length > 0 &&
                  ` driven by ${scoreDrivers
                    .slice(0, 2)
                    .map((d) => d.factor.toLowerCase())
                    .join(" and ")}`}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Suggested Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {score >= 60 && (
                <Badge variant="secondary" className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100">
                  Increase deductible
                </Badge>
              )}
              {score >= 50 && (
                <Badge variant="secondary" className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100">
                  Add exclusion
                </Badge>
              )}
              {riskData?.telematicsData.harshBrakingPercent && riskData.telematicsData.harshBrakingPercent > 5 && (
                <Badge variant="secondary" className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100">
                  Require telematics
                </Badge>
              )}
              {scoreDrivers.some((d) => d.factor.includes("MVR")) && (
                <Badge variant="secondary" className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100">
                  Driver training
                </Badge>
              )}
              {score >= 70 && (
                <Badge variant="secondary" className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100">
                  Protective safeguards
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Score Bands</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>0–39:</span>
                <span className="text-green-600 font-medium">Preferred</span>
              </div>
              <div className="flex justify-between">
                <span>40–59:</span>
                <span className="text-blue-600 font-medium">Standard</span>
              </div>
              <div className="flex justify-between">
                <span>60–74:</span>
                <span className="text-orange-600 font-medium">Substandard</span>
              </div>
              <div className="flex justify-between">
                <span>75+:</span>
                <span className="text-red-600 font-medium">Refer/Decline</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          Continue to What-If Analysis
        </Button>
      </div>
    </div>
  )
}
