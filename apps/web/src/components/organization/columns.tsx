"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type Organization = {
  id: string
  name: string
  slug: string
  currencyCode: string
  timeZone: string
  domain: string
  employeeIdLabel: string
  createdAt: string
}

interface ColumnCallbacks {
  onView?: (org: Organization) => void
  onEdit?: (org: Organization) => void
  onDelete?: (org: Organization) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<Organization>[] => [
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
    accessorKey: "currencyCode",
    header: "Currency",
    cell: ({ row }) => {
      return <div>{row.getValue("currencyCode")}</div>
    },
  },
  {
    accessorKey: "timeZone",
    header: "Time Zone",
    cell: ({ row }) => {
      return <div>{row.getValue("timeZone")}</div>
    },
  },
  {
    accessorKey: "domain",
    header: "Domain",
    cell: ({ row }) => {
      const domain = row.getValue("domain") as string
      return <div>{domain || "—"}</div>
    },
  },
  {
    accessorKey: "employeeIdLabel",
    header: "Employee ID Label",
    cell: ({ row }) => {
      return <div>{row.getValue("employeeIdLabel")}</div>
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

