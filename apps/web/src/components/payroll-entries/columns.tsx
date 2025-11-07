"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { DataTableRowActions } from "./data-table-row-actions"

export type PayrollEntry = {
  id: string
  referenceNo: string
  payrollDate: string
  startDate: string
  endDate: string
  approvalCutoff: string
  basedOnTimeSheet: boolean
  status: "Draft" | "Paid" | "Approved"
  frequency: string
  totalEmployees: number
  updatedAt: string
}

interface ColumnCallbacks {
  onView?: (entry: PayrollEntry) => void
  onViewCostCenter?: (entry: PayrollEntry) => void
  onEdit?: (entry: PayrollEntry) => void
  onPayrollRun?: (entry: PayrollEntry) => void
  onDelete?: (entry: PayrollEntry) => void
}

const getStatusVariant = (status: string) => {
  if (status === "Paid" || status === "Approved") return "default"
  if (status === "Draft") return "secondary"
  return "outline"
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<PayrollEntry>[] => [
  {
    accessorKey: "referenceNo",
    header: "Reference No.",
    cell: ({ row }) => {
      const entry = row.original
      return (
        <Link
          href={`/payroll-management/payroll-entries/${entry.id}`}
          className="text-primary hover:underline font-medium"
        >
          {entry.referenceNo}
        </Link>
      )
    },
  },
  {
    accessorKey: "payrollDate",
    header: "Payroll Date",
    cell: ({ row }) => {
      return <div>{row.getValue("payrollDate")}</div>
    },
  },
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
    accessorKey: "approvalCutoff",
    header: "Approval Cutoff",
    cell: ({ row }) => {
      const cutoff = row.getValue("approvalCutoff") as string
      return <div>{cutoff || "—"}</div>
    },
  },
  {
    accessorKey: "basedOnTimeSheet",
    header: "Based on Time Sheet",
    cell: ({ row }) => {
      const basedOnTimeSheet = row.getValue("basedOnTimeSheet") as boolean
      return (
        <Badge variant={basedOnTimeSheet ? "default" : "destructive"}>
          {basedOnTimeSheet ? "Yes" : "No"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={getStatusVariant(status) as any}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
    cell: ({ row }) => {
      return <div>{row.getValue("frequency")}</div>
    },
  },
  {
    accessorKey: "totalEmployees",
    header: "Total Employees",
    cell: ({ row }) => {
      return <div>{row.getValue("totalEmployees")}</div>
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
        onViewCostCenter={callbacks?.onViewCostCenter}
        onEdit={callbacks?.onEdit}
        onPayrollRun={callbacks?.onPayrollRun}
        onDelete={callbacks?.onDelete}
      />
    ),
  },
]

