"use client"

import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAppState } from "@/lib/enhanced-state-context"

export default function TopBar() {
  const router = useRouter()
  const { resetAppState } = useAppState()

  const handleGoHome = () => {
    resetAppState()
    router.push("/")
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">UnderWrite 360</h1>
        <Button variant="outline" onClick={handleGoHome} className="flex items-center gap-2 bg-transparent">
          <Home className="w-4 h-4" />
          Home
        </Button>
      </div>
    </header>
  )
}
