"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppState } from "@/lib/enhanced-state-context"
import { useState, useRef, useEffect } from "react"
import { Loader2, CheckCircle, FileText, AlertCircle, ChevronDown, ChevronUp, Zap } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface DocumentExtractionData {
  [key: string]: {
    [docType: string]: {
      status: "pending" | "processing" | "completed" | "error"
      extractedData?: any
      confidence?: number
      description: string
    }
  }
}

const companyDocumentData: DocumentExtractionData = {
  "GLOBALLOGISTICSINC-001": {
    "ACORD 127 - Business Auto": {
      status: "pending",
      description: "Standard commercial auto application form with basic coverage details",
    },
    "ACORD 129 - Additional Insured": {
      status: "pending",
      description: "Additional insured endorsement form listing certificate holders",
    },
    "Vehicle Schedule CSV": {
      status: "pending",
      description: "Detailed spreadsheet of all company vehicles with specifications",
    },
    "Driver List CSV": {
      status: "pending",
      description: "Complete roster of all drivers with license and employment information",
    },
    "5-Year Loss History": {
      status: "pending",
      description: "Comprehensive claims history report from previous carrier",
    },
  },
  "RAPIDTRANSITCORP-002": {
    "ACORD 127 - Business Auto": {
      status: "pending",
      description: "Commercial auto application with complex fleet operations",
    },
    "ACORD 125 - Commercial Auto": {
      status: "pending",
      description: "Supplemental commercial auto form for fleet operations",
    },
    "Vehicle Schedule CSV": {
      status: "pending",
      description: "Large fleet vehicle inventory with detailed specifications",
    },
    "3-Year Loss History": {
      status: "pending",
      description: "Recent claims history showing moderate loss activity",
    },
    "Claims Detail Report": {
      status: "pending",
      description: "Detailed analysis of each claim with investigation notes",
    },
  },
  "URBANDELIVERYSOLUTIONS-003": {
    "ACORD 127 - Business Auto": {
      status: "pending",
      description: "Small fleet application with some missing information",
    },
    "Partial Driver List": {
      status: "pending",
      description: "Incomplete driver roster missing critical information",
    },
    "Vehicle Schedule CSV": {
      status: "pending",
      description: "Small fleet vehicle list with basic information",
    },
    "Incomplete Loss Data": {
      status: "pending",
      description: "Partial loss history missing some years of data",
    },
  },
  "METROTRANSPORTSERVICES-004": {
    "ACORD 127 - Business Auto": {
      status: "pending",
      description: "Commercial transportation application with high-risk indicators",
    },
    "ACORD 129 - Additional Insured": {
      status: "pending",
      description: "Additional insured requirements for transportation contracts",
    },
    "Vehicle Schedule CSV": {
      status: "pending",
      description: "Heavy truck fleet with specialized equipment",
    },
    "Driver List CSV": {
      status: "pending",
      description: "CDL driver roster with violation history",
    },
    "3-Year Loss History": {
      status: "pending",
      description: "Loss history showing recent claim activity",
    },
    "MVR Reports": {
      status: "pending",
      description: "Motor vehicle records for all drivers showing violations",
    },
  },
  "CITYFLEETSERVICES-005": {
    "ACORD 127 - Business Auto": {
      status: "pending",
      description: "Large fleet management operation with comprehensive coverage",
    },
    "ACORD 125 - Commercial Auto": {
      status: "pending",
      description: "Comprehensive fleet operations supplement",
    },
    "ACORD 129 - Additional Insured": {
      status: "pending",
      description: "Municipal and commercial client additional insured requirements",
    },
    "Vehicle Schedule CSV": {
      status: "pending",
      description: "Large diversified fleet with multiple vehicle types",
    },
    "Driver List CSV": {
      status: "pending",
      description: "Experienced driver workforce with clean records",
    },
    "5-Year Loss History": {
      status: "pending",
      description: "Excellent loss history with minimal claims",
    },
    "Claims Analysis Report": {
      status: "pending",
      description: "Detailed analysis showing excellent risk management",
    },
    "Safety Program Documentation": {
      status: "pending",
      description: "Comprehensive safety and training program documentation",
    },
  },
  "EXPRESSCOURIERCO-006": {
    "ACORD 127 - Business Auto": {
      status: "pending",
      description: "Small courier operation with concerning loss history",
    },
    "Vehicle Schedule CSV": {
      status: "pending",
      description: "Small courier fleet with high utilization",
    },
    "Driver List CSV": {
      status: "pending",
      description: "Small driver pool with turnover issues",
    },
    "3-Year Loss History": {
      status: "pending",
      description: "Concerning loss history with multiple recent claims",
    },
    "Incident Reports": {
      status: "pending",
      description: "Detailed incident reports showing patterns",
    },
  },
  // Default fallback data
  default: {
    "ACORD 127 - Business Auto": {
      status: "pending",
      description: "Standard commercial auto application form with basic coverage details",
    },
    "Vehicle Schedule CSV": {
      status: "pending",
      description: "Detailed spreadsheet of all company vehicles with specifications",
    },
    "Driver List CSV": {
      status: "pending",
      description: "Complete roster of all drivers with license and employment information",
    },
    "3-Year Loss History": {
      status: "pending",
      description: "Comprehensive claims history report from previous carrier",
    },
  },
}

// Simulated extracted data that will be "generated" during processing
const extractedDataResults: any = {
  "GLOBALLOGISTICSINC-001": {
    "ACORD 127 - Business Auto": {
      extractedData: {
        namedInsured: "Global Logistics Inc.",
        fein: "12-3456789",
        policyPeriod: "09/01/2025 - 09/01/2026",
        businessDescription: "Transportation and logistics services specializing in regional freight delivery",
        mailingAddress: "123 Industrial Blvd, Los Angeles, CA 90210",
        garageAddress: "123 Industrial Blvd, Los Angeles, CA 90210",
        businessType: "Transportation & Logistics",
        yearsInBusiness: 8,
        vehicles: [
          { vin: "1HGBH41JXMN109186", year: 2020, make: "Ford", model: "Transit", gvw: 8500, usage: "Service" },
          { vin: "2HGBH41JXMN109187", year: 2019, make: "Chevrolet", model: "Express", gvw: 9200, usage: "Delivery" },
        ],
        drivers: [
          { name: "John Smith", dlNumber: "DL1234567", state: "CA", dob: "1985-03-15", hireDate: "2020-01-15" },
          { name: "Sarah Johnson", dlNumber: "DL2345678", state: "CA", dob: "1990-07-22", hireDate: "2021-06-01" },
        ],
        requestedLimits: "$1,000,000 CSL",
        requestedDeductible: "$1,000",
        priorCarrier: "ABC Insurance Company",
        priorPremium: "$11,500",
      },
      confidence: 95,
    },
    "ACORD 129 - Additional Insured": {
      extractedData: {
        additionalInsureds: [
          { name: "Metro Construction LLC", relationship: "General Contractor", certificate: "Required" },
          { name: "City Port Authority", relationship: "Facility Owner", certificate: "Required" },
        ],
        endorsementType: "Blanket Additional Insured",
        effectiveDate: "09/01/2025",
        certificateRequirements: "30-day notice of cancellation required",
      },
      confidence: 92,
    },
    "Vehicle Schedule CSV": {
      extractedData: {
        totalVehicles: 15,
        vehicleBreakdown: {
          "Delivery Van": 8,
          "Box Truck": 4,
          "Pickup Truck": 3,
        },
        averageAge: 4.2,
        averageGVW: 8750,
        garagingAddress: "123 Industrial Blvd, Los Angeles, CA 90210",
        radiusMiles: 150,
        usage: "Service and delivery operations within 150-mile radius",
        antiTheftDevices: "12 vehicles equipped with GPS tracking and alarm systems",
        ownership: "10 owned, 5 leased",
      },
      confidence: 94,
    },
    "Driver List CSV": {
      extractedData: {
        totalDrivers: 12,
        driverBreakdown: {
          "Full-time": 10,
          "Part-time": 2,
        },
        averageAge: 34,
        averageExperience: 6.5,
        completeness: "100%",
        allLicensesValid: true,
        cdlRequired: 3,
        backgroundChecks: "All completed within 90 days",
      },
      confidence: 96,
    },
    "5-Year Loss History": {
      extractedData: {
        totalLosses: 0,
        lossFrequency: 0,
        experienceModifier: 1.0,
        claimsHistory: "No claims reported in the past 5 years",
        lossRatio: "N/A - No losses",
        priorCarrierRating: "Preferred account with clean record",
        reserveHistory: "No outstanding reserves",
      },
      confidence: 98,
    },
  },
  "RAPIDTRANSITCORP-002": {
    "ACORD 127 - Business Auto": {
      extractedData: {
        namedInsured: "Rapid Transit Corp",
        fein: "23-4567890",
        policyPeriod: "09/01/2025 - 09/01/2026",
        businessDescription: "Commercial delivery and freight services operating across multiple states",
        mailingAddress: "456 Commerce Dr, Dallas, TX 75201",
        garageAddress: "456 Commerce Dr, Dallas, TX 75201",
        businessType: "Delivery Services",
        yearsInBusiness: 15,
        vehicles: [
          {
            vin: "3HGBH41JXMN109188",
            year: 2018,
            make: "Freightliner",
            model: "Sprinter",
            gvw: 10000,
            usage: "Delivery",
          },
          { vin: "4HGBH41JXMN109189", year: 2017, make: "Ford", model: "E-350", gvw: 9500, usage: "Service" },
        ],
        drivers: [
          { name: "Mike Wilson", dlNumber: "DL3456789", state: "TX", dob: "1988-12-10", hireDate: "2018-03-01" },
          { name: "Lisa Brown", dlNumber: "DL4567890", state: "TX", dob: "1992-05-18", hireDate: "2020-07-15" },
        ],
        requestedLimits: "$1,000,000 CSL",
        requestedDeductible: "$2,500",
        priorCarrier: "XYZ Insurance Group",
        priorPremium: "$28,750",
      },
      confidence: 88,
    },
    "ACORD 125 - Commercial Auto": {
      extractedData: {
        fleetSize: 45,
        operatingRadius: 500,
        interstateOperations: true,
        hazmatTransport: false,
        seasonalOperations: false,
        garageLocations: ["Dallas, TX", "Houston, TX", "Austin, TX"],
        maintenanceProgram: "Preventive maintenance every 5,000 miles",
      },
      confidence: 90,
    },
    "Vehicle Schedule CSV": {
      extractedData: {
        totalVehicles: 45,
        vehicleBreakdown: {
          "Delivery Van": 20,
          "Box Truck": 15,
          "Tractor Trailer": 8,
          "Pickup Truck": 2,
        },
        averageAge: 6.8,
        averageGVW: 12500,
        garagingAddresses: ["456 Commerce Dr, Dallas, TX", "789 Industrial Way, Houston, TX"],
        radiusMiles: 500,
        usage: "Interstate delivery and freight operations",
        antiTheftDevices: "All vehicles equipped with GPS tracking, 30 with alarm systems",
        ownership: "35 owned, 10 leased",
      },
      confidence: 91,
    },
    "3-Year Loss History": {
      extractedData: {
        totalLosses: 3,
        lossFrequency: 1.2,
        experienceModifier: 1.15,
        claimsHistory: [
          { date: "2023-08-15", amount: 15000, description: "Rear-end collision on I-35", status: "Closed" },
          { date: "2022-11-22", amount: 8500, description: "Vandalism at Houston terminal", status: "Closed" },
          { date: "2022-03-10", amount: 12000, description: "Theft of cargo in Dallas", status: "Closed" },
        ],
        lossRatio: "65%",
        totalIncurred: 35500,
        reserveHistory: "No outstanding reserves",
      },
      confidence: 94,
    },
    "Claims Detail Report": {
      extractedData: {
        claimAnalysis: {
          "Collision Claims": 1,
          "Theft Claims": 1,
          "Vandalism Claims": 1,
        },
        investigationNotes: "All claims properly investigated, no fraud indicators",
        recoveries: "$2,500 recovered from theft claim",
        preventiveMeasures: "Enhanced security protocols implemented after theft",
      },
      confidence: 89,
    },
  },
  // Default fallback data
  default: {
    "ACORD 127 - Business Auto": {
      extractedData: {
        namedInsured: "Sample Company",
        fein: "12-3456789",
        policyPeriod: "09/01/2025 - 09/01/2026",
        businessDescription: "Commercial transportation services",
        mailingAddress: "123 Business St, City, State 12345",
        garageAddress: "123 Business St, City, State 12345",
        businessType: "Transportation",
        yearsInBusiness: 5,
        vehicles: [
          { vin: "1HGBH41JXMN109186", year: 2020, make: "Ford", model: "Transit", gvw: 8500, usage: "Service" },
        ],
        drivers: [{ name: "John Doe", dlNumber: "DL1234567", state: "CA", dob: "1985-03-15", hireDate: "2020-01-15" }],
        requestedLimits: "$1,000,000 CSL",
        requestedDeductible: "$1,000",
        priorCarrier: "Previous Insurance Company",
        priorPremium: "$10,000",
      },
      confidence: 85,
    },
    "Vehicle Schedule CSV": {
      extractedData: {
        totalVehicles: 5,
        vehicleBreakdown: {
          "Delivery Van": 3,
          "Pickup Truck": 2,
        },
        averageAge: 3.5,
        averageGVW: 7500,
        garagingAddress: "123 Business St, City, State 12345",
        radiusMiles: 100,
        usage: "Local delivery operations",
        antiTheftDevices: "GPS tracking on all vehicles",
        ownership: "4 owned, 1 leased",
      },
      confidence: 90,
    },
    "Driver List CSV": {
      extractedData: {
        totalDrivers: 5,
        driverBreakdown: {
          "Full-time": 4,
          "Part-time": 1,
        },
        averageAge: 32,
        averageExperience: 5.0,
        completeness: "100%",
        allLicensesValid: true,
        cdlRequired: 0,
        backgroundChecks: "All completed within 90 days",
      },
      confidence: 92,
    },
    "3-Year Loss History": {
      extractedData: {
        totalLosses: 1,
        lossFrequency: 0.3,
        experienceModifier: 1.05,
        claimsHistory: [{ date: "2023-05-15", amount: 5000, description: "Minor collision", status: "Closed" }],
        lossRatio: "25%",
        totalIncurred: 5000,
        reserveHistory: "No outstanding reserves",
      },
      confidence: 88,
    },
  },
}

export default function EnhancedDocParsingStep() {
  const { setCurrentStep, setCompletedStep, submissionData } = useAppState()
  const [documentStatus, setDocumentStatus] = useState<DocumentExtractionData>(companyDocumentData)
  const [isProcessingAll, setIsProcessingAll] = useState(false)
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set())
  const [overallProgress, setOverallProgress] = useState(0)
  const [currentProcessingDoc, setCurrentProcessingDoc] = useState<string | null>(null)
  const documentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Get company ID from submission data with proper fallback
  const getCompanyId = () => {
    if (!submissionData?.id) {
      console.log("No submission data ID found, using default")
      return "default"
    }

    const companyId = submissionData.id
    console.log("Company ID from submission data:", companyId)

    // Check if the company ID exists in our document data
    if (companyDocumentData[companyId]) {
      return companyId
    }

    // Fallback to default if company ID not found
    console.log("Company ID not found in document data, using default")
    return "default"
  }

  const companyId = getCompanyId()
  const currentCompanyDocs = documentStatus[companyId] || documentStatus["default"]

  // Auto-scroll to current processing document
  useEffect(() => {
    if (currentProcessingDoc && documentRefs.current[currentProcessingDoc]) {
      const element = documentRefs.current[currentProcessingDoc]
      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      })
    }
  }, [currentProcessingDoc])

  const handleProcessAllDocuments = async () => {
    setIsProcessingAll(true)
    setOverallProgress(0)

    const docTypes = Object.keys(currentCompanyDocs)
    const totalDocs = docTypes.length

    // Process documents sequentially
    for (let i = 0; i < docTypes.length; i++) {
      const docType = docTypes[i]
      setCurrentProcessingDoc(docType)

      // Set current document to processing
      setDocumentStatus((prev) => ({
        ...prev,
        [companyId]: {
          ...prev[companyId],
          [docType]: {
            ...prev[companyId][docType],
            status: "processing" as const,
          },
        },
      }))

      // Simulate AI processing time (2-4 seconds per document)
      const processingTime = Math.random() * 2000 + 2000
      await new Promise((resolve) => setTimeout(resolve, processingTime))

      // Get the extracted data for this document
      const extractedResult = extractedDataResults[companyId]?.[docType] ||
        extractedDataResults["default"]?.[docType] || {
          extractedData: { message: "Sample extracted data for " + docType },
          confidence: Math.floor(Math.random() * 20) + 80, // Random confidence 80-99%
        }

      // Complete this document with extracted data
      setDocumentStatus((prev) => ({
        ...prev,
        [companyId]: {
          ...prev[companyId],
          [docType]: {
            ...prev[companyId][docType],
            status: "completed" as const,
            extractedData: extractedResult.extractedData,
            confidence: extractedResult.confidence,
          },
        },
      }))

      // Auto-expand the completed document
      setExpandedDocs((prev) => new Set(prev).add(docType))

      // Update progress
      const progress = Math.round(((i + 1) / totalDocs) * 100)
      setOverallProgress(progress)

      // Small delay before processing next document
      if (i < docTypes.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }

    setCurrentProcessingDoc(null)
    setIsProcessingAll(false)
  }

  const toggleExpanded = (docType: string) => {
    setExpandedDocs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(docType)) {
        newSet.delete(docType)
      } else {
        newSet.add(docType)
      }
      return newSet
    })
  }

  const handleNext = () => {
    setCompletedStep(2) // Mark Doc Parsing as complete
    setCurrentStep(3) // Move to Risk Data
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <FileText className="w-4 h-4 text-gray-400" />
      case "processing":
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-700">Processing...</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const renderExtractedData = (docType: string, docData: any) => {
    if (!docData.extractedData) return null

    return (
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        {docType.includes("ACORD 127") && (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Named Insured:</span>
                <p className="text-gray-900">{docData.extractedData.namedInsured}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">FEIN:</span>
                <p className="text-gray-900">{docData.extractedData.fein}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Policy Period:</span>
                <p className="text-gray-900">{docData.extractedData.policyPeriod}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Years in Business:</span>
                <p className="text-gray-900">{docData.extractedData.yearsInBusiness}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Requested Limits:</span>
                <p className="text-gray-900">{docData.extractedData.requestedLimits}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Requested Deductible:</span>
                <p className="text-gray-900">{docData.extractedData.requestedDeductible}</p>
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Business Description:</span>
              <p className="text-gray-900">{docData.extractedData.businessDescription}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Prior Carrier:</span>
              <p className="text-gray-900">{docData.extractedData.priorCarrier}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Vehicles Found:</span>
                <p className="text-gray-900">{docData.extractedData.vehicles?.length || 0} vehicles</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Drivers Found:</span>
                <p className="text-gray-900">{docData.extractedData.drivers?.length || 0} drivers</p>
              </div>
            </div>
          </>
        )}

        {docType.includes("Vehicle Schedule") && (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Total Vehicles:</span>
                <p className="text-gray-900">{docData.extractedData.totalVehicles}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Average Age:</span>
                <p className="text-gray-900">{docData.extractedData.averageAge} years</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Average GVW:</span>
                <p className="text-gray-900">{docData.extractedData.averageGVW?.toLocaleString()} lbs</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Radius:</span>
                <p className="text-gray-900">{docData.extractedData.radiusMiles} miles</p>
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Vehicle Breakdown:</span>
              <div className="mt-1">
                {Object.entries(docData.extractedData.vehicleBreakdown || {}).map(([type, count]) => (
                  <p key={type} className="text-gray-900 text-sm">
                    • {type}: {count as number}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Usage:</span>
              <p className="text-gray-900">{docData.extractedData.usage}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Ownership:</span>
              <p className="text-gray-900">{docData.extractedData.ownership}</p>
            </div>
          </>
        )}

        {docType.includes("Loss") && (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Total Losses:</span>
                <p className="text-gray-900">{docData.extractedData.totalLosses}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Loss Ratio:</span>
                <p className="text-gray-900">{docData.extractedData.lossRatio}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Experience Mod:</span>
                <p className="text-gray-900">{docData.extractedData.experienceModifier}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Loss Frequency:</span>
                <p className="text-gray-900">{docData.extractedData.lossFrequency}</p>
              </div>
            </div>
            {docData.extractedData.claimsHistory && Array.isArray(docData.extractedData.claimsHistory) && (
              <div>
                <span className="font-medium text-gray-700">Recent Claims:</span>
                <div className="mt-1 space-y-1">
                  {docData.extractedData.claimsHistory.map((claim: any, index: number) => (
                    <p key={index} className="text-gray-900 text-sm">
                      • {claim.date}: ${claim.amount?.toLocaleString()} - {claim.description}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {docType.includes("Driver") && (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Total Drivers:</span>
                <p className="text-gray-900">{docData.extractedData.totalDrivers}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Completeness:</span>
                <p className="text-gray-900">{docData.extractedData.completeness}</p>
              </div>
            </div>
            {docData.extractedData.driverBreakdown && (
              <div>
                <span className="font-medium text-gray-700">Driver Breakdown:</span>
                <div className="mt-1">
                  {Object.entries(docData.extractedData.driverBreakdown).map(([type, count]) => (
                    <p key={type} className="text-gray-900 text-sm">
                      • {type}: {count as number}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {docData.extractedData.missingInformation && (
              <div>
                <span className="font-medium text-gray-700">Missing Information:</span>
                <ul className="list-disc list-inside text-gray-900 text-sm mt-1">
                  {docData.extractedData.missingInformation.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {docType.includes("ACORD 129") && (
          <>
            <div>
              <span className="font-medium text-gray-700">Endorsement Type:</span>
              <p className="text-gray-900">{docData.extractedData.endorsementType}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Additional Insureds:</span>
              <div className="mt-1 space-y-1">
                {docData.extractedData.additionalInsureds?.map((ai: any, index: number) => (
                  <p key={index} className="text-gray-900 text-sm">
                    • {ai.name} ({ai.relationship})
                  </p>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Certificate Requirements:</span>
              <p className="text-gray-900">{docData.extractedData.certificateRequirements}</p>
            </div>
          </>
        )}

        {docType.includes("ACORD 125") && (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Fleet Size:</span>
                <p className="text-gray-900">{docData.extractedData.fleetSize}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Operating Radius:</span>
                <p className="text-gray-900">{docData.extractedData.operatingRadius} miles</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Interstate Operations:</span>
                <p className="text-gray-900">{docData.extractedData.interstateOperations ? "Yes" : "No"}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Hazmat Transport:</span>
                <p className="text-gray-900">{docData.extractedData.hazmatTransport ? "Yes" : "No"}</p>
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Maintenance Program:</span>
              <p className="text-gray-900">{docData.extractedData.maintenanceProgram}</p>
            </div>
          </>
        )}

        {/* Fallback for other document types */}
        {!docType.includes("ACORD") &&
          !docType.includes("Vehicle") &&
          !docType.includes("Loss") &&
          !docType.includes("Driver") && (
            <div>
              <span className="font-medium text-gray-700">Extracted Information:</span>
              <pre className="text-sm text-gray-900 mt-2 whitespace-pre-wrap">
                {JSON.stringify(docData.extractedData, null, 2)}
              </pre>
            </div>
          )}
      </div>
    )
  }

  const allCompleted = Object.values(currentCompanyDocs).every((doc) => doc.status === "completed")
  const anyPending = Object.values(currentCompanyDocs).some((doc) => doc.status === "pending")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doc Parsing & Prefill</h1>
          <p className="text-gray-600 mt-2">
            AI-powered document extraction from{" "}
            <span className="font-semibold text-blue-700">{submissionData?.namedInsured || "selected company"}</span>{" "}
            documents.
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Step 3 of 7
        </Badge>
      </div>

      <div className="space-y-6">
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Document Processing - {submissionData?.namedInsured || "Selected Company"}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {Object.keys(currentCompanyDocs).length} documents available for processing
                </p>
              </div>
              {anyPending && !isProcessingAll && (
                <Button
                  onClick={handleProcessAllDocuments}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Extract All with AI
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {isProcessingAll && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  <div>
                    <p className="font-medium text-blue-800">AI Extraction in Progress</p>
                    <p className="text-sm text-blue-600">
                      {currentProcessingDoc
                        ? `Currently processing: ${currentProcessingDoc}`
                        : "Processing documents sequentially..."}
                    </p>
                  </div>
                </div>
                <Progress value={overallProgress} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
                <p className="text-xs text-blue-600 mt-2">{overallProgress}% complete</p>
              </div>
            )}

            {Object.entries(currentCompanyDocs).map(([docType, docData]) => (
              <div
                key={docType}
                className={`border rounded-lg ${currentProcessingDoc === docType ? "border-blue-300 bg-blue-50" : ""}`}
                ref={(el) => (documentRefs.current[docType] = el)}
              >
                <div className="flex flex-col space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(docData.status)}
                      <div>
                        <p className="font-medium text-gray-900">{docType}</p>
                        {docData.confidence && (
                          <p className="text-xs text-gray-500">Confidence: {docData.confidence}%</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(docData.status)}
                      {docData.status === "completed" && docData.extractedData && (
                        <Collapsible>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleExpanded(docType)}
                              className="flex items-center space-x-1 bg-transparent"
                            >
                              <span>View Data</span>
                              {expandedDocs.has(docType) ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </Collapsible>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 ml-7">{docData.description}</p>
                </div>

                {/* Extracted Data Section - Only shows after extraction is complete */}
                {docData.status === "completed" && docData.extractedData && expandedDocs.has(docType) && (
                  <Collapsible open={expandedDocs.has(docType)}>
                    <CollapsibleContent>
                      <div className="border-t bg-gray-50 p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Extracted Data from {docType}</h4>
                        {renderExtractedData(docType, docData)}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button
          onClick={handleNext}
          disabled={!allCompleted}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {allCompleted ? "Proceed to Risk Data" : "Complete All Extractions First"}
        </Button>
      </div>
    </div>
  )
}
