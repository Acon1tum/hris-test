"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type OvertimePolicy = {
  id: string
  name: string
  rate: string
  description: string
  createdAt: string
}

interface ColumnCallbacks {
  onView?: (policy: OvertimePolicy) => void
  onEdit?: (policy: OvertimePolicy) => void
  onDelete?: (policy: OvertimePolicy) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<OvertimePolicy>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "rate",
    header: "Rate",
    cell: ({ row }) => {
      return <div>{row.getValue("rate")}</div>
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div>{row.getValue("description")}</div>
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

