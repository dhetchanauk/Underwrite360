"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, DollarSign, AlertTriangle, FileText, ChevronRight } from "lucide-react"
import { useAppState } from "@/lib/enhanced-state-context"

const companies = [
  {
    id: 1,
    name: "Global Logistics Inc.",
    businessType: "Freight Transportation",
    employees: 125,
    annualRevenue: "$8.5M",
    priorClaims: 3,
    lastClaimDate: "2024-02-15",
    riskProfile: "High",
    scenario: "high-risk-driver",
    documents: [
      "ACORD 127 - Business Auto",
      "ACORD 129 - Additional Insured",
      "Vehicle Schedule (CSV)",
      "Driver List (CSV)",
      "3-Year Loss History",
      "Claims Detail Report",
      "MVR Reports",
    ],
  },
  {
    id: 2,
    name: "Rapid Transit Corp",
    businessType: "Public Transportation",
    employees: 89,
    annualRevenue: "$6.2M",
    priorClaims: 5,
    lastClaimDate: "2024-01-22",
    riskProfile: "High",
    scenario: "adverse-loss",
    documents: [
      "ACORD 127 - Business Auto",
      "Vehicle Schedule (CSV)",
      "Driver List (CSV)",
      "5-Year Loss History",
      "Safety Program Documentation",
    ],
  },
  {
    id: 3,
    name: "Urban Delivery Solutions",
    businessType: "Package Delivery",
    employees: 67,
    annualRevenue: "$4.1M",
    priorClaims: 1,
    lastClaimDate: "2023-08-10",
    riskProfile: "Medium",
    scenario: "incomplete-docs",
    documents: ["ACORD 127 - Business Auto", "Vehicle Schedule (CSV)", "Driver List (Partial)"],
  },
  {
    id: 4,
    name: "Metro Transport Services",
    businessType: "Commercial Transportation",
    employees: 156,
    annualRevenue: "$12.3M",
    priorClaims: 2,
    lastClaimDate: "2023-11-05",
    riskProfile: "High",
    scenario: "high-risk-driver",
    documents: [
      "ACORD 127 - Business Auto",
      "ACORD 129 - Additional Insured",
      "Vehicle Schedule (CSV)",
      "Driver List (CSV)",
      "3-Year Loss History",
      "MVR Reports",
    ],
  },
  {
    id: 5,
    name: "City Fleet Services",
    businessType: "Fleet Management",
    employees: 203,
    annualRevenue: "$15.7M",
    priorClaims: 0,
    lastClaimDate: "None",
    riskProfile: "Low",
    scenario: "large-fleet",
    documents: [
      "ACORD 127 - Business Auto",
      "Vehicle Schedule (CSV)",
      "Driver List (CSV)",
      "Safety Program Documentation",
      "Telematics Data",
    ],
  },
  {
    id: 6,
    name: "Express Courier Co.",
    businessType: "Express Delivery",
    employees: 45,
    annualRevenue: "$2.8M",
    priorClaims: 4,
    lastClaimDate: "2024-03-01",
    riskProfile: "High",
    scenario: "small-fleet-high-risk",
    documents: ["ACORD 127 - Business Auto", "Vehicle Schedule (CSV)", "Driver List (CSV)", "3-Year Loss History"],
  },
]

export default function CompanySelectionStep() {
  const { setCurrentStep, setCompletedStep, setTestScenario, setSubmissionData, submissionData } = useAppState()
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null)

  const handleSelectCompany = (companyId: number) => {
    setSelectedCompany(companyId)
    const company = companies.find((c) => c.id === companyId)
    if (company) {
      setTestScenario(company.scenario)

      // Update submission data with selected company information
      const updatedSubmissionData = {
        ...submissionData,
        id: `${company.name.replace(/[^A-Z0-9]/gi, "").toUpperCase()}-${String(companyId).padStart(3, "0")}`,
        namedInsured: company.name,
        businessType: company.businessType,
        employees: company.employees,
        annualRevenue: company.annualRevenue,
        priorClaims: company.priorClaims,
        lastClaimDate: company.lastClaimDate,
        riskProfile: company.riskProfile,
        testScenario: company.scenario as any,
        territory: 1.0,
        classFactor: 1.0,
      }

      setSubmissionData(updatedSubmissionData as any)
    }
  }

  const handleProcessCompany = () => {
    if (selectedCompany) {
      setCompletedStep(1)
      setCurrentStep(2)
    }
  }

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Selection</h1>
          <p className="text-gray-600 mt-2">Select a company to process for underwriting</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Step 2 of 7
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card
            key={company.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedCompany === company.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
            }`}
            onClick={() => handleSelectCompany(company.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">{company.name}</CardTitle>
                <Badge className={`text-xs px-2 py-1 ${getRiskBadgeColor(company.riskProfile)}`}>
                  {company.riskProfile}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{company.businessType}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{company.employees} employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{company.annualRevenue}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-600">{company.priorClaims} prior claims</span>
                </div>
                <div className="text-xs text-gray-500">Last claim: {company.lastClaimDate}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-gray-700">Documents Available:</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  {company.documents.slice(0, 3).map((doc, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>{doc}</span>
                    </div>
                  ))}
                  {company.documents.length > 3 && (
                    <div className="text-blue-600">+{company.documents.length - 3} more documents</div>
                  )}
                </div>
              </div>

              {selectedCompany === company.id && (
                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">Selected for processing</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCompany && (
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button
            onClick={handleProcessCompany}
            size="lg"
            className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white shadow-md flex items-center gap-2"
          >
            Process Selected Company
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
