"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type GraceTimeOrganization = {
  id: string
  name: string
  slug: string
  createdAt: string
}

interface ColumnCallbacks {
  onSelect?: (org: GraceTimeOrganization) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<GraceTimeOrganization>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      return <div>{row.getValue("slug")}</div>
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
        onSelect={callbacks?.onSelect}
      />
    ),
  },
]

