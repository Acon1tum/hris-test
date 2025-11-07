"use client"

import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { CalendarIcon, X, ChevronUp, ChevronDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AttendanceReport } from "./columns"

interface DataTableToolbarProps {
  table: Table<AttendanceReport>
  dateRange: string
  onDateRangeChange: (value: string) => void
  employeeFilter: string
  onEmployeeFilterChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  employees: Array<{ id: string; name: string }>
}

export function DataTableToolbar({
  table,
  dateRange,
  onDateRangeChange,
  employeeFilter,
  onEmployeeFilterChange,
  statusFilter,
  onStatusFilterChange,
  employees,
}: DataTableToolbarProps) {
  const filteredRows = table.getFilteredRowModel().rows

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {1}-{filteredRows.length} of {filteredRows.length}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          {/* Date Range Picker Button */}
          <div className="relative">
            <Button variant="outline" className="pr-10">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange}
              {dateRange && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDateRangeChange("")
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 ml-2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </Button>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col pointer-events-none">
              <ChevronUp className="h-3 w-3 text-muted-foreground" />
              <ChevronDown className="h-3 w-3 text-muted-foreground -mt-1" />
            </div>
          </div>

          {/* Filter by Employee */}
          <Select value={employeeFilter} onValueChange={onEmployeeFilterChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Employee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees</SelectItem>
              {employees.map((emp) => (
                <SelectItem key={emp.id} value={emp.id}>
                  {emp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter by Status */}
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
        </div>
      </div>
    </div>
  )
}

