"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type IncentivePay = {
  id: string
  employee: string
  salaryComponent: string
  amount: string
  payrollApplicableDate: string
  createdAt: string
  updatedAt: string
}

interface ColumnCallbacks {
  onView?: (incentive: IncentivePay) => void
  onEdit?: (incentive: IncentivePay) => void
  onDelete?: (incentive: IncentivePay) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<IncentivePay>[] => [
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }) => {
      return <div>{row.getValue("employee")}</div>
    },
  },
  {
    accessorKey: "salaryComponent",
    header: "Salary Component",
    cell: ({ row }) => {
      return <div>{row.getValue("salaryComponent")}</div>
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("amount")}</div>
    },
  },
  {
    accessorKey: "payrollApplicableDate",
    header: "Payroll Applicable Date",
    cell: ({ row }) => {
      return <div>{row.getValue("payrollApplicableDate")}</div>
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
      />
    ),
  },
]

