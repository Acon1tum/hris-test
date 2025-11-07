"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type Office = {
  id: string
  name: string
  location: string
  createdAt: string
}

interface ColumnCallbacks {
  onView?: (office: Office) => void
  onEdit?: (office: Office) => void
  onDelete?: (office: Office) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<Office>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      return <div>{row.getValue("location")}</div>
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

