"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type Office = {
  id: string
  name: string
  location: string
  createdAt: string
}

// Helper function to format location
export function formatOfficeLocation(office: {
  city?: string
  province?: string
  country?: string
}): string {
  const parts: string[] = []
  if (office.city) parts.push(office.city)
  if (office.province) parts.push(office.province)
  if (office.country) parts.push(office.country)
  return parts.join(', ') || 'N/A'
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

