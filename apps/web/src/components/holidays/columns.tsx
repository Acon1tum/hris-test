"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type Holiday = {
  id: string
  name: string
  date: string
  year: number
  description?: string
  isRecurring: boolean
  createdAt: string
}

interface ColumnCallbacks {
  onView?: (holiday: Holiday) => void
  onEdit?: (holiday: Holiday) => void
  onDelete?: (holiday: Holiday) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<Holiday>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <div>{row.getValue("date")}</div>
    },
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => {
      return <div>{row.getValue("year")}</div>
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div>{row.getValue("description") || "-"}</div>
    },
  },
  {
    accessorKey: "isRecurring",
    header: "Recurring",
    cell: ({ row }) => {
      return <div>{row.getValue("isRecurring") ? "Yes" : "No"}</div>
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

