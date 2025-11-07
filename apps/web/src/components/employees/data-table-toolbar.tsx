"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Employee } from "./columns"

interface DataTableToolbarProps {
  table: Table<Employee>
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
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by Name, Employee ID, Phone, Department, or Designation"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
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

