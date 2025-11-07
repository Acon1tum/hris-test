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
import { LeaveRequest } from "./columns"

interface DataTableRowActionsProps {
  row: Row<LeaveRequest>
  onView?: (request: LeaveRequest) => void
  onEdit?: (request: LeaveRequest) => void
  onApprove?: (request: LeaveRequest) => void
  onReject?: (request: LeaveRequest) => void
  onDelete?: (request: LeaveRequest) => void
}

export function DataTableRowActions({
  row,
  onView,
  onEdit,
  onApprove,
  onReject,
  onDelete,
}: DataTableRowActionsProps) {
  const request = row.original

  return (
    <div className="text-right w-[70px]">
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
            <DropdownMenuItem onClick={() => onView(request)}>
              View
            </DropdownMenuItem>
          )}
          {onEdit && (
            <DropdownMenuItem onClick={() => onEdit(request)}>
              Edit
            </DropdownMenuItem>
          )}
          {onApprove && (
            <DropdownMenuItem onClick={() => onApprove(request)}>
              Approve
            </DropdownMenuItem>
          )}
          {onReject && (
            <DropdownMenuItem onClick={() => onReject(request)}>
              Reject
            </DropdownMenuItem>
          )}
          {onDelete && (
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(request)}
            >
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

