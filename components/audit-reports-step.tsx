"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/lib/enhanced-state-context"

export default function AuditReportsStep() {
  const { setCurrentStep, setCompletedStep } = useAppState()

  const handleNext = () => {
    setCompletedStep(9) // Mark Audit & Reports as complete
    setCurrentStep(10) // Move to Settings
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Audit & Reports</h2>
      <p className="text-gray-600">Review the full submission timeline and access key operational reports.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Submission Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-gray-200 ml-4">
                <li className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    Intake{" "}
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
                      Latest
                    </span>
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">August 10, 2025</time>
                  <p className="text-base font-normal text-gray-500">Submission received via email.</p>
                </li>
                <li className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">Parsing & Data Pull</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">August 10, 2025</time>
                  <p className="text-base font-normal text-gray-500">Documents parsed, 3rd-party data retrieved.</p>
                </li>
                <li className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">Rules & Scoring</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">August 10, 2025</time>
                  <p className="text-base font-normal text-gray-500">Eligibility determined, risk score calculated.</p>
                </li>
                <li className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">What-If & Recommendation</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">August 11, 2025</time>
                  <p className="text-base font-normal text-gray-500">Premium adjusted, recommendations generated.</p>
                </li>
                <li className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">Quote & Bind</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">August 11, 2025</time>
                  <p className="text-base font-normal text-gray-500">Indicative quote generated, policy bound.</p>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Operational KPIs (Simulated)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Avg Time to Quote:</span>
                <span className="font-semibold text-blue-600">25 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">% Referral:</span>
                <span className="font-semibold text-orange-600">12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Hit Ratio:</span>
                <span className="font-semibold text-green-600">70%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Loss-Prone Flags Avoided:</span>
                <span className="font-semibold text-green-600">15</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full shadow-sm bg-transparent">
                Download: Underwriting Case Report (PDF stub)
              </Button>
              <Button variant="outline" className="w-full shadow-sm bg-transparent">
                Export CSV (entities, rules, score, decisions)
              </Button>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full shadow-md bg-blue-50 hover:bg-blue-100 text-blue-700">
            Clone Submission (create new case with same data; tweak factors)
          </Button>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          Next ➜ Settings
        </Button>
      </div>
    </div>
  )
}
