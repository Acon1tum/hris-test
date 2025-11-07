"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronRight, Filter, RefreshCw, Search } from "lucide-react"
import { DataTable } from "@/components/all-vacancies/data-table"
import { type Vacancy } from "@/components/all-vacancies/columns"

const initialVacancies: Vacancy[] = [
  {
    id: "1",
    employee: "Jon Morrison",
    employeeId: "EMP-0038",
    designation: "Finance Manager",
    department: "HR",
    type: "Resignation",
    vacantSince: "September 24, 2025",
    status: "Vacant",
    lastWorkingDate: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
]

export function AllVacanciesSection() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Dashboard</span>
          <ChevronRight className="h-4 w-4" />
          <span>Job Management</span>
        </div>
        <CardTitle>Vacancies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by Type</SelectItem>
                <SelectItem value="resignation">Resignation</SelectItem>
                <SelectItem value="termination">Termination</SelectItem>
                <SelectItem value="retirement">Retirement</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="More Filters">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <DataTable
            data={initialVacancies}
            search={search}
            onSearchChange={setSearch}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
          />
        </div>
      </CardContent>
    </Card>
  )
}


