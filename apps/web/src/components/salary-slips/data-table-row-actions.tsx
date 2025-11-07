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
import Link from "next/link"
import { SalarySlip } from "./columns"

interface DataTableRowActionsProps {
  row: Row<SalarySlip>
  onView?: (slip: SalarySlip) => void
  onEdit?: (slip: SalarySlip) => void
  onDelete?: (slip: SalarySlip) => void
  onSendEmail?: (slip: SalarySlip) => void
  onMarkAsPaid?: (slip: SalarySlip) => void
}

export function DataTableRowActions({
  row,
  onView,
  onEdit,
  onDelete,
  onSendEmail,
  onMarkAsPaid,
}: DataTableRowActionsProps) {
  const slip = row.original

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
        {onView ? (
          <DropdownMenuItem onClick={() => onView(slip)}>
            View
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href={`/payroll-management/salary-slips/${slip.id}`}>
              View
            </Link>
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(slip)}>
            Edit
          </DropdownMenuItem>
        )}
        {onMarkAsPaid && (
          <DropdownMenuItem onClick={() => onMarkAsPaid(slip)}>
            Mark as Paid
          </DropdownMenuItem>
        )}
        {onSendEmail && (
          <DropdownMenuItem onClick={() => onSendEmail(slip)}>
            Send Email
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => onDelete(slip)}
          >
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

