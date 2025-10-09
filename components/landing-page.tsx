"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAppState } from "@/lib/enhanced-state-context"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LandingPage() {
  const { setAppStarted } = useAppState()
  const router = useRouter()

  const handleStart = () => {
    setAppStarted(true)
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <div className="flex flex-col items-center text-center space-y-8">
        <Image src="/trigent-logo.svg" alt="Company Logo" width={300} height={90} className="mb-4" />
        <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight">UnderWrite 360</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Reads submissions, enriches risk, and recommends rating tiers — aligned to underwriting rules.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <Card className="shadow-lg rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
              <p className="text-2xl font-semibold text-teal-700">Reduce manual workload by ~50% (target)</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
              <p className="text-2xl font-semibold text-blue-700">
                Increase precision & quote speed by 30–35% (target)
              </p>
            </CardContent>
          </Card>
        </div>

        <Button
          onClick={handleStart}
          className="mt-10 px-12 py-6 text-2xl font-bold rounded-full shadow-xl transition-all duration-300 ease-in-out
                     bg-gradient-to-r from-blue-600 to-teal-500 text-white
                     hover:from-blue-700 hover:to-teal-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Start
        </Button>
      </div>
    </div>
  )
}
