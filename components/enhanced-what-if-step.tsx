"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAppState } from "@/lib/enhanced-state-context"
import { calculatePremium } from "@/lib/data-simulation"
import { useState, useEffect } from "react"

export default function EnhancedWhatIfStep() {
  const { setCurrentStep, setCompletedStep, submissionData, riskData, underwritingScore } = useAppState()
  const [deductible, setDeductible] = useState(1000)
  const [limits, setLimits] = useState("$1M CSL")
  const [endorsements, setEndorsements] = useState<string[]>([])
  const [credits, setCredits] = useState<string[]>(["telematics", "driver-training"])
  const [premiumData, setPremiumData] = useState<{ premium: number; breakdown: any } | null>(null)

  useEffect(() => {
    if (submissionData && riskData) {
      const result = calculatePremium(submissionData, riskData, {
        deductible,
        limits,
        endorsements,
        credits,
      })
      setPremiumData(result)
    }
  }, [submissionData, riskData, deductible, limits, endorsements, credits])

  const handleEndorsementChange = (endorsement: string, checked: boolean) => {
    if (checked) {
      setEndorsements((prev) => [...prev, endorsement])
    } else {
      setEndorsements((prev) => prev.filter((e) => e !== endorsement))
    }
  }

  const handleCreditChange = (credit: string, checked: boolean) => {
    if (checked) {
      setCredits((prev) => [...prev, credit])
    } else {
      setCredits((prev) => prev.filter((c) => c !== credit))
    }
  }

  const handleAcceptRecommendation = () => {
    setCompletedStep(6) // Mark What-If as complete
    setCurrentStep(8) // Move to Quote & Bind (skipping Referral for now)
  }

  const handleSendToReferral = () => {
    setCompletedStep(6) // Mark What-If as complete
    setCurrentStep(7) // Move to Referral
  }

  const handleBackToRules = () => {
    setCurrentStep(4) // Go back to Rules & Eligibility
  }

  const premiumRange = premiumData
    ? {
        min: Math.round(premiumData.premium * 0.93),
        max: Math.round(premiumData.premium * 1.07),
      }
    : { min: 0, max: 0 }

  const estimatedLR = Math.max(45, 65 - credits.length * 5 + endorsements.length * 2)

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">What-If & Recommendations</h2>
      <p className="text-gray-600">
        Adjusting parameters for{" "}
        <span className="font-semibold text-blue-700">{submissionData?.namedInsured || "selected company"}</span> to see
        their impact on premium and risk, and generating recommendations.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>
                Pricing Preview (Indicative, $) - {submissionData?.namedInsured || "Selected Company"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center text-4xl font-bold text-blue-700">
                Premium Range: ${premiumRange.min.toLocaleString()} – ${premiumRange.max.toLocaleString()}
              </div>

              {premiumData && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Premium Calculation:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Base Rate: ${premiumData.breakdown.baseRate.toLocaleString()}</div>
                    <div>× Exposure ({premiumData.breakdown.exposure} vehicles)</div>
                    <div>× Territory Factor ({premiumData.breakdown.territory})</div>
                    <div>× Class Factor ({premiumData.breakdown.classFactor})</div>
                    <div>× Limits Factor ({premiumData.breakdown.limitsFactor})</div>
                    <div>+ Schedule Modifier ({(premiumData.breakdown.scheduleModifier * 100).toFixed(1)}%)</div>
                    <div>- Deductible Credit ({(premiumData.breakdown.deductibleCredit * 100).toFixed(1)}%)</div>
                    <div>+ Endorsements: ${premiumData.breakdown.endorsementCost}</div>
                    <div>- Credits: ${premiumData.breakdown.totalCredits}</div>
                    <div>+ Fees: ${premiumData.breakdown.fees}</div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="deductible-slider">Deductible (${deductible.toLocaleString()})</Label>
                  <Slider
                    id="deductible-slider"
                    min={500}
                    max={2500}
                    step={250}
                    value={[deductible]}
                    onValueChange={(val) => setDeductible(val[0])}
                    className="w-full"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="limit-select">Liability Limits</Label>
                  <Select value={limits} onValueChange={setLimits}>
                    <SelectTrigger id="limit-select">
                      <SelectValue placeholder="Select limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$50k/$100k">$50k/$100k</SelectItem>
                      <SelectItem value="$100k/$300k">$100k/$300k</SelectItem>
                      <SelectItem value="$250k/$500k">$250k/$500k</SelectItem>
                      <SelectItem value="$1M CSL">$1M CSL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700">Endorsements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="hired-non-owned"
                      checked={endorsements.includes("hired-non-owned")}
                      onCheckedChange={(checked) => handleEndorsementChange("hired-non-owned", checked)}
                    />
                    <Label htmlFor="hired-non-owned">Hired/Non-Owned Auto (+$150)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="drive-other-car"
                      checked={endorsements.includes("drive-other-car")}
                      onCheckedChange={(checked) => handleEndorsementChange("drive-other-car", checked)}
                    />
                    <Label htmlFor="drive-other-car">Drive-Other-Car (+$75)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="towing"
                      checked={endorsements.includes("towing")}
                      onCheckedChange={(checked) => handleEndorsementChange("towing", checked)}
                    />
                    <Label htmlFor="towing">Towing (+$50)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="rental"
                      checked={endorsements.includes("rental")}
                      onCheckedChange={(checked) => handleEndorsementChange("rental", checked)}
                    />
                    <Label htmlFor="rental">Rental (+$100)</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700">Credits/Debits:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="telematics-credit"
                      checked={credits.includes("telematics")}
                      onCheckedChange={(checked) => handleCreditChange("telematics", checked)}
                    />
                    <Label htmlFor="telematics-credit">Telematics Credit (-$100)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="driver-training"
                      checked={credits.includes("driver-training")}
                      onCheckedChange={(checked) => handleCreditChange("driver-training", checked)}
                    />
                    <Label htmlFor="driver-training">Driver Training (-$50)</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Recommendation Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Recommend Standard Tier with ${deductible.toLocaleString()} deductible and{" "}
                {credits.includes("telematics") ? "Telematics Credit" : "no Telematics Credit"}.
                {endorsements.length > 0 && ` Add ${endorsements.map((e) => e.replace("-", "/")).join(", ")}.`}
                {credits.includes("driver-training") && " Driver Training requirement."} Expected loss ratio improves to{" "}
                {estimatedLR}%.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span>Loss Ratio Estimate:</span>
                <span className="font-semibold text-blue-600">{estimatedLR}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Premium vs. Base:</span>
                <span className="font-semibold text-green-600">
                  {premiumData
                    ? ((premiumData.premium / (1200 * (submissionData?.vehicles?.length || 1)) - 1) * 100).toFixed(1)
                    : "0"}
                  %
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Risk Score Impact:</span>
                <span className="font-semibold text-orange-600">
                  {underwritingScore >= 60 ? "High" : underwritingScore >= 40 ? "Medium" : "Low"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={handleBackToRules} className="shadow-sm bg-transparent">
          Back to Rules
        </Button>
        <Button variant="outline" onClick={handleSendToReferral} className="shadow-sm bg-transparent">
          Send to Referral
        </Button>
        <Button onClick={handleAcceptRecommendation} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          Generate Final Quote
        </Button>
      </div>
    </div>
  )
}
