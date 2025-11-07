"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Search, CalendarIcon, X, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Attendance } from "./columns"

interface DataTableToolbarProps {
  table: Table<Attendance>
  search: string
  onSearchChange: (value: string) => void
  dateRange: string
  onDateRangeChange: (value: string) => void
}

export function DataTableToolbar({
  table,
  search,
  onSearchChange,
  dateRange,
  onDateRangeChange,
}: DataTableToolbarProps) {
  const filteredRows = table.getFilteredRowModel().rows

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Name"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        
        {/* Date Range Picker */}
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="pl-10 pr-10"
            placeholder="Select date range"
          />
          {dateRange && (
            <button
              type="button"
              onClick={() => onDateRangeChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col pointer-events-none">
            <ChevronUp className="h-3 w-3 text-muted-foreground" />
            <ChevronDown className="h-3 w-3 text-muted-foreground -mt-1" />
          </div>
        </div>

        <Button variant="outline" size="sm">
          More Filters
        </Button>
        
        {dateRange && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDateRangeChange("")}
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {filteredRows.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Showing {1}-{filteredRows.length} of {filteredRows.length}
        </p>
      )}
    </div>
  )
}

