"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type LeavePolicy = {
  id: string
  name: string
  description: string
  maxDays: number
  createdAt: string
}

interface ColumnCallbacks {
  onView?: (policy: LeavePolicy) => void
  onEdit?: (policy: LeavePolicy) => void
  onDelete?: (policy: LeavePolicy) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<LeavePolicy>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>
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
    accessorKey: "maxDays",
    header: "Max Days",
    cell: ({ row }) => {
      return <div>{row.getValue("maxDays")}</div>
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

