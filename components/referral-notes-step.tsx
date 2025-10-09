"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppState } from "@/lib/enhanced-state-context"
import { useState } from "react"

export default function ReferralNotesStep() {
  const { setCurrentStep, setCompletedStep } = useAppState()
  const [uwNotes, setUwNotes] = useState("")
  const simulatedScore = 78 // Example score
  const simulatedDrivers = "prior DUI, multiple speeding tickets" // Example drivers
  const simulatedDocs = "updated MVR, driver attestations" // Example docs

  const generateNotes = () => {
    setUwNotes(
      `Reason: Elevated risk indicators (score ${simulatedScore}) driven by ${simulatedDrivers}. ` +
        `Ask: Provide ${simulatedDocs} to reassess eligibility. Next: Re-evaluate with updated data.`,
    )
  }

  const handleNext = () => {
    setCompletedStep(7) // Mark Referral as complete
    setCurrentStep(8) // Move to Quote & Bind
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Referral / UW Notes</h2>
      <p className="text-gray-600">If the risk requires further review, generate notes and assign to an underwriter.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Refer to Underwriter</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assign-uw">Assign UW</Label>
                <Select defaultValue="uw-john">
                  <SelectTrigger id="assign-uw">
                    <SelectValue placeholder="Select Underwriter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uw-john">John Doe</SelectItem>
                    <SelectItem value="uw-jane">Jane Smith</SelectItem>
                    <SelectItem value="uw-mike">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" defaultValue="2025-08-18" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>UW Notes Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Generated notes will appear here..."
                value={uwNotes}
                onChange={(e) => setUwNotes(e.target.value)}
                rows={6}
              />
              <Button onClick={generateNotes} variant="outline" className="shadow-sm bg-transparent">
                Generate Notes
              </Button>
              <p className="text-sm text-gray-500">Placeholder endpoint: POST /hooks/referral/create</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Requested Documents Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="loss-runs" />
                <Label htmlFor="loss-runs">Updated Loss Runs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="roof-cert" />
                <Label htmlFor="roof-cert">Roof Certification</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="driver-attestations" />
                <Label htmlFor="driver-attestations">Driver Attestations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="financials" />
                <Label htmlFor="financials">Company Financials</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          Complete Referral Process
        </Button>
      </div>
    </div>
  )
}
