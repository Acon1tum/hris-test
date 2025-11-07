"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronRight, Grid2X2, Plus, RefreshCw, Sliders } from "lucide-react"
import { columns, type IncidentType } from "@/components/incident-types/columns"
import { DataTable } from "@/components/incident-types/data-table"

const initialTypes: IncidentType[] = [
  {
    id: "1",
    name: "Environmental Incident",
    description: "An event causing pollution, waste spillage, or ecological harm",
    enabled: true,
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
  {
    id: "2",
    name: "Medical Emergency",
    description: "A sudden health issue (heart attack, stroke, injury) requiring care",
    enabled: true,
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
  {
    id: "3",
    name: "Vehicle Accident",
    description: "Any collision, near miss, or unsafe driving involving company vehicles",
    enabled: true,
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
  {
    id: "4",
    name: "Ergonomic Injury",
    description: "Injuries or strains caused by repetitive movements or poor posture",
    enabled: true,
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
  {
    id: "5",
    name: "Chemical Spill or Hazardous Material Exposure",
    description: "Accidental release of hazardous substance or exposure incident",
    enabled: true,
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
  {
    id: "6",
    name: "Equipment or Machinery Failure",
    description: "A malfunction, breakdown, or improper use of machinery/equipment",
    enabled: true,
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
  {
    id: "7",
    name: "Workplace Violence",
    description: "Any incident involving verbal threats, physical assault, or abuse",
    enabled: true,
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
  {
    id: "8",
    name: "Near Miss",
    description: "An unplanned event that did not result in injury, but had potential",
    enabled: true,
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
  {
    id: "9",
    name: "Fire or Explosion",
    description: "A fire outbreak caused by electrical faults, chemicals, etc.",
    enabled: true,
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
  {
    id: "10",
    name: "Slip, Trip, and Fall",
    description: "An employee or visitor loses balance due to wet floor or obstacles",
    enabled: true,
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
]

export function IncidentTypesSection() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "create">("list")

  if (viewMode === "create") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span>Health & Wellness</span>
            <ChevronRight className="h-4 w-4" />
            <span>Incident Type</span>
          </div>
          <CardTitle>Add a Health and Safety Incident Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-medium">Title <span className="text-destructive">*</span></div>
              <Input placeholder="Title" />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Description</div>
              <textarea className="w-full rounded-md border bg-background p-2 text-sm" rows={6} placeholder="Description" />
            </div>
            <div className="flex items-center gap-2">
              <input id="status" type="checkbox" className="h-4 w-4" />
              <label htmlFor="status" className="text-sm">Status</label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setViewMode("list")}>Back</Button>
              <Button>Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Health & Wellness</span>
              <ChevronRight className="h-4 w-4" />
              <span>Incident Type</span>
            </div>
            <CardTitle>Health and Safety Incident Type</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Grid"><Grid2X2 className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Refresh"><RefreshCw className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Filters"><Sliders className="h-4 w-4" /></Button>
            <Button onClick={() => setViewMode("create")}>
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={initialTypes}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </CardContent>
    </Card>
  )
}


