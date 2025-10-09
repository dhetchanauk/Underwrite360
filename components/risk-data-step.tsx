"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppState } from "@/lib/enhanced-state-context"
import { useState } from "react"
import { CheckCircle, AlertTriangle, Clock, Database, Shield, MapPin, Car, CreditCard } from "lucide-react"

export default function RiskDataStep() {
  const { setCurrentStep, setCompletedStep } = useAppState()
  const [isLoading, setIsLoading] = useState(false)
  const [dataRetrieved, setDataRetrieved] = useState(false)
  const [currentSource, setCurrentSource] = useState("")

  const dataSources = [
    { name: "MVR Records", icon: Car, status: "pending" },
    { name: "Credit Bureau", icon: CreditCard, status: "pending" },
    { name: "Telematics Data", icon: Shield, status: "pending" },
    { name: "Territory Data", icon: MapPin, status: "pending" },
  ]

  const [sourceStatuses, setSourceStatuses] = useState(dataSources)

  const handleDataPull = async () => {
    setIsLoading(true)
    setDataRetrieved(false)

    // Simulate data retrieval with 4-second delay
    const sources = [...dataSources]

    for (let i = 0; i < sources.length; i++) {
      setCurrentSource(sources[i].name)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      sources[i].status = "complete"
      setSourceStatuses([...sources])
    }

    setIsLoading(false)
    setDataRetrieved(true)
    setCurrentSource("")
  }

  const handleNext = () => {
    setCompletedStep(3) // Mark Risk Data as complete
    setCurrentStep(4) // Move to Risk Assessment & Scoring
  }

  const retrievedData = {
    mvr: {
      totalPoints: 6,
      violations: ["Speeding +15 mph", "Following too close"],
      dui: false,
      licenseStatus: "Valid",
    },
    credit: {
      score: 720,
      band: "A",
      paymentHistory: "Excellent",
      utilization: "12%",
    },
    telematics: {
      harshBraking: 8.2,
      speeding: 15.3,
      nightDriving: 22.1,
      safetyScore: 78,
    },
    territory: {
      weatherRisk: "Moderate",
      crimeIndex: 3.2,
      territoryFactor: 1.05,
      catastropheExposure: "Low",
    },
  }

  const riskIndicators = [
    { category: "Credit Risk", level: "Low", score: 85, color: "text-green-600", bg: "bg-green-100" },
    { category: "Driver Risk", level: "Moderate", score: 65, color: "text-yellow-600", bg: "bg-yellow-100" },
    { category: "Territory Risk", level: "Low", score: 78, color: "text-green-600", bg: "bg-green-100" },
    { category: "Telematics Risk", level: "Moderate", score: 62, color: "text-yellow-600", bg: "bg-yellow-100" },
  ]

  const riskFlags = [
    { type: "Warning", message: "Multiple speeding violations detected", severity: "medium" },
    { type: "Positive", message: "Excellent business credit rating", severity: "low" },
    { type: "Warning", message: "Above-average harsh braking events", severity: "medium" },
    { type: "Positive", message: "Low catastrophe exposure territory", severity: "low" },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Third-Party Risk Data</h2>
      <p className="text-gray-600">
        Retrieving comprehensive risk data from external sources to enhance underwriting accuracy.
      </p>

      {!dataRetrieved && (
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Data Source Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isLoading ? (
              <div className="text-center py-8">
                <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Retrieve Risk Data</h3>
                <p className="text-gray-600 mb-6">
                  Click below to pull comprehensive risk data from multiple third-party sources
                </p>
                <Button
                  onClick={handleDataPull}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md px-8 py-2"
                >
                  Start Data Pull
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Retrieving Data...</h3>
                  <p className="text-gray-600">Currently pulling: {currentSource}</p>
                </div>

                <div className="space-y-3">
                  {sourceStatuses.map((source, index) => {
                    const IconComponent = source.icon
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-gray-900">{source.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {source.status === "complete" ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : source.name === currentSource ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {dataRetrieved && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Retrieved Data */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Retrieved Data Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">MVR Records</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">Total Points:</span> {retrievedData.mvr.totalPoints}
                    </p>
                    <p>
                      <span className="font-medium">Violations:</span> {retrievedData.mvr.violations.join(", ")}
                    </p>
                    <p>
                      <span className="font-medium">DUI History:</span> {retrievedData.mvr.dui ? "Yes" : "None"}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Credit Bureau</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">Credit Score:</span> {retrievedData.credit.score}
                    </p>
                    <p>
                      <span className="font-medium">Credit Band:</span> {retrievedData.credit.band}
                    </p>
                    <p>
                      <span className="font-medium">Payment History:</span> {retrievedData.credit.paymentHistory}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Telematics Data</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">Harsh Braking:</span> {retrievedData.telematics.harshBraking}%
                    </p>
                    <p>
                      <span className="font-medium">Speeding Events:</span> {retrievedData.telematics.speeding}%
                    </p>
                    <p>
                      <span className="font-medium">Safety Score:</span> {retrievedData.telematics.safetyScore}/100
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Territory Data</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">Weather Risk:</span> {retrievedData.territory.weatherRisk}
                    </p>
                    <p>
                      <span className="font-medium">Crime Index:</span> {retrievedData.territory.crimeIndex}/10
                    </p>
                    <p>
                      <span className="font-medium">Territory Factor:</span> {retrievedData.territory.territoryFactor}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Indicators */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Risk Indicator Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskIndicators.map((indicator, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{indicator.category}</span>
                      <Badge className={`${indicator.bg} ${indicator.color} border-0`}>{indicator.level}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={indicator.score} className="flex-1 h-2" />
                      <span className="text-sm font-medium text-gray-600">{indicator.score}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Risk Flags */}
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                Risk Flags & Findings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {riskFlags.map((flag, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      flag.type === "Warning" ? "bg-yellow-50 border-yellow-400" : "bg-green-50 border-green-400"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {flag.type === "Warning" ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      )}
                      <div>
                        <div
                          className={`font-semibold text-sm ${
                            flag.type === "Warning" ? "text-yellow-800" : "text-green-800"
                          }`}
                        >
                          {flag.type}
                        </div>
                        <div className="text-sm text-gray-700 mt-1">{flag.message}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button
          onClick={handleNext}
          disabled={!dataRetrieved}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Risk Assessment & Scoring
        </Button>
      </div>
    </div>
  )
}
