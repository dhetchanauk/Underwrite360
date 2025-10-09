"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/lib/enhanced-state-context"
import { CheckCircle, DollarSign, Shield, AlertTriangle, TrendingUp, FileText, Users, MapPin } from "lucide-react"

export default function FinalReviewSummaryStep() {
  const { setCurrentStep, setCompletedStep } = useAppState()

  const handleProceedToQuote = () => {
    setCompletedStep(5) // Mark Final Review & Summary as complete
    setCurrentStep(6) // Move to Quote & Bind
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Final Review & Summary</h2>
          <p className="text-gray-600 mt-1">
            Comprehensive review of underwriting analysis and recommendations before quote generation.
          </p>
        </div>
      </div>

      {/* Underwriting Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Underwriting Status</p>
                <p className="text-2xl font-bold text-green-900">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Risk Tier</p>
                <p className="text-2xl font-bold text-blue-900">Standard</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-800">Indicative Premium</p>
                <p className="text-2xl font-bold text-purple-900">$24,750</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Key Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-green-900">Competitive Pricing Strategy</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Recommended
                  </Badge>
                </div>
                <p className="text-sm text-green-700">
                  Premium is competitive within market range. Consider highlighting safety features for additional
                  discounts.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-blue-900">Enhanced Coverage Options</p>
                  <Badge variant="outline" className="border-blue-300 text-blue-700">
                    Optional
                  </Badge>
                </div>
                <p className="text-sm text-blue-700">
                  Consider offering higher liability limits and comprehensive coverage for fleet protection.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-yellow-900">Driver Training Program</p>
                  <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                    Conditional
                  </Badge>
                </div>
                <p className="text-sm text-yellow-700">
                  Implement quarterly driver safety training to maintain preferred rates and reduce claims frequency.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-purple-900">Fleet Expansion Opportunity</p>
                  <Badge variant="outline" className="border-purple-300 text-purple-700">
                    Growth Opportunity
                  </Badge>
                </div>
                <p className="text-sm text-purple-700">
                  Client shows potential for fleet growth. Consider multi-year agreement with expansion provisions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Factor Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span>Positive Risk Factors</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-sm">Experienced driver pool (avg. 8+ years)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm">Strong safety record (no major claims in 3 years)</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="text-sm">Operations in low-risk territories</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm">Excellent credit rating (A+ business credit)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-700">
              <AlertTriangle className="h-5 w-5" />
              <span>Areas of Attention</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">Monitor driver training compliance quarterly</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">Review telematics data for driving behavior trends</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">Annual fleet maintenance record verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">Territory expansion impact assessment</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button onClick={handleProceedToQuote} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md px-8 py-2">
          Generate Quote & Bind
        </Button>
      </div>
    </div>
  )
}
