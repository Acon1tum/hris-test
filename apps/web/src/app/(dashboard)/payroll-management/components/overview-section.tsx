"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MODULES } from "@hris/constants"

const moduleData = MODULES.PAYROLL_MANAGEMENT

export function PayrollManagementOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{moduleData.name}</CardTitle>
        <CardDescription>{moduleData.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Payroll management overview. Select a section from the sidebar to get started.</p>
      </CardContent>
    </Card>
  )
}

