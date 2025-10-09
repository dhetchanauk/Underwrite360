"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAppState } from "@/lib/enhanced-state-context"

export default function SettingsStep() {
  const { setAppStarted, setCurrentStep, setCompletedSteps } = useAppState()

  const handleResetDemoData = () => {
    setAppStarted(false)
    setCurrentStep(0)
    setCompletedSteps(new Set())
    // In a real app, this would clear local storage or reset backend data
    alert("Demo data reset! Returning to landing page.")
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
      <p className="text-gray-600">Configure application branding, rules, and demo mode options.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Branding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-logo">Company Logo</Label>
              <Input id="company-logo" type="file" />
              <p className="text-sm text-gray-500">Upload a new logo (updates landing & nav).</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Accent Color</Label>
              <Input id="primary-color" type="color" defaultValue="#007bff" />
              <p className="text-sm text-gray-500">Set the primary accent color for the app.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Rules/Thresholds (Cosmetic Only)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="score-preferred">Score Cutoff: Preferred</Label>
              <Input id="score-preferred" type="number" defaultValue="39" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="score-standard">Score Cutoff: Standard</Label>
              <Input id="score-standard" type="number" defaultValue="59" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="toggle-prior-dui" defaultChecked />
              <Label htmlFor="toggle-prior-dui">Toggle "Prior DUI" Rule</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="toggle-roof-age" defaultChecked />
              <Label htmlFor="toggle-roof-age">Toggle "Roof Age" Rule</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Credits/Debits Catalog (Cosmetic Only)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="telematics-credit-factor">Telematics Credit Factor</Label>
              <Input id="telematics-credit-factor" type="number" step="0.01" defaultValue="0.08" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driver-training-credit-factor">Driver Training Credit Factor</Label>
              <Input id="driver-training-credit-factor" type="number" step="0.01" defaultValue="0.05" />
            </div>
            <Button variant="outline" className="w-full shadow-sm bg-transparent">
              Manage Custom Factors
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Demo Mode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="auto-inject-scenario" />
              <Label htmlFor="auto-inject-scenario">Auto-inject scenario every N minutes</Label>
            </div>
            <Button onClick={handleResetDemoData} className="w-full bg-red-500 hover:bg-red-600 text-white shadow-md">
              Reset Demo Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
