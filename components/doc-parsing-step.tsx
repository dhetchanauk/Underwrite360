"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppState } from "@/lib/enhanced-state-context"

export default function DocParsingStep() {
  const { setCurrentStep, setCompletedStep } = useAppState()

  const handleNext = () => {
    setCompletedStep(2) // Mark Doc Parsing as complete
    setCurrentStep(3) // Move to Risk Data
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Doc Parsing & Prefill</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Document Viewer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                <img
                  src="/acord-form-document.png"
                  alt="ACORD Form Document Preview"
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute bottom-4 flex space-x-2">
                  <Button variant="outline" size="sm">
                    {"< Prev"}
                  </Button>
                  <span className="text-sm text-gray-600">Page 1 of 3</span>
                  <Button variant="outline" size="sm">
                    {"Next >"}
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                <img
                  src="/acord-form-page-1.png"
                  alt="ACORD Form Thumbnail 1"
                  className="w-16 h-20 object-cover rounded-sm border border-blue-300 cursor-pointer"
                />
                <img
                  src="/sov-spreadsheet-page-1.png"
                  alt="SOV Spreadsheet Thumbnail 2"
                  className="w-16 h-20 object-cover rounded-sm border border-gray-300 cursor-pointer"
                />
                <img
                  src="/loss-runs-document-page-1.png"
                  alt="Loss Runs Document Thumbnail 3"
                  className="w-16 h-20 object-cover rounded-sm border border-gray-300 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Prefill Form (Commercial Auto)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="driver-dl">Driver DL#</Label>
                <Input id="driver-dl" defaultValue="DL1234567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driver-mvr">Driver MVR Pts</Label>
                <Input id="driver-mvr" defaultValue="3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-vin">Vehicle VIN</Label>
                <Input id="vehicle-vin" defaultValue="VIN123ABC456" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-year">Vehicle Year</Label>
                <Input id="vehicle-year" defaultValue="2020" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="garaging-zip">Garaging ZIP</Label>
                <Input id="garaging-zip" defaultValue="90210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="radius">Radius</Label>
                <Input id="radius" defaultValue="100 miles" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prior-losses">Prior Losses</Label>
                <Input id="prior-losses" defaultValue="1 (2023)" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Entities (Simulated OCR/NER)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Source Doc</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Insured Name</TableCell>
                    <TableCell>Acme Corp</TableCell>
                    <TableCell>98%</TableCell>
                    <TableCell>ACORD</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Effective Date</TableCell>
                    <TableCell>2025-01-01</TableCell>
                    <TableCell>95%</TableCell>
                    <TableCell>ACORD</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>VIN</TableCell>
                    <TableCell>VIN123ABC456</TableCell>
                    <TableCell>92%</TableCell>
                    <TableCell>SOV</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Driver DL#</TableCell>
                    <TableCell>DL1234567</TableCell>
                    <TableCell>70%</TableCell>
                    <TableCell>Driver List</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Test Scenario</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="clean-risk">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clean-risk">Clean Risk (default)</SelectItem>
                  <SelectItem value="incomplete-docs">Incomplete Docs</SelectItem>
                  <SelectItem value="high-risk-driver">High-Risk Driver/Location</SelectItem>
                  <SelectItem value="adverse-loss">Adverse Loss History</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button variant="outline" className="shadow-sm bg-transparent">
          Accept All
        </Button>
        <Button variant="outline" className="shadow-sm bg-transparent">
          Auto-Fix Low Confidence
        </Button>
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          Next ➜ Risk Data
        </Button>
      </div>
    </div>
  )
}
