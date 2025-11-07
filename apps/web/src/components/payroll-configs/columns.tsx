"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"
import { Badge } from "@/components/ui/badge"

export type PayrollConfig = {
  id: string
  payrollFrequency: string
  automatedPayroll: boolean
  createdAt: string
}

interface ColumnCallbacks {
  onView?: (config: PayrollConfig) => void
  onEdit?: (config: PayrollConfig) => void
  onDelete?: (config: PayrollConfig) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<PayrollConfig>[] => [
  {
    accessorKey: "payrollFrequency",
    header: "Payroll Frequency",
    cell: ({ row }) => {
      const frequency = row.getValue("payrollFrequency") as string
      return <div className="font-medium capitalize">{frequency.replace("-", " ")}</div>
    },
  },
  {
    accessorKey: "automatedPayroll",
    header: "Automated Payroll",
    cell: ({ row }) => {
      const automated = row.getValue("automatedPayroll") as boolean
      return automated ? (
        <Badge variant="default" className="bg-green-500">Yes</Badge>
      ) : (
        <Badge variant="destructive">No</Badge>
      )
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
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={callbacks?.onView}
        onEdit={callbacks?.onEdit}
        onDelete={callbacks?.onDelete}
      />
    ),
  },
]

