"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { SalaryStructure } from "./columns"

interface DataTableToolbarProps {
  table: Table<SalaryStructure>
  search: string
  onSearchChange: (value: string) => void
}

export function DataTableToolbar({
  table,
  search,
  onSearchChange,
}: DataTableToolbarProps) {
  const filteredRows = table.getFilteredRowModel().rows

  return (
    <div className="space-y-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by Name"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>

      {filteredRows.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Showing {1}-{filteredRows.length} of {filteredRows.length}
        </p>
      )}
    </div>
  )
}

