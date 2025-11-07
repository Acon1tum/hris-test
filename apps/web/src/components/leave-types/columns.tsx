"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type LeaveType = {
  id: string
  name: string
  code: string
  daysPerYear: number
  description: string
  createdAt: string
}

interface ColumnCallbacks {
  onView?: (type: LeaveType) => void
  onEdit?: (type: LeaveType) => void
  onDelete?: (type: LeaveType) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<LeaveType>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => {
      return <div>{row.getValue("code")}</div>
    },
  },
  {
    accessorKey: "daysPerYear",
    header: "Days Per Year",
    cell: ({ row }) => {
      return <div>{row.getValue("daysPerYear")}</div>
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

