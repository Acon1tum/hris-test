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
import { ShiftAssignment, ShiftDetail } from "./columns"

interface DataTableRowActionsProps {
  row: Row<ShiftDetail | ShiftAssignment>
  assignment?: ShiftAssignment
  onView?: (assignment: ShiftAssignment) => void
  onEdit?: (shift: ShiftDetail, assignment: ShiftAssignment) => void
  onDelete?: (shift: ShiftDetail, assignment: ShiftAssignment) => void
  onDisable?: (shift: ShiftDetail, assignment: ShiftAssignment) => void
}

export function DataTableRowActions({
  row,
  assignment,
  onView,
  onEdit,
  onDelete,
  onDisable,
}: DataTableRowActionsProps) {
  // If it's a shift detail row, show shift actions
  if (assignment && "shiftType" in row.original) {
    const shift = row.original as ShiftDetail
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {onView && (
            <DropdownMenuItem onClick={() => onView(assignment)}>
              View
            </DropdownMenuItem>
          )}
          {onEdit && (
            <DropdownMenuItem onClick={() => onEdit(shift, assignment)}>
              Edit
            </DropdownMenuItem>
          )}
          {onDisable && (
            <DropdownMenuItem onClick={() => onDisable(shift, assignment)}>
              Disable
            </DropdownMenuItem>
          )}
          {onDelete && (
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(shift, assignment)}
            >
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Otherwise, it's an employee row - show chevron to expand
  const assignmentRow = row.original as ShiftAssignment
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={() => onView?.(assignmentRow)}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  )
}

