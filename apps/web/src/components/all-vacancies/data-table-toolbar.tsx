"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Vacancy } from "./columns"

interface DataTableToolbarProps {
  table: Table<Vacancy>
  search: string
  onSearchChange: (value: string) => void
  typeFilter: string
  onTypeFilterChange: (value: string) => void
}

export function DataTableToolbar({
  table,
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
}: DataTableToolbarProps) {
  const filteredRows = table.getFilteredRowModel().rows

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Showing 1-{filteredRows.length} of {filteredRows.length}
      </p>
    </div>
  )
}

