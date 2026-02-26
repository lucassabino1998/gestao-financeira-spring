"use client"

import type { ReactNode } from "react"
import { AppSidebar } from "./app-sidebar"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 ml-64">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
