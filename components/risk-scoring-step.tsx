"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppState } from "@/lib/state-context"

export default function RiskScoringStep() {
  const { setCurrentStep, setCompletedStep } = useAppState()

  const handleNext = () => {
    setCompletedStep(5) // Mark Risk Scoring as complete
    setCurrentStep(6) // Move to What-If
  }

  const underwritingScore = 68 // Simulated score
  const tierRecommendation = "Non-Std" // Simulated tier

  const getScoreCategory = (score: number) => {
    if (score < 40) return "Preferred"
    if (score < 60) return "Standard"
    if (score < 75) return "Substandard"
    return "Refer/Decline"
  }

  const scoreCategory = getScoreCategory(underwritingScore)

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Risk Scoring & Tiering</h2>
      <p className="text-gray-600">
        Assessing the overall risk profile and recommending an appropriate underwriting tier.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Underwriting Score Gauge</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
              <div className="relative w-48 h-24 overflow-hidden">
                <div className="absolute inset-0 flex items-end justify-center">
                  <div
                    className="w-48 h-48 rounded-full border-[16px] border-gray-200"
                    style={{
                      transform: "rotate(45deg)",
                      clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(
                          #22c55e 0% 40%,
                          #3b82f6 40% 60%,
                          #f59e0b 60% 75%,
                          #ef4444 75% 100%
                        )`,
                        transform: `rotate(${underwritingScore * 1.8 - 90}deg)`, // 0-100 maps to 0-180 deg, offset by -90 for half circle
                        transformOrigin: "center",
                        transition: "transform 1s ease-out",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-white border border-gray-300 z-10"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-4xl font-bold text-gray-800 z-20">
                  {underwritingScore}
                </div>
              </div>
              <div className="flex justify-between w-full max-w-xs text-xs font-medium text-gray-500 mt-2">
                <span>0</span>
                <span>39</span>
                <span>59</span>
                <span>74</span>
                <span>100</span>
              </div>
              <div className="flex justify-between w-full max-w-xs text-xs font-medium text-gray-700">
                <span className="text-green-600">Preferred</span>
                <span className="text-blue-600">Standard</span>
                <span className="text-orange-600">Substandard</span>
                <span className="text-red-600">Refer/Decline</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Explain Score</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <span className="font-semibold">MVR violations:</span> <Badge variant="destructive">+14</Badge>{" "}
                  (Multiple minor violations)
                </li>
                <li>
                  <span className="font-semibold">Telematics harsh events:</span>{" "}
                  <Badge variant="destructive">+10</Badge> (Frequent hard braking)
                </li>
                <li>
                  <span className="font-semibold">Credit band:</span> <Badge variant="success">-6</Badge> (Excellent
                  credit score)
                </li>
                <li>
                  <span className="font-semibold">Territory factor:</span> <Badge variant="destructive">+8</Badge>{" "}
                  (High-risk garaging ZIP)
                </li>
                <li>
                  <span className="font-semibold">Loss frequency:</span> <Badge variant="destructive">+12</Badge> (One
                  prior loss in 2 years)
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Tier Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-24 space-y-2">
              <Badge
                className="text-lg px-4 py-2"
                variant={
                  tierRecommendation === "Preferred"
                    ? "success"
                    : tierRecommendation === "Standard"
                      ? "default"
                      : "destructive"
                }
              >
                {tierRecommendation}
              </Badge>
              <p className="text-sm text-gray-600 text-center">
                Rationale: Score of {underwritingScore} driven by MVR and Telematics, offset by good credit.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Suggested Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100">
                Increase deductible
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100">
                Add exclusion
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100">
                Require training/telematics
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100">
                Protective safeguards
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          Next ➜ What-If
        </Button>
      </div>
    </div>
  )
}
