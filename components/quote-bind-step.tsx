"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle2,
  DollarSign,
  FileText,
  Mail,
  Download,
  CreditCard,
  Shield,
  Clock,
  AlertCircle,
} from "lucide-react"
import { useAppState } from "@/lib/enhanced-state-context"

export default function QuoteBindStep() {
  const { setCompletedStep, submissionData } = useAppState()
  const [bindingStep, setBindingStep] = useState(0)
  const [policyId, setPolicyId] = useState("")
  const [quoteGenerated, setQuoteGenerated] = useState(false)

  const handleGenerateQuote = () => {
    setQuoteGenerated(true)
    setBindingStep(1)
  }

  const handleCreatePolicy = () => {
    const newPolicyId = `POL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    setPolicyId(newPolicyId)
    setBindingStep(2)
  }

  const handleCompleteProcess = () => {
    setCompletedStep(6) // Mark final step as completed
    // Could add completion logic here
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quote & Bind</h1>
          <p className="text-gray-600 mt-2">Generate final quote and bind the policy</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Step 7 of 7
        </Badge>
      </div>

      {/* Quote & Bind Explanation */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">What is Quote & Bind?</h3>
              <p className="text-sm text-blue-800">
                Convert your underwriting decision into a final premium quote and active insurance policy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quote Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Final Quote Generation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!quoteGenerated ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-4">Ready to generate final quote</div>
                <Button onClick={handleGenerateQuote} className="bg-green-600 hover:bg-green-700 text-white">
                  Generate Final Quote
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">$12,695</div>
                  <div className="text-sm text-green-600">Annual Premium - Standard Tier</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coverage Limits:</span>
                    <span className="font-medium">$1M Combined Single Limit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deductible:</span>
                    <span className="font-medium">$2,500 Comprehensive/Collision</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Policy Term:</span>
                    <span className="font-medium">12 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Effective Date:</span>
                    <span className="font-medium">September 1, 2025</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Policy Fees:</span>
                    <span className="font-medium">$75</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">State Taxes:</span>
                    <span className="font-medium">$550</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Premium:</span>
                    <span>$13,320</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-700">
                    <strong>Included Coverages:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• Liability Coverage: $1M CSL</li>
                      <li>• Physical Damage: Actual Cash Value</li>
                      <li>• Hired/Non-Owned Auto: $150</li>
                      <li>• Medical Payments: $5,000</li>
                      <li>• Uninsured Motorist: $1M CSL</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Binding Process */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Policy Binding Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Quote Generated */}
            <div
              className={`p-4 rounded-lg border ${bindingStep >= 1 ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className={`w-5 h-5 ${bindingStep >= 1 ? "text-green-600" : "text-gray-400"}`} />
                <span className="font-medium">1. Quote Generated</span>
              </div>
              {bindingStep >= 1 && (
                <div className="space-y-1 text-sm ml-7">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Premium calculated: $13,320</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Terms and conditions finalized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Quote package prepared</span>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Policy Creation */}
            <div
              className={`p-4 rounded-lg border ${bindingStep >= 2 ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className={`w-5 h-5 ${bindingStep >= 2 ? "text-green-600" : "text-gray-400"}`} />
                <span className="font-medium">2. Policy Binding</span>
              </div>
              {bindingStep < 2 && quoteGenerated ? (
                <div className="ml-7">
                  <Button onClick={handleCreatePolicy} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Bind Policy
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">This will create the active insurance policy</p>
                </div>
              ) : bindingStep >= 2 ? (
                <div className="ml-7 text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>
                      Policy Number: <strong>{policyId}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Coverage effective: September 1, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Policy documents generated</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Step 3: Delivery */}
            <div
              className={`p-4 rounded-lg border ${bindingStep >= 2 ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className={`w-5 h-5 ${bindingStep >= 2 ? "text-green-600" : "text-gray-400"}`} />
                <span className="font-medium">3. Policy Delivery</span>
              </div>
              {bindingStep >= 2 && (
                <div className="ml-7 space-y-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download Policy Documents
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Mail className="w-4 h-4" />
                    Email to Broker/Insured
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Process Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Underwriting Process Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">12 min</div>
              <div className="text-sm text-blue-600">Total Processing Time</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">Approved</div>
              <div className="text-sm text-green-600">Final Decision</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">Standard</div>
              <div className="text-sm text-purple-600">Risk Tier</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <CreditCard className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">$13,320</div>
              <div className="text-sm text-orange-600">Annual Premium</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Complete */}
      {bindingStep >= 2 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 mb-2">Policy Successfully Bound!</h3>
            <p className="text-green-700 mb-4">
              {submissionData?.namedInsured || "Company"} now has active commercial auto insurance coverage. Policy{" "}
              {policyId} is effective September 1, 2025.
            </p>
            <Button onClick={handleCompleteProcess} className="bg-green-600 hover:bg-green-700 text-white shadow-md">
              Complete Underwriting Process
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
