"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/lib/enhanced-state-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const monthlyChartData = [
  { month: "Jan", processed: 45 },
  { month: "Feb", processed: 52 },
  { month: "Mar", processed: 48 },
  { month: "Apr", processed: 61 },
  { month: "May", processed: 55 },
  { month: "Jun", processed: 67 },
  { month: "Jul", processed: 58 },
  { month: "Aug", processed: 63 },
  { month: "Sep", processed: 71 },
  { month: "Oct", processed: 69 },
  { month: "Nov", processed: 74 },
  { month: "Dec", processed: 68 },
]

export default function OverviewStep() {
  const { setCurrentStep, setCompletedStep } = useAppState()

  const handleGoToCompanySelection = () => {
    setCompletedStep(0) // Mark Overview as complete
    setCurrentStep(1) // Move to Company Selection
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Overview</h2>
      <p className="text-gray-600">Smart underwriting assistant — parsing, enrichment, rules, and recommendations.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies Available</CardTitle>
            <span className="text-blue-500">🏢</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-gray-500">Ready for processing</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Time to Quote</CardTitle>
            <span className="text-teal-500">⏱️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 min</div>
            <p className="text-xs text-gray-500">-2 min from last week</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">% Eligible</CardTitle>
            <span className="text-green-500">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-gray-500">+3% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">% Referral</CardTitle>
            <span className="text-orange-500">⚠️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12%</div>
            <p className="text-xs text-gray-500">-1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Monthly Processing Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ processed: { label: "Companies Processed", color: "hsl(var(--chart-1))" } }}
              className="h-[250px] w-full"
            >
              <BarChart data={monthlyChartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="processed" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-xl flex flex-col justify-center">
          <CardHeader>
            <CardTitle>Ready to Process</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
              <p className="text-gray-600">Companies awaiting underwriting review</p>
            </div>
            <Button
              onClick={handleGoToCompanySelection}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-lg"
            >
              Select Company to Process
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
