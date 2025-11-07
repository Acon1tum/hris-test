"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Search, CalendarIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShiftAssignment } from "./columns"

interface DataTableToolbarProps {
  table: Table<ShiftAssignment>
  search: string
  onSearchChange: (value: string) => void
  startDate: string
  onStartDateChange: (value: string) => void
  endDate: string
  onEndDateChange: (value: string) => void
  shiftTypeFilter: string
  onShiftTypeFilterChange: (value: string) => void
  shiftTypes: Array<{ id: string; name: string }>
}

export function DataTableToolbar({
  table,
  search,
  onSearchChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  shiftTypeFilter,
  onShiftTypeFilterChange,
  shiftTypes,
}: DataTableToolbarProps) {
  const filteredRows = table.getFilteredRowModel().rows

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Employee"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="pl-10 w-40"
            placeholder="Select Start Date"
          />
        </div>
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="pl-10 w-40"
            placeholder="Select End Date"
          />
        </div>
        <Select value={shiftTypeFilter} onValueChange={onShiftTypeFilterChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Shift Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Shift Types</SelectItem>
            {shiftTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredRows.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Showing {1}-{Math.min(10, filteredRows.length)} of {filteredRows.length}
        </p>
      )}
    </div>
  )
}

