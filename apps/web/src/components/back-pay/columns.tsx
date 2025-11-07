"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type BackPay = {
  id: string
  employee: string
  salaryComponent: string
  backPayAmount: string
  startDate: string
  endDate: string
  payrollApplicableDate: string
  createdAt: string
  updatedAt: string
}

interface ColumnCallbacks {
  onView?: (backPay: BackPay) => void
  onEdit?: (backPay: BackPay) => void
  onDelete?: (backPay: BackPay) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<BackPay>[] => [
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
    accessorKey: "backPayAmount",
    header: "Back Pay Amount",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("backPayAmount")}</div>
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

