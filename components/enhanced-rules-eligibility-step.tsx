"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"
import { useAppState } from "@/lib/enhanced-state-context"
import StatusChip from "@/components/ui/status-chip"
import { evaluateRules, getEligibilityStatus } from "@/lib/data-simulation"
import { useEffect, useState } from "react"
import RulesExplanationDialog from "./rules-explanation-dialog"

export default function EnhancedRulesEligibilityStep() {
  const { setCurrentStep, setCompletedStep, submissionData, riskData, testScenario, setEligibilityStatus } =
    useAppState()
  const [rules, setRules] = useState<ReturnType<typeof evaluateRules>>([])
  const [eligibility, setEligibility] = useState<"Eligible" | "Conditional" | "Refer" | "Decline">("Eligible")

  useEffect(() => {
    if (submissionData && riskData) {
      const evaluatedRules = evaluateRules(submissionData, riskData)
      setRules(evaluatedRules)

      // Calculate a basic score for eligibility determination
      const basicScore =
        testScenario === "high-risk-driver"
          ? 78
          : testScenario === "adverse-loss"
            ? 65
            : testScenario === "incomplete-docs"
              ? 45
              : 35

      const eligibilityResult = getEligibilityStatus(evaluatedRules, basicScore)
      setEligibility(eligibilityResult)
      setEligibilityStatus(eligibilityResult)
    }
  }, [submissionData, riskData, testScenario, setEligibilityStatus])

  const handleNext = () => {
    setCompletedStep(4) // Mark Rules & Eligibility as complete
    setCurrentStep(5) // Move to Risk Scoring
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "conditional":
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      case "fail":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pass":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Pass</Badge>
      case "conditional":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Conditional</Badge>
      case "fail":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Fail</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const showMissingDataHelper = testScenario === "incomplete-docs"
  const hasHardFails = rules.some((r) => r.status === "fail")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Rules & Eligibility</h2>
          <p className="text-gray-600">
            Evaluating{" "}
            <span className="font-semibold text-blue-700">{submissionData?.namedInsured || "selected company"}</span>{" "}
            against predefined underwriting rules and criteria.
          </p>
        </div>
        <RulesExplanationDialog />
      </div>

      {hasHardFails && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 mr-2" />
            <p className="font-bold">Hard rule fail detected (e.g., prior DUI &lt; 3 yrs). Recommend Refer/Decline.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Explainable Rule List - {submissionData?.namedInsured || "Selected Company"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    {getStatusIcon(rule.status)}
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{rule.rule}</p>
                        {getStatusBadge(rule.status)}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{rule.rationale}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {showMissingDataHelper && (
            <Card className="shadow-md rounded-xl bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Missing Data Helper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-yellow-700 font-medium">Exact fields/documents needed:</p>
                  <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                    <li>Driver license numbers for all drivers</li>
                    <li>Updated MVR reports (within 90 days)</li>
                    <li>Driver attestations and certifications</li>
                    <li>Vehicle inspection reports</li>
                  </ul>
                  <div className="mt-4 flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
                    >
                      Request Documents
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
                    >
                      Send to Broker
                    </Button>
                  </div>
                </div>
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
              <StatusChip status={eligibility} />
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Rule Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Passed:</span>
                <Badge className="bg-green-100 text-green-700">{rules.filter((r) => r.status === "pass").length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conditional:</span>
                <Badge className="bg-orange-100 text-orange-700">
                  {rules.filter((r) => r.status === "conditional").length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Failed:</span>
                <Badge className="bg-red-100 text-red-700">{rules.filter((r) => r.status === "fail").length}</Badge>
              </div>
            </CardContent>
          </Card>

          {testScenario === "high-risk-driver" && (
            <Card className="shadow-md rounded-xl bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 text-sm">High Risk Detected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-red-700">
                  Multiple risk factors identified. Consider referral to senior underwriter for manual review.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          Proceed to Risk Scoring
        </Button>
      </div>
    </div>
  )
}
