"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"

export type Department = {
  id: string
  name: string
  officeName: string
  departmentHeadName: string
  parentDepartment: string
  createdAt: string
}

interface ColumnCallbacks {
  onView?: (department: Department) => void
  onEdit?: (department: Department) => void
  onDelete?: (department: Department) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<Department>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "officeName",
    header: "Office Name",
    cell: ({ row }) => {
      return <div>{row.getValue("officeName")}</div>
    },
  },
  {
    accessorKey: "departmentHeadName",
    header: "Department Head Name",
    cell: ({ row }) => {
      return <div>{row.getValue("departmentHeadName")}</div>
    },
  },
  {
    accessorKey: "parentDepartment",
    header: "Parent Department",
    cell: ({ row }) => {
      return <div>{row.getValue("parentDepartment")}</div>
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

