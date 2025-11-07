"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Info } from "lucide-react"

type LatestVacancy = {
  id: string
  position: string
  employee: string
  department: string
  status: "Vacant" | "Filled"
  since: string
}

const latest: LatestVacancy = {
  id: "1",
  position: "Finance Manager",
  employee: "Jon Morrison",
  department: "HR",
  status: "Vacant",
  since: "Sep 24, 2025",
}

export function LatestVacanciesSection() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Dashboard</span>
          <ChevronRight className="h-4 w-4" />
          <span>Latest Vacancies</span>
        </div>
        <CardTitle>Latest Vacancies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border p-4 space-y-2">
          <div className="font-medium">Position: {latest.position}</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground">Employee</div>
              <div className="font-medium">{latest.employee}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Department</div>
              <div className="font-medium">{latest.department}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Status</div>
              <Badge className="bg-emerald-600">{latest.status}</Badge>
            </div>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Vacant since:</span> {latest.since}
          </div>

          <div className="mt-3 rounded-md border bg-muted/20 p-3 text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5" />
            <div>
              <span className="font-medium">Manager Action Required:</span> Please complete and submit the
              <span className="mx-1 italic">“Approval to Recruit”</span>
              form for this position.
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" size="sm">Remove Vacancy</Button>
            <Button size="sm">Submit Recruitment Request</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


