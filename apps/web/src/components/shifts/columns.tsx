"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type Shift = {
  id: string
  name: string
  code: string
  startTime: string
  endTime: string
  createdAt: string
}

interface ColumnCallbacks {
  onView?: (shift: Shift) => void
  onEdit?: (shift: Shift) => void
  onDelete?: (shift: Shift) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<Shift>[] => [
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
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => {
      return <div>{row.getValue("startTime")}</div>
    },
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => {
      return <div>{row.getValue("endTime")}</div>
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

