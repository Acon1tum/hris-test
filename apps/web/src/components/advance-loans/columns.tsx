"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"
import { Badge } from "@/components/ui/badge"

export type AdvanceLoan = {
  id: string
  employee: string
  loanAmount: string
  numberOfInstallment: number
  installmentAmount: string
  status: string
  createdAt: string
  updatedAt: string
}

interface ColumnCallbacks {
  onView?: (loan: AdvanceLoan) => void
  onEdit?: (loan: AdvanceLoan) => void
  onDelete?: (loan: AdvanceLoan) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<AdvanceLoan>[] => [
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }) => {
      return <div>{row.getValue("employee")}</div>
    },
  },
  {
    accessorKey: "loanAmount",
    header: "Loan Amount",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("loanAmount")}</div>
    },
  },
  {
    accessorKey: "numberOfInstallment",
    header: "Number of Installment",
    cell: ({ row }) => {
      return <div>{row.getValue("numberOfInstallment")}</div>
    },
  },
  {
    accessorKey: "installmentAmount",
    header: "Installment Amount",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("installmentAmount")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "Active" || status === "Paid"
              ? "default"
              : status === "Pending"
              ? "secondary"
              : "destructive"
          }
        >
          {status}
        </Badge>
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

