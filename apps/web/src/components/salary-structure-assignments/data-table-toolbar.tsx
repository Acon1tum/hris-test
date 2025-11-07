"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Search, Calendar as CalendarIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SalaryStructureAssignment } from "./columns"

interface DataTableToolbarProps {
  table: Table<SalaryStructureAssignment>
  search: string
  onSearchChange: (value: string) => void
  employeeFilter: string
  onEmployeeFilterChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  assignments: SalaryStructureAssignment[]
}

export function DataTableToolbar({
  table,
  search,
  onSearchChange,
  employeeFilter,
  onEmployeeFilterChange,
  statusFilter,
  onStatusFilterChange,
  assignments,
}: DataTableToolbarProps) {
  const filteredRows = table.getFilteredRowModel().rows

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Employee Name or Salary Structure"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={employeeFilter} onValueChange={onEmployeeFilterChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Employee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Employees</SelectItem>
            {assignments.map((assignment) => (
              <SelectItem key={assignment.employeeId} value={assignment.employeeId}>
                {assignment.employeeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            className="pl-10 w-40"
            placeholder="Select Date"
          />
        </div>
      </div>

      {filteredRows.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Showing {1}-{filteredRows.length} of {filteredRows.length}
        </p>
      )}
    </div>
  )
}

