"use client"

import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Designation } from "./columns"

interface DataTableRowActionsProps {
  row: Row<Designation>
  onView?: (designation: Designation) => void
  onEdit?: (designation: Designation) => void
  onDelete?: (designation: Designation) => void
  deletingId?: string | null
}

export function DataTableRowActions({
  row,
  onView,
  onEdit,
  onDelete,
  deletingId,
}: DataTableRowActionsProps) {
  const designation = row.original
  const isDeleting = deletingId === designation.id

  return (
    <div className="flex items-center justify-end gap-2">
      {onView && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={() => onView(designation)}
        >
          View
        </Button>
      )}
      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={() => onEdit(designation)}
        >
          Edit
        </Button>
      )}
      {onDelete && (
        <Button
          variant="destructive"
          size="sm"
          className="h-8 text-xs"
          onClick={() => onDelete(designation)}
          disabled={isDeleting}
        >
          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
        </Button>
      )}
    </div>
  )
}

