"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/designations/data-table"
import { type Designation } from "@/components/designations/columns"

const designations: Designation[] = [
  { id: "1", title: "Manager", code: "MGR", level: 3, description: "Management position", createdAt: "July 24, 2025" },
  { id: "2", title: "Software Developer", code: "DEV", level: 2, description: "Developer position", createdAt: "July 24, 2025" },
  { id: "3", title: "Senior Developer", code: "SDEV", level: 3, description: "Senior developer position", createdAt: "July 24, 2025" },
  { id: "4", title: "HR Specialist", code: "HRS", level: 2, description: "Human resources specialist", createdAt: "July 24, 2025" },
  { id: "5", title: "Junior Developer", code: "JDEV", level: 1, description: "Entry-level developer position", createdAt: "July 24, 2025" },
]

export function DesignationsSection() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Designations</CardTitle>
            <CardDescription>Manage job titles and designations</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={designations}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(designation) => {
            // TODO: Implement view
            console.log("View", designation)
          }}
          onEdit={(designation) => {
            // TODO: Implement edit
            console.log("Edit", designation)
          }}
          onDelete={(designation) => {
            // TODO: Implement delete
            console.log("Delete", designation)
          }}
        />
      </CardContent>
    </Card>
  )
}
