// Enhanced rules engine with more realistic underwriting rules

export interface Rule {
  id: string
  name: string
  description: string
  category: "eligibility" | "pricing" | "coverage"
  severity: "hard" | "soft" | "preference"
  evaluate: (submission: any, riskData: any) => RuleResult
}

export interface RuleResult {
  ruleId: string
  status: "pass" | "conditional" | "fail"
  rationale: string
  impact?: string
  recommendation?: string
}

// Real underwriting rules
export const underwritingRules: Rule[] = [
  {
    id: "dui_check",
    name: "DUI History Check",
    description: "No DUI convictions within 36 months",
    category: "eligibility",
    severity: "hard",
    evaluate: (submission, riskData) => {
      const hasDUI = riskData?.mvrData?.dui || false
      return {
        ruleId: "dui_check",
        status: hasDUI ? "fail" : "pass",
        rationale: hasDUI ? "DUI conviction found within 36 months" : "No DUI violations detected",
        impact: hasDUI ? "Auto-decline" : "No impact",
        recommendation: hasDUI ? "Refer to senior underwriter" : "Continue processing",
      }
    },
  },
  {
    id: "radius_check",
    name: "Operating Radius Limit",
    description: "Vehicle operating radius must be ≤ 300 miles",
    category: "eligibility",
    severity: "hard",
    evaluate: (submission, riskData) => {
      const maxRadius = Math.max(...(submission?.vehicles?.map((v) => v.radiusMiles) || [0]))
      return {
        ruleId: "radius_check",
        status: maxRadius <= 300 ? "pass" : "fail",
        rationale: `Maximum operating radius is ${maxRadius} miles`,
        impact: maxRadius > 300 ? "Outside service territory" : "Within acceptable range",
        recommendation: maxRadius > 300 ? "Decline - outside service area" : "Continue",
      }
    },
  },
  {
    id: "vehicle_age",
    name: "Vehicle Age Limit",
    description: "Vehicles must be ≤ 15 years old",
    category: "eligibility",
    severity: "soft",
    evaluate: (submission, riskData) => {
      const currentYear = new Date().getFullYear()
      const oldVehicles = submission?.vehicles?.filter((v) => currentYear - v.year > 15) || []
      return {
        ruleId: "vehicle_age",
        status: oldVehicles.length === 0 ? "pass" : "conditional",
        rationale:
          oldVehicles.length > 0
            ? `${oldVehicles.length} vehicles exceed 15-year limit`
            : "All vehicles within age limit",
        impact: oldVehicles.length > 0 ? "Higher deductible required" : "Standard terms",
        recommendation: oldVehicles.length > 0 ? "Require $2,500 minimum deductible" : "Standard deductible options",
      }
    },
  },
  {
    id: "loss_frequency",
    name: "Loss Frequency Check",
    description: "Maximum 2 losses in 36 months",
    category: "eligibility",
    severity: "soft",
    evaluate: (submission, riskData) => {
      const lossCount = submission?.priorLosses?.length || 0
      return {
        ruleId: "loss_frequency",
        status: lossCount <= 2 ? "pass" : "conditional",
        rationale: `${lossCount} losses in the past 36 months`,
        impact: lossCount > 2 ? "Experience rating surcharge" : "No surcharge",
        recommendation: lossCount > 2 ? "Apply 15% experience surcharge" : "Standard rating",
      }
    },
  },
  {
    id: "credit_score",
    name: "Business Credit Check",
    description: "Business credit score evaluation",
    category: "pricing",
    severity: "preference",
    evaluate: (submission, riskData) => {
      const creditBand = riskData?.creditBand || "B"
      const isGoodCredit = creditBand === "A"
      return {
        ruleId: "credit_score",
        status: "pass", // Credit doesn't fail, just impacts pricing
        rationale: `Business credit band: ${creditBand}`,
        impact: isGoodCredit
          ? "Credit discount available"
          : creditBand === "C"
            ? "Credit surcharge"
            : "Standard rating",
        recommendation: isGoodCredit
          ? "Apply 5% credit discount"
          : creditBand === "C"
            ? "Apply 10% credit surcharge"
            : "No adjustment",
      }
    },
  },
  {
    id: "safety_program",
    name: "Safety Program Verification",
    description: "Documented safety and training program",
    category: "pricing",
    severity: "preference",
    evaluate: (submission, riskData) => {
      // Simulate safety program detection based on company size/type
      const hasProgram = (submission?.vehicles?.length || 0) > 20 || submission?.namedInsured?.includes("Fleet")
      return {
        ruleId: "safety_program",
        status: "pass",
        rationale: hasProgram ? "Comprehensive safety program documented" : "Basic safety measures in place",
        impact: hasProgram ? "Safety program discount" : "Standard rating",
        recommendation: hasProgram ? "Apply 8% safety discount" : "Consider safety program incentive",
      }
    },
  },
]

export function evaluateAllRules(submission: any, riskData: any): RuleResult[] {
  return underwritingRules.map((rule) => rule.evaluate(submission, riskData))
}

export function determineEligibility(ruleResults: RuleResult[]): {
  status: "Eligible" | "Conditional" | "Refer" | "Decline"
  reason: string
  actions: string[]
} {
  const hardFails = ruleResults.filter(
    (r) => r.status === "fail" && underwritingRules.find((rule) => rule.id === r.ruleId)?.severity === "hard",
  )

  const softFails = ruleResults.filter((r) => r.status === "conditional")

  if (hardFails.length > 0) {
    return {
      status: "Decline",
      reason: `Hard rule violations: ${hardFails.map((r) => r.rationale).join(", ")}`,
      actions: ["Decline submission", "Send decline letter", "Suggest alternative markets"],
    }
  }

  if (softFails.length > 2) {
    return {
      status: "Refer",
      reason: `Multiple conditional issues require review: ${softFails.length} items`,
      actions: ["Refer to senior underwriter", "Request additional documentation", "Consider special terms"],
    }
  }

  if (softFails.length > 0) {
    return {
      status: "Conditional",
      reason: `Acceptable with conditions: ${softFails.length} items need attention`,
      actions: ["Apply recommended conditions", "Adjust pricing", "Issue conditional quote"],
    }
  }

  return {
    status: "Eligible",
    reason: "All eligibility requirements met",
    actions: ["Proceed to pricing", "Standard terms available", "Generate quote"],
  }
}
