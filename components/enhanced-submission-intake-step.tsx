"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useAppState } from "@/lib/enhanced-state-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, MessageSquare, Edit3 } from "lucide-react"

export default function EnhancedSubmissionIntakeStep() {
  const { setCurrentStep, setCompletedStep, testScenario, setTestScenario, submissionData } = useAppState()

  const handleValidateAndContinue = () => {
    setCompletedStep(1) // Mark Submission Intake as complete
    setCurrentStep(2) // Move to Doc Parsing
  }

  const getCompleteness = () => {
    if (!submissionData) return 0

    let completedFields = 0
    const totalFields = 10

    if (submissionData.namedInsured) completedFields++
    if (submissionData.fein) completedFields++
    if (submissionData.effectiveDate) completedFields++
    if (submissionData.drivers?.length > 0) completedFields += 2
    if (submissionData.vehicles?.length > 0) completedFields += 2
    if (submissionData.drivers?.every((d) => d.dlNumber)) completedFields += 3

    return Math.round((completedFields / totalFields) * 100)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Submission Intake</h2>
          <p className="text-gray-600 mt-2">Submission ID: {submissionData?.id || "Generating..."}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="test-scenario">Test Scenario:</Label>
          <Select value={testScenario} onValueChange={setTestScenario}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clean-risk">Clean Risk (default)</SelectItem>
              <SelectItem value="incomplete-docs">Incomplete Docs</SelectItem>
              <SelectItem value="high-risk-driver">High-Risk Driver/Location</SelectItem>
              <SelectItem value="adverse-loss">Adverse Loss History</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Submission Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="portal" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Portal Upload
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Broker Chat
                  </TabsTrigger>
                  <TabsTrigger value="manual" className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Manual
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="p-4 border rounded-md mt-4">
                  <div className="space-y-4">
                    <p className="text-gray-600">Mock inbox - select a submission to process:</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">From: broker@apexinsurance.com</p>
                          <p className="text-sm text-gray-600">
                            Subject: Commercial Auto Quote Request - Global Logistics Inc.
                          </p>
                          <p className="text-xs text-gray-500">
                            Attachments: ACORD 127, Driver List CSV, Vehicle Schedule CSV, Loss Runs PDF
                          </p>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Extract using AI
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="portal" className="p-4 border rounded-md mt-4">
                  <div className="space-y-4">
                    <p className="text-gray-600">Upload required documents:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>ACORD PDFs</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                          <p className="text-sm text-gray-500">127 (Business Auto), 129 (Additional Insured)</p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            Browse Files
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Driver List CSV</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                          <p className="text-xs text-gray-500">
                            Required: first_name, last_name, dl_number, state, dob, hire_date, mvr_points,
                            violations_count
                          </p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            Browse Files
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Vehicle Schedule CSV</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                          <p className="text-xs text-gray-500">
                            Required: vin, year, make, model, gvw, usage, radius_miles, garage_zip, anti_theft,
                            ownership
                          </p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            Browse Files
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Loss Runs & Photos</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                          <p className="text-xs text-gray-500">Last 3-5 years, 2-3 vehicle photos</p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            Browse Files
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="chat" className="p-4 border rounded-md mt-4">
                  <div className="space-y-4">
                    <p className="text-gray-600">Broker chat intake:</p>
                    <div className="bg-gray-50 border rounded-md p-4 h-48 overflow-y-auto">
                      <div className="space-y-3">
                        <div className="flex justify-start">
                          <div className="bg-white rounded-lg p-2 max-w-xs">
                            <p className="text-sm">
                              Hi! I need a quote for Global Logistics Inc. - commercial auto policy.
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
                            <p className="text-sm">
                              I can help with that. Can you provide the ACORD forms and driver/vehicle schedules?
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-white rounded-lg p-2 max-w-xs">
                            <p className="text-sm">
                              Sure, uploading now... [Files attached: ACORD_127.pdf, drivers.csv, vehicles.csv]
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Process Chat Submission</Button>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="p-4 border rounded-md mt-4">
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-4">Canonical form fields for Named Insured:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="manual-insured-name">Legal Name</Label>
                        <Input
                          id="manual-insured-name"
                          defaultValue={submissionData?.namedInsured || "Global Logistics Inc."}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="manual-fein">FEIN</Label>
                        <Input id="manual-fein" defaultValue={submissionData?.fein || "12-3456789"} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="manual-effective-date">Effective Date</Label>
                        <Input
                          id="manual-effective-date"
                          type="date"
                          defaultValue={submissionData?.effectiveDate || "2025-09-01"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="manual-broker-name">Broker Name</Label>
                        <Input id="manual-broker-name" defaultValue="Apex Insurance Brokers" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="manual-limits">Requested Limits</Label>
                        <Select defaultValue="1M CSL">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50k/100k">$50k/$100k</SelectItem>
                            <SelectItem value="100k/300k">$100k/$300k</SelectItem>
                            <SelectItem value="250k/500k">$250k/$500k</SelectItem>
                            <SelectItem value="1M CSL">$1M CSL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="manual-deductible">Requested Deductible</Label>
                        <Select defaultValue="1000">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="500">$500</SelectItem>
                            <SelectItem value="1000">$1,000</SelectItem>
                            <SelectItem value="2500">$2,500</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Save Manual Entry
                    </Button>
                  </div>
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
                  <span className="font-semibold">10:00 AM:</span> Email received with 4 attachments (ACORD 127, Driver
                  CSV, Vehicle CSV, Loss Runs)
                </li>
                <li>
                  <span className="font-semibold">10:05 AM:</span> Broker message: "Rush quote needed by EOD for
                  renewal"
                </li>
                <li>
                  <span className="font-semibold">10:30 AM:</span> Due date set for 5:00 PM today
                </li>
                <li>
                  <span className="font-semibold">10:35 AM:</span> AI extraction initiated
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>AI Extraction Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Detected Fields:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Named Insured: "{submissionData?.namedInsured || "Global Logistics Inc."}"</li>
                  <li>FEIN: "{submissionData?.fein || "12-3456789"}"</li>
                  <li>Effective Date: "{submissionData?.effectiveDate || "2025-09-01"}"</li>
                  <li>Drivers: {submissionData?.drivers?.length || 2}</li>
                  <li>Vehicles: {submissionData?.vehicles?.length || 2}</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Completeness Meter:</p>
                <Progress
                  value={getCompleteness()}
                  className="w-full h-3 bg-blue-100"
                  indicatorClassName="bg-blue-500"
                />
                <p className="text-xs text-gray-500">
                  {getCompleteness()}% complete
                  {testScenario === "incomplete-docs" && " - missing driver license numbers"}
                </p>
              </div>
              {testScenario === "incomplete-docs" && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800 font-medium">Missing Data Detected</p>
                  <p className="text-xs text-yellow-700 mt-1">Driver license numbers required for MVR pulls</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Current Scenario</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant={
                  testScenario === "clean-risk"
                    ? "default"
                    : testScenario === "incomplete-docs"
                      ? "secondary"
                      : testScenario === "high-risk-driver"
                        ? "destructive"
                        : "secondary"
                }
                className="text-sm"
              >
                {testScenario
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Badge>
              <p className="text-xs text-gray-500 mt-2">
                {testScenario === "clean-risk" && "Standard risk profile with complete documentation"}
                {testScenario === "incomplete-docs" && "Missing critical driver information"}
                {testScenario === "high-risk-driver" && "High-risk driver with violations detected"}
                {testScenario === "adverse-loss" && "Multiple prior losses in recent history"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button variant="outline" className="shadow-sm bg-transparent">
          Save Draft
        </Button>
        <Button onClick={handleValidateAndContinue} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          Begin Document Processing
        </Button>
      </div>
    </div>
  )
}
