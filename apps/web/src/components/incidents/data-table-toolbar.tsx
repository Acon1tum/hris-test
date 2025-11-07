"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Incident } from "./columns"

interface DataTableToolbarProps {
  table: Table<Incident>
  search: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  dateFilter: string
  onDateFilterChange: (value: string) => void
}

export function DataTableToolbar({
  table,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange,
}: DataTableToolbarProps) {
  const filteredRows = table.getFilteredRowModel().rows

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Showing 1-{filteredRows.length} of {filteredRows.length}
      </p>
    </div>
  )
}

