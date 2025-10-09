"use client"

import { useAppState } from "@/lib/enhanced-state-context"
import MainLayout from "@/components/main-layout"
import OverviewStep from "@/components/overview-step"
import CompanySelectionStep from "@/components/company-selection-step"
import EnhancedDocParsingStep from "@/components/enhanced-doc-parsing-step"
import RiskDataStep from "@/components/risk-data-step"
import CombinedRiskAssessmentStep from "@/components/combined-risk-assessment-step"
import CombinedRecommendationsStep from "@/components/combined-recommendations-step"
import QuoteBindStep from "@/components/quote-bind-step"

export default function DashboardPage() {
  const { currentStep } = useAppState()

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <OverviewStep />
      case 1:
        return <CompanySelectionStep />
      case 2:
        return <EnhancedDocParsingStep />
      case 3:
        return <RiskDataStep />
      case 4:
        return <CombinedRiskAssessmentStep />
      case 5:
        return <CombinedRecommendationsStep />
      case 6:
        return <QuoteBindStep />
      default:
        return <OverviewStep />
    }
  }

  return <MainLayout>{renderStepContent()}</MainLayout>
}
