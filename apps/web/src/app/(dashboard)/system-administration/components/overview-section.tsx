"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SystemAdministrationOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Administration</CardTitle>
        <CardDescription>Manage system settings, roles, permissions, and organizational structure</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Use the sidebar menu to navigate to different administration sections.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 