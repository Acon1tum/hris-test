"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Plus, RefreshCw, Maximize2, Filter } from "lucide-react"
import { DataTable } from "@/components/advance-loans/data-table"
import { type AdvanceLoan } from "@/components/advance-loans/columns"

// Sample advance loan data (empty array to show empty state)
const advanceLoanRecords: AdvanceLoan[] = []

export function AdvanceLoanSection() {
  const [search, setSearch] = useState("")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Advance Loan</span>
            </div>
            <CardTitle>Advance Loan</CardTitle>
          </div>
          <Button onClick={() => {
            // TODO: Implement create new
            console.log("Create new advance loan")
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Action Icons */}
          <div className="flex items-center justify-end gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Fullscreen">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Filter">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <DataTable
            data={advanceLoanRecords}
            search={search}
            onSearchChange={setSearch}
            onView={(loan) => {
              // TODO: Implement view
              console.log("View", loan)
            }}
            onEdit={(loan) => {
              // TODO: Implement edit
              console.log("Edit", loan)
            }}
            onDelete={(loan) => {
              // TODO: Implement delete
              console.log("Delete", loan)
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

