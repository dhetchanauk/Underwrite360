"use client"

import type React from "react"

import { useAppState } from "@/lib/enhanced-state-context"
import LeftNavigation from "./left-nav"
import TopBar from "./top-bar"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { appStarted } = useAppState()

  if (!appStarted) {
    return null // Or a loading spinner, or redirect to landing if accessed directly
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftNavigation />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
