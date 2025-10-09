"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppState } from "@/lib/enhanced-state-context"
import { CheckCircle, AlertTriangle, TrendingUp, TrendingDown, Scale, Target, FileText } from "lucide-react"

export default function CombinedRiskAssessmentStep() {
  const { setCurrentStep, setCompletedStep } = useAppState()

  const handleNext = () => {
    setCompletedStep(4) // Mark Risk Assessment & Scoring as complete
    setCurrentStep(5) // Move to Recommendations & Actions
  }

  // Rules Evaluation - These are underwriting rules that determine eligibility
  const rulesResults = [
    {
      rule: "DUI History Check",
      status: "Pass",
      icon: CheckCircle,
      color: "text-green-600",
      description: "No DUI convictions within 36 months",
      rationale: "Clean MVR record - no DUI violations found",
    },
    {
      rule: "Operating Radius Limit",
      status: "Pass",
      icon: CheckCircle,
      color: "text-green-600",
      description: "Vehicle operating radius ≤ 300 miles",
      rationale: "Maximum radius of 150 miles is within acceptable limits",
    },
    {
      rule: "Vehicle Age Limit",
      status: "Conditional",
      icon: AlertTriangle,
      color: "text-yellow-600",
      description: "Vehicles must be ≤ 15 years old",
      rationale: "1 vehicle exceeds age limit - requires higher deductible",
    },
    {
      rule: "Loss Frequency Check",
      status: "Conditional",
      icon: AlertTriangle,
      color: "text-yellow-600",
      description: "Maximum 2 losses in 36 months",
      rationale: "2 losses found - within limit but requires monitoring",
    },
    {
      rule: "Business Credit Check",
      status: "Pass",
      icon: CheckCircle,
      color: "text-green-600",
      description: "Minimum credit score requirements",
      rationale: "Credit score of 720 exceeds minimum threshold",
    },
    {
      rule: "Safety Program Verification",
      status: "Pass",
      icon: CheckCircle,
      color: "text-green-600",
      description: "Documented safety and training program",
      rationale: "Comprehensive safety program documented and verified",
    },
  ]

  // Risk Scoring - Quantitative assessment of risk factors
  const riskScore = 58
  const scoreDrivers = [
    {
      factor: "MVR Violations",
      impact: "+12",
      trend: TrendingUp,
      color: "text-red-600",
      description: "6 total points across all drivers",
    },
    {
      factor: "Prior Losses",
      impact: "+16",
      trend: TrendingUp,
      color: "text-red-600",
      description: "2 losses totaling $23,500 in 36 months",
    },
    {
      factor: "Territory Factor",
      impact: "+3",
      trend: TrendingUp,
      color: "text-orange-600",
      description: "Moderate risk territory with 1.05 multiplier",
    },
    {
      factor: "Credit Rating",
      impact: "-8",
      trend: TrendingDown,
      color: "text-green-600",
      description: "Excellent credit score provides discount",
    },
    {
      factor: "Safety Program",
      impact: "-5",
      trend: TrendingDown,
      color: "text-green-600",
      description: "Documented safety program reduces risk",
    },
  ]

  const getScoreCategory = (score: number) => {
    if (score < 40) return { label: "Preferred", color: "text-green-600", bg: "bg-green-50" }
    if (score < 60) return { label: "Standard", color: "text-blue-600", bg: "bg-blue-50" }
    if (score < 75) return { label: "Substandard", color: "text-orange-600", bg: "bg-orange-50" }
    return { label: "Refer/Decline", color: "text-red-600", bg: "bg-red-50" }
  }

  const scoreCategory = getScoreCategory(riskScore)

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Risk Assessment & Scoring</h2>
      <p className="text-gray-600">
        Comprehensive evaluation of underwriting rules, quantitative risk scoring, and final assessment results.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rules Evaluation */}
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              Rules Evaluation
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Assessment of underwriting eligibility rules and compliance requirements
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {rulesResults.map((rule, index) => {
              const IconComponent = rule.icon
              return (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-5 h-5 ${rule.color}`} />
                      <span className="font-medium text-gray-900">{rule.rule}</span>
                    </div>
                    <Badge
                      className={
                        rule.status === "Pass"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : rule.status === "Conditional"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                      }
                    >
                      {rule.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{rule.description}</p>
                  <p className="text-sm text-gray-700">{rule.rationale}</p>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Risk Scoring */}
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Risk Scoring
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Quantitative risk assessment based on data analysis and predictive modeling
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${scoreCategory.color} mb-2`}>{riskScore}</div>
              <div className="text-sm text-gray-600 mb-4">Underwriting Score (out of 100)</div>
              <Progress value={riskScore} className="h-3 mb-2" />
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${scoreCategory.bg} ${scoreCategory.color}`}
              >
                {scoreCategory.label}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Score Drivers (SHAP Analysis)</h4>
              {scoreDrivers.map((driver, index) => {
                const TrendIcon = driver.trend
                return (
                  <div key={index} className="p-3 bg-gray-50 rounded border">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <TrendIcon className={`w-4 h-4 ${driver.color}`} />
                        <span className="text-sm font-medium text-gray-700">{driver.factor}</span>
                      </div>
                      <span className={`text-sm font-bold ${driver.color}`}>{driver.impact}</span>
                    </div>
                    <p className="text-xs text-gray-600">{driver.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Results */}
      <Card className="shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Assessment Results
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Final underwriting decision based on rules evaluation and risk scoring analysis
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700 mb-1">Standard</div>
            <div className="text-sm text-blue-600 mb-1">Eligibility Result</div>
            <div className="text-xs text-gray-600">Acceptable with standard terms</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700 mb-1">Standard</div>
            <div className="text-sm text-blue-600 mb-1">Tier Recommendation</div>
            <div className="text-xs text-gray-600">Score: {riskScore}/100</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-700 mb-1">2</div>
            <div className="text-sm text-yellow-600 mb-1">Conditional Items</div>
            <div className="text-xs text-gray-600">Require special attention</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700 mb-1">Approved</div>
            <div className="text-sm text-green-600 mb-1">Final Decision</div>
            <div className="text-xs text-gray-600">Proceed to recommendations</div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          Recommendations & Actions
        </Button>
      </div>
    </div>
  )
}
