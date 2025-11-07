"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"
import Link from "next/link"

export type SalaryStructure = {
  id: string
  name: string
  salaryFrequency: string
  description: string
  totalComponents: number
  createdAt: Date
}

interface ColumnCallbacks {
  onView?: (structure: SalaryStructure) => void
  onEdit?: (structure: SalaryStructure) => void
  onDelete?: (structure: SalaryStructure) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<SalaryStructure>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link href="#" className="text-primary hover:underline">
          {row.getValue("name")}
        </Link>
      )
    },
  },
  {
    accessorKey: "salaryFrequency",
    header: "Salary Frequency",
    cell: ({ row }) => {
      return <div>{row.getValue("salaryFrequency")}</div>
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return <div>{description || "---"}</div>
    },
  },
  {
    accessorKey: "totalComponents",
    header: "Total Components",
    cell: ({ row }) => {
      return <div>{row.getValue("totalComponents")}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return <div>{date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
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

