"use client"

import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Incident } from "./columns"

interface DataTableRowActionsProps {
  row: Row<Incident>
  onView?: (incident: Incident) => void
  onEdit?: (incident: Incident) => void
  onInvestigation?: (incident: Incident) => void
  onDelete?: (incident: Incident) => void
}

export function DataTableRowActions({
  row,
  onView,
  onEdit,
  onInvestigation,
  onDelete,
}: DataTableRowActionsProps) {
  const incident = row.original

  return (
    <div className="text-right w-[50px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {onView && (
            <DropdownMenuItem onClick={() => onView(incident)}>
              View
            </DropdownMenuItem>
          )}
          {onEdit && (
            <DropdownMenuItem onClick={() => onEdit(incident)}>
              Edit
            </DropdownMenuItem>
          )}
          {onInvestigation && (
            <DropdownMenuItem onClick={() => onInvestigation(incident)}>
              Investigation & Corrective Actions
            </DropdownMenuItem>
          )}
          {onDelete && (
            <DropdownMenuItem onClick={() => onDelete(incident)}>
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

