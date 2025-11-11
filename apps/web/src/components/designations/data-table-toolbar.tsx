"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface DataTableToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  filteredCount: number
  totalCount: number
  displayStart: number
  displayEnd: number
}

export function DataTableToolbar({
  search,
  onSearchChange,
  filteredCount,
  totalCount,
  displayStart,
  displayEnd,
}: DataTableToolbarProps) {
  return (
    <div className="space-y-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search designations or permissions..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 pl-9 text-sm"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {filteredCount > 0
          ? `Showing ${displayStart}-${displayEnd} of ${filteredCount} designation${filteredCount === 1 ? "" : "s"}`
          : `Showing 0 of ${totalCount} designation${totalCount === 1 ? "" : "s"}`}
      </p>
    </div>
  )
}

