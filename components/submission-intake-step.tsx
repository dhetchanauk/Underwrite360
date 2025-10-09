"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useAppState } from "@/lib/state-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SubmissionIntakeStep() {
  const { setCurrentStep, setCompletedStep } = useAppState()

  const handleValidateAndContinue = () => {
    setCompletedStep(1) // Mark Submission Intake as complete
    setCurrentStep(2) // Move to Doc Parsing
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Submission Intake</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Submission Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="portal">Portal Upload</TabsTrigger>
                  <TabsTrigger value="chat">Broker Chat</TabsTrigger>
                  <TabsTrigger value="manual">Manual Form</TabsTrigger>
                </TabsList>
                <TabsContent value="email" className="p-4 border rounded-md mt-4">
                  <p className="text-gray-600">Simulated email intake. Drag & drop files here.</p>
                  <div className="mt-4 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                    Drop files here (ACORD PDFs, SOV spreadsheets, etc.)
                  </div>
                </TabsContent>
                <TabsContent value="portal" className="p-4 border rounded-md mt-4">
                  <p className="text-gray-600">Simulated portal upload. Click to browse files.</p>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Browse Files
                  </Button>
                </TabsContent>
                <TabsContent value="chat" className="p-4 border rounded-md mt-4">
                  <p className="text-gray-600">Simulated broker chat interface.</p>
                  <div className="mt-4 h-32 border rounded-md bg-gray-50 flex items-center justify-center text-gray-400">
                    Chat messages will appear here.
                  </div>
                </TabsContent>
                <TabsContent value="manual" className="p-4 border rounded-md mt-4">
                  <p className="text-gray-600 mb-4">Manually enter submission details below.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="manual-insured-name">Insured Name</Label>
                      <Input id="manual-insured-name" defaultValue="Global Logistics Inc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manual-policy-type">Policy Type</Label>
                      <Input id="manual-policy-type" defaultValue="Commercial Auto" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manual-effective-date">Effective Date</Label>
                      <Input id="manual-effective-date" type="date" defaultValue="2025-09-01" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manual-broker-name">Broker Name</Label>
                      <Input id="manual-broker-name" defaultValue="Apex Insurance" />
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Save Manual Entry
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Submission Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-semibold">10:00 AM:</span> Email received with 3 attachments (ACORD, SOV, Loss
                  Runs)
                </li>
                <li>
                  <span className="font-semibold">10:05 AM:</span> Broker message: "Any updates on this submission?"
                </li>
                <li>
                  <span className="font-semibold">10:30 AM:</span> Due date set for EOD.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>AI Extraction (Simulated)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Detected Fields:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>Insured Name: "Acme Corp"</li>
                  <li>Effective Date: "2025-01-01"</li>
                  <li>Policy Type: "Commercial Auto"</li>
                  <li>Number of Vehicles: "15"</li>
                  <li>Number of Drivers: "12"</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Completeness Meter:</p>
                <Progress value={75} className="w-full h-3 bg-blue-100" indicatorClassName="bg-blue-500" />
                <p className="text-xs text-gray-500">75% complete - missing driver license numbers.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button variant="outline" className="shadow-sm bg-transparent">
          Save Draft
        </Button>
        <Button onClick={handleValidateAndContinue} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          Validate & Continue
        </Button>
      </div>
    </div>
  )
}
