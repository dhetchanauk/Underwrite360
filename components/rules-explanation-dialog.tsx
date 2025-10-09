"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export default function RulesExplanationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
          <HelpCircle className="w-4 h-4" />
          How Rules Work
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Understanding Underwriting Rules & Eligibility</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">What are Underwriting Rules?</h3>
            <p className="text-gray-600 mb-4">
              Underwriting rules are predefined criteria that automatically evaluate whether a risk meets the insurance
              company's acceptance standards. They help ensure consistent decision-making and identify potential issues
              early in the process.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Rule Categories</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">Hard Rules</span>
                    <Badge variant="destructive">Auto-Decline</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Absolute requirements that cannot be waived. Failure results in automatic decline.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Examples: DUI within 3 years, operating outside service territory
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">Soft Rules</span>
                    <Badge className="bg-orange-100 text-orange-700">Conditional</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Issues that can be addressed with special terms, higher pricing, or additional requirements.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Examples: Older vehicles, moderate loss history, credit concerns
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">Preference Rules</span>
                    <Badge className="bg-green-100 text-green-700">Pass</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Positive factors that may qualify for discounts or preferred pricing.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Examples: Clean driving records, safety programs, good credit
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Eligibility Outcomes</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="font-medium text-green-800">Eligible</span>
                <span className="text-sm text-green-600">All rules passed - standard terms available</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                <span className="font-medium text-orange-800">Conditional</span>
                <span className="text-sm text-orange-600">Acceptable with special terms or pricing</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <span className="font-medium text-yellow-800">Refer</span>
                <span className="text-sm text-yellow-600">Requires senior underwriter review</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="font-medium text-red-800">Decline</span>
                <span className="text-sm text-red-600">Hard rule violations - cannot insure</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Why This Matters</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                <span>
                  <strong>Consistency:</strong> Ensures all submissions are evaluated fairly using the same criteria
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                <span>
                  <strong>Speed:</strong> Automated evaluation provides instant feedback on acceptability
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                <span>
                  <strong>Transparency:</strong> Clear explanations help brokers understand requirements
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                <span>
                  <strong>Risk Management:</strong> Identifies potential issues before binding coverage
                </span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
