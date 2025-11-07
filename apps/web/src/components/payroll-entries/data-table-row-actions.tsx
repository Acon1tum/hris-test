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
import { PayrollEntry } from "./columns"

interface DataTableRowActionsProps {
  row: Row<PayrollEntry>
  onView?: (entry: PayrollEntry) => void
  onViewCostCenter?: (entry: PayrollEntry) => void
  onEdit?: (entry: PayrollEntry) => void
  onPayrollRun?: (entry: PayrollEntry) => void
  onDelete?: (entry: PayrollEntry) => void
}

export function DataTableRowActions({
  row,
  onView,
  onViewCostCenter,
  onEdit,
  onPayrollRun,
  onDelete,
}: DataTableRowActionsProps) {
  const entry = row.original

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
          <DropdownMenuItem onClick={() => onView(entry)}>
            View
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href={`/payroll-management/payroll-entries/${entry.id}`}>
              View
            </Link>
          </DropdownMenuItem>
        )}
        {onViewCostCenter && (
          <DropdownMenuItem onClick={() => onViewCostCenter(entry)}>
            View Cost Center
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(entry)}>
            Edit
          </DropdownMenuItem>
        )}
        {onPayrollRun && (
          <DropdownMenuItem onClick={() => onPayrollRun(entry)}>
            Payroll Run
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => onDelete(entry)}
          >
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

