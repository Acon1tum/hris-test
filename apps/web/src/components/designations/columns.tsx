"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type Designation = {
  id: string
  title: string
  code: string
  level: number
  description: string
  createdAt: string
}

interface ColumnCallbacks {
  onView?: (designation: Designation) => void
  onEdit?: (designation: Designation) => void
  onDelete?: (designation: Designation) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<Designation>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("title")}</div>
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
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => {
      return <div>{row.getValue("level")}</div>
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

