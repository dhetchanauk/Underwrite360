"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAppState } from "@/lib/state-context"
import { useState } from "react"

export default function WhatIfRecommendationsStep() {
  const { setCurrentStep, setCompletedStep } = useAppState()
  const [deductible, setDeductible] = useState(1000)
  const [limit, setLimit] = useState("1M")
  const [hiredNonOwned, setHiredNonOwned] = useState(false)
  const [windHail, setWindHail] = useState(false)
  const [telematicsCredit, setTelematicsCredit] = useState(true)
  const [driverTraining, setDriverTraining] = useState(true)

  // Simulated pricing logic
  const calculatePremium = () => {
    const basePremium = 5000
    let modifier = 1.0

    if (deductible > 1000) modifier -= (deductible - 1000) * 0.0001
    if (limit === "2M") modifier += 0.1
    if (hiredNonOwned) modifier += 0.05
    if (windHail) modifier += 0.02
    if (telematicsCredit) modifier -= 0.08
    if (driverTraining) modifier -= 0.05

    const premium = basePremium * modifier
    return {
      min: Math.round(premium * 0.95),
      max: Math.round(premium * 1.05),
      lr: Math.round(55 - (modifier - 1) * 100), // Simulated LR improvement
    }
  }

  const { min, max, lr } = calculatePremium()

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

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">What-If & Recommendations</h2>
      <p className="text-gray-600">
        Adjusting parameters to see their impact on premium and risk, and generating recommendations.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Pricing Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center text-4xl font-bold text-blue-700">
                Indicative Premium Range: ${min.toLocaleString()} - ${max.toLocaleString()}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="deductible-slider">Deductible (${deductible.toLocaleString()})</Label>
                  <Slider
                    id="deductible-slider"
                    min={500}
                    max={5000}
                    step={500}
                    value={[deductible]}
                    onValueChange={(val) => setDeductible(val[0])}
                    className="w-full"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="limit-select">Limit</Label>
                  <Select value={limit} onValueChange={setLimit}>
                    <SelectTrigger id="limit-select">
                      <SelectValue placeholder="Select limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500K">$500,000</SelectItem>
                      <SelectItem value="1M">$1,000,000</SelectItem>
                      <SelectItem value="2M">$2,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="hired-non-owned" checked={hiredNonOwned} onCheckedChange={setHiredNonOwned} />
                  <Label htmlFor="hired-non-owned">Add Hired/Non-Owned Auto</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="wind-hail" checked={windHail} onCheckedChange={setWindHail} />
                  <Label htmlFor="wind-hail">Add Wind/Hail 2%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="telematics-credit" checked={telematicsCredit} onCheckedChange={setTelematicsCredit} />
                  <Label htmlFor="telematics-credit">Telematics Credit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="driver-training" checked={driverTraining} onCheckedChange={setDriverTraining} />
                  <Label htmlFor="driver-training">Driver Training Requirement</Label>
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
                {telematicsCredit ? "Telematics Credit" : "no Telematics Credit"}. Add{" "}
                {windHail ? "Wind/Hail 2% and " : ""}
                {driverTraining ? "Driver Training requirement" : ""}. Expected loss ratio improves to {lr}%.
              </p>
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
          Accept Recommendation
        </Button>
      </div>
    </div>
  )
}
