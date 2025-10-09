// Data simulation utilities for realistic underwriting scenarios

export interface SubmissionData {
  id: string
  namedInsured: string
  fein: string
  effectiveDate: string
  testScenario: "clean-risk" | "incomplete-docs" | "high-risk-driver" | "adverse-loss"
  drivers: Driver[]
  vehicles: Vehicle[]
  priorLosses: Loss[]
  territory: number
  classFactor: number
}

export interface Driver {
  firstName: string
  lastName: string
  dlNumber: string
  state: string
  dob: string
  hireDate: string
  mvrPoints: number
  violationsCount: number
}

export interface Vehicle {
  vin: string
  year: number
  make: string
  model: string
  gvw: number
  usage: string
  radiusMiles: number
  garageZip: string
  antiTheft: boolean
  ownership: string
}

export interface Loss {
  date: string
  amount: number
  description: string
  status: string
}

export interface RiskData {
  mvrData: {
    points: number
    violations: string[]
    dui: boolean
  }
  creditBand: "A" | "B" | "C"
  telematicsData: {
    harshBrakingPercent: number
    speedingPercent: number
    nightDrivingPercent: number
  }
  territoryFactor: number
  perilScores: {
    hail: number
    wind: number
    flood: number
    crime: number
  }
}

export function generateSubmissionId(): string {
  const now = new Date()
  const yy = now.getFullYear().toString().slice(-2)
  const mm = (now.getMonth() + 1).toString().padStart(2, "0")
  const random4 = Math.floor(1000 + Math.random() * 9000)
  return `SUB-${yy}${mm}${random4}`
}

export function generatePolicyId(): string {
  const random6 = Math.floor(100000 + Math.random() * 900000)
  return `POL-${random6}`
}

export function getScenarioData(scenario: string): Partial<SubmissionData> {
  const baseData = {
    namedInsured: "Global Logistics Inc.",
    fein: "12-3456789",
    effectiveDate: "2025-09-01",
    drivers: [
      {
        firstName: "John",
        lastName: "Smith",
        dlNumber: "DL1234567",
        state: "CA",
        dob: "1985-03-15",
        hireDate: "2020-01-15",
        mvrPoints: 0,
        violationsCount: 0,
      },
      {
        firstName: "Sarah",
        lastName: "Johnson",
        dlNumber: "DL2345678",
        state: "CA",
        dob: "1990-07-22",
        hireDate: "2021-06-01",
        mvrPoints: 2,
        violationsCount: 1,
      },
    ],
    vehicles: [
      {
        vin: "1HGBH41JXMN109186",
        year: 2020,
        make: "Ford",
        model: "Transit",
        gvw: 8500,
        usage: "Service",
        radiusMiles: 150,
        garageZip: "90210",
        antiTheft: true,
        ownership: "Owned",
      },
      {
        vin: "2HGBH41JXMN109187",
        year: 2019,
        make: "Chevrolet",
        model: "Express",
        gvw: 9200,
        usage: "Delivery",
        radiusMiles: 200,
        garageZip: "90210",
        antiTheft: false,
        ownership: "Leased",
      },
    ],
    priorLosses: [],
    territory: 1.0,
    classFactor: 1.0,
  }

  switch (scenario) {
    case "clean-risk":
      return {
        ...baseData,
        priorLosses: [],
      }

    case "incomplete-docs":
      return {
        ...baseData,
        drivers: baseData.drivers.map((d) => ({ ...d, dlNumber: "", mvrPoints: 0 })),
      }

    case "high-risk-driver":
      return {
        ...baseData,
        drivers: [
          ...baseData.drivers,
          {
            firstName: "Mike",
            lastName: "Wilson",
            dlNumber: "DL3456789",
            state: "CA",
            dob: "1988-12-10",
            hireDate: "2023-01-01",
            mvrPoints: 8,
            violationsCount: 3,
          },
        ],
        territory: 1.1,
        classFactor: 1.1,
      }

    case "adverse-loss":
      return {
        ...baseData,
        priorLosses: [
          {
            date: "2023-05-15",
            amount: 15000,
            description: "Rear-end collision",
            status: "Closed",
          },
          {
            date: "2022-11-22",
            amount: 8500,
            description: "Vandalism",
            status: "Closed",
          },
        ],
        territory: 1.05,
        classFactor: 1.05,
      }

    default:
      return baseData
  }
}

export function calculateUnderwritingScore(data: SubmissionData, riskData: RiskData): number {
  let score = 25 // Base score

  // MVR factors
  const totalMvrPoints = data.drivers.reduce((sum, driver) => sum + driver.mvrPoints, 0)
  score += totalMvrPoints * 2

  // DUI check
  if (riskData.mvrData.dui) {
    score += 25
  }

  // Credit band
  switch (riskData.creditBand) {
    case "A":
      score -= 5
      break
    case "B":
      score += 0
      break
    case "C":
      score += 10
      break
  }

  // Telematics
  score += riskData.telematicsData.harshBrakingPercent * 0.5
  score += riskData.telematicsData.speedingPercent * 0.3

  // Territory
  score += (riskData.territoryFactor - 1) * 20

  // Prior losses
  score += data.priorLosses.length * 8

  // Vehicle factors
  const oldVehicles = data.vehicles.filter((v) => new Date().getFullYear() - v.year > 10)
  score += oldVehicles.length * 3

  return Math.min(Math.max(Math.round(score), 0), 100)
}

export function calculatePremium(
  data: SubmissionData,
  riskData: RiskData,
  options: {
    deductible: number
    limits: string
    endorsements: string[]
    credits: string[]
  },
): { premium: number; breakdown: any } {
  const baseRate = 1200
  const exposure = data.vehicles.length
  const territory = riskData.territoryFactor
  const classFactor = data.classFactor

  // Schedule debit/credit based on risk factors
  let scheduleModifier = 0
  if (riskData.mvrData.dui) scheduleModifier += 0.15
  if (riskData.creditBand === "C") scheduleModifier += 0.05
  if (data.priorLosses.length > 1) scheduleModifier += 0.08

  // Deductible credit
  let deductibleCredit = 0
  if (options.deductible > 1000) {
    deductibleCredit = (options.deductible - 1000) * 0.0002
  }

  // Limits factor
  let limitsFactor = 1.0
  switch (options.limits) {
    case "$100k/$300k":
      limitsFactor = 1.1
      break
    case "$250k/$500k":
      limitsFactor = 1.25
      break
    case "$1M CSL":
      limitsFactor = 1.4
      break
  }

  // Endorsement costs
  let endorsementCost = 0
  if (options.endorsements.includes("hired-non-owned")) endorsementCost += 150
  if (options.endorsements.includes("drive-other-car")) endorsementCost += 75
  if (options.endorsements.includes("towing")) endorsementCost += 50
  if (options.endorsements.includes("rental")) endorsementCost += 100

  // Credits
  let totalCredits = 0
  if (options.credits.includes("telematics")) totalCredits += 100
  if (options.credits.includes("driver-training")) totalCredits += 50

  const basePremium = baseRate * exposure * territory * classFactor * limitsFactor
  const modifiedPremium = basePremium * (1 + scheduleModifier - deductibleCredit)
  const finalPremium = modifiedPremium + endorsementCost - totalCredits + 50 // fees

  return {
    premium: Math.round(finalPremium),
    breakdown: {
      baseRate,
      exposure,
      territory,
      classFactor,
      limitsFactor,
      scheduleModifier,
      deductibleCredit,
      endorsementCost,
      totalCredits,
      fees: 50,
    },
  }
}

export function evaluateRules(
  data: SubmissionData,
  riskData: RiskData,
): Array<{
  rule: string
  status: "pass" | "conditional" | "fail"
  rationale: string
}> {
  const rules = []

  // Radius check
  const maxRadius = Math.max(...data.vehicles.map((v) => v.radiusMiles))
  rules.push({
    rule: "Radius ≤ 300 miles",
    status: maxRadius <= 300 ? "pass" : "fail",
    rationale: `Maximum radius is ${maxRadius} miles`,
  })

  // DUI check
  rules.push({
    rule: "Any DUI in last 3 years",
    status: riskData.mvrData.dui ? "fail" : "pass",
    rationale: riskData.mvrData.dui ? "DUI found in MVR" : "No DUI violations found",
  })

  // GVW check
  const maxGvw = Math.max(...data.vehicles.map((v) => v.gvw))
  rules.push({
    rule: "Vehicle GVW ≤ 26,000",
    status: maxGvw <= 26000 ? "pass" : "fail",
    rationale: `Maximum GVW is ${maxGvw.toLocaleString()} lbs`,
  })

  // Loss frequency
  rules.push({
    rule: "Loss frequency ≤ 2 in 36 months",
    status: data.priorLosses.length <= 2 ? "pass" : "conditional",
    rationale: `${data.priorLosses.length} losses in period`,
  })

  // Telematics eligibility
  rules.push({
    rule: "Telematics enrolled",
    status: "conditional",
    rationale: "Credit available if enrolled",
  })

  // Territory check
  rules.push({
    rule: "Garage ZIP in restricted territory",
    status: riskData.territoryFactor > 1.05 ? "conditional" : "pass",
    rationale: `Territory factor: ${riskData.territoryFactor}`,
  })

  return rules
}

export function getEligibilityStatus(
  rules: ReturnType<typeof evaluateRules>,
  score: number,
): "Eligible" | "Conditional" | "Refer" | "Decline" {
  const hasFailures = rules.some((r) => r.status === "fail")
  const hasConditionals = rules.some((r) => r.status === "conditional")

  if (hasFailures || score >= 75) return "Decline"
  if (score >= 60 || hasConditionals) return "Conditional"
  if (score >= 40) return "Eligible"
  return "Eligible"
}

export function getTierRecommendation(score: number): "Preferred" | "Standard" | "Non-Standard" {
  if (score < 40) return "Preferred"
  if (score < 60) return "Standard"
  return "Non-Standard"
}

export function getScoreDrivers(
  data: SubmissionData,
  riskData: RiskData,
): Array<{ factor: string; impact: number; description: string }> {
  const drivers = []

  const totalMvrPoints = data.drivers.reduce((sum, driver) => sum + driver.mvrPoints, 0)
  if (totalMvrPoints > 0) {
    drivers.push({
      factor: "MVR violations",
      impact: totalMvrPoints * 2,
      description: `${totalMvrPoints} total points across drivers`,
    })
  }

  if (riskData.telematicsData.harshBrakingPercent > 5) {
    drivers.push({
      factor: "Telematics harsh events",
      impact: Math.round(riskData.telematicsData.harshBrakingPercent * 0.5),
      description: `${riskData.telematicsData.harshBrakingPercent}% harsh braking events`,
    })
  }

  if (riskData.creditBand === "A") {
    drivers.push({
      factor: "Credit band",
      impact: -5,
      description: "Excellent credit rating",
    })
  } else if (riskData.creditBand === "C") {
    drivers.push({
      factor: "Credit band",
      impact: 10,
      description: "Below average credit rating",
    })
  }

  if (riskData.territoryFactor !== 1.0) {
    drivers.push({
      factor: "Territory factor",
      impact: Math.round((riskData.territoryFactor - 1) * 20),
      description: `Territory multiplier: ${riskData.territoryFactor}`,
    })
  }

  if (data.priorLosses.length > 0) {
    drivers.push({
      factor: "Loss frequency",
      impact: data.priorLosses.length * 8,
      description: `${data.priorLosses.length} losses in 36 months`,
    })
  }

  return drivers
}
