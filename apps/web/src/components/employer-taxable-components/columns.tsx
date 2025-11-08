"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type EmployerTaxableComponent = {
  id: string
  name: string
  code: string
  type: string
  taxType?: string // For backward compatibility, will map from type
  description: string
  createdAt: string
}

interface ColumnCallbacks {
  onView?: (component: EmployerTaxableComponent) => void
  onEdit?: (component: EmployerTaxableComponent) => void
  onDelete?: (component: EmployerTaxableComponent) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<EmployerTaxableComponent>[] => [
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return <div>{row.getValue("type")}</div>
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

