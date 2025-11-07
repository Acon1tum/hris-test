"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, Check, MoreHorizontal } from "lucide-react"
import { DataTableRowActions } from "./data-table-row-actions"

export type SalarySlip = {
  id: string
  employeeId: string
  employeeName: string
  employeeAvatar?: string
  employeeStatus: "Active" | "Termination Requested"
  totalPayroll: number
  startDate: string
  endDate: string
  paymentStatus: "Due" | "Paid" | "Pending"
  emailStatus: "Sent" | "Not Sent"
  grossEarnings: string
  deductions: string
  netPayable: string
  emailRetry: number
  createdAt: string
  updatedAt: string
}

interface ColumnCallbacks {
  onView?: (slip: SalarySlip) => void
  onEdit?: (slip: SalarySlip) => void
  onDelete?: (slip: SalarySlip) => void
  onSendEmail?: (slip: SalarySlip) => void
  onMarkAsPaid?: (slip: SalarySlip) => void
  onViewAll?: (employeeId: string) => void
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const getStatusVariant = (status: string) => {
  if (status === "Active") return "default"
  if (status === "Termination Requested") return "secondary"
  return "outline"
}

const getPaymentStatusVariant = (status: string) => {
  if (status === "Paid") return "default"
  if (status === "Due") return "secondary"
  return "outline"
}

export const getColumns = (
  callbacks?: ColumnCallbacks,
  expandedRows?: Set<string>,
  onToggleExpand?: (employeeId: string) => void
): ColumnDef<SalarySlip>[] => [
  {
    accessorKey: "employeeName",
    header: "Employee",
    cell: ({ row }) => {
      const slip = row.original
      const isExpanded = expandedRows?.has(slip.employeeId)
      const hasPayroll = slip.totalPayroll > 0

      return (
        <div className="flex items-center gap-3">
          {hasPayroll && !isExpanded ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onToggleExpand?.(slip.employeeId)}
            >
              <Check className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onToggleExpand?.(slip.employeeId)}
            >
              <ChevronRight
                className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
              />
            </Button>
          )}
          <Avatar className="h-10 w-10">
            <AvatarImage src={slip.employeeAvatar} alt={slip.employeeName} />
            <AvatarFallback>{getInitials(slip.employeeName)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{slip.employeeName}</div>
            <div className="text-sm text-muted-foreground">ID: {slip.employeeId}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "employeeStatus",
    header: "Employee Status",
    cell: ({ row }) => {
      const status = row.getValue("employeeStatus") as string
      return (
        <Badge variant={getStatusVariant(status) as any}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "totalPayroll",
    header: "Total Payroll",
    cell: ({ row }) => {
      return <div>{row.getValue("totalPayroll")}</div>
    },
  },
]

export const getExpandedColumns = (
  callbacks?: ColumnCallbacks
): ColumnDef<SalarySlip>[] => [
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      return <div>{row.getValue("startDate")}</div>
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      return <div>{row.getValue("endDate")}</div>
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as string
      return (
        <Badge variant={getPaymentStatusVariant(status) as any}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "emailStatus",
    header: "Email Status",
    cell: ({ row }) => {
      return <div>{row.getValue("emailStatus")}</div>
    },
  },
  {
    accessorKey: "grossEarnings",
    header: "Gross Earnings",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("grossEarnings")}</div>
    },
  },
  {
    accessorKey: "deductions",
    header: "Deductions",
    cell: ({ row }) => {
      return <div>{row.getValue("deductions")}</div>
    },
  },
  {
    accessorKey: "netPayable",
    header: "Net Payable",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("netPayable")}</div>
    },
  },
  {
    accessorKey: "emailRetry",
    header: "Email Retry",
    cell: ({ row }) => {
      return <div>{row.getValue("emailRetry")}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <div>{row.getValue("createdAt")}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      return <div className="text-muted-foreground">{row.getValue("updatedAt")}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={callbacks?.onView}
        onEdit={callbacks?.onEdit}
        onDelete={callbacks?.onDelete}
        onSendEmail={callbacks?.onSendEmail}
      />
    ),
  },
]

