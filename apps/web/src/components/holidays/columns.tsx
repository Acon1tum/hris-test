"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type Holiday = {
  id: string
  name: string
  year: string
  fromDate: string
  toDate: string
  totalDays: number
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
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => {
      return <div>{row.getValue("year")}</div>
    },
  },
  {
    accessorKey: "fromDate",
    header: "From Date",
    cell: ({ row }) => {
      return <div>{row.getValue("fromDate")}</div>
    },
  },
  {
    accessorKey: "toDate",
    header: "To Date",
    cell: ({ row }) => {
      return <div>{row.getValue("toDate")}</div>
    },
  },
  {
    accessorKey: "totalDays",
    header: "Total Days",
    cell: ({ row }) => {
      return <div>{row.getValue("totalDays")}</div>
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

