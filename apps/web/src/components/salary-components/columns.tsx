"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export type SalaryComponent = {
  id: string
  name: string
  type: string
  abbreviation: string
  isTaxable: boolean
  isEmployeeSuperannuation: boolean
  isOvertimePayComponent: boolean
  description: string
  createdAt: Date
  updatedAt: string
}

interface ColumnCallbacks {
  onView?: (component: SalaryComponent) => void
  onEdit?: (component: SalaryComponent) => void
  onDelete?: (component: SalaryComponent) => void
}

const getYesNoBadge = (value: boolean) => {
  return value ? (
    <Badge variant="default" className="bg-green-500">Yes</Badge>
  ) : (
    <Badge variant="destructive">No</Badge>
  )
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<SalaryComponent>[] => [
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return <div>{row.getValue("type")}</div>
    },
  },
  {
    accessorKey: "abbreviation",
    header: "Abbreviation",
    cell: ({ row }) => {
      return <div>{row.getValue("abbreviation")}</div>
    },
  },
  {
    accessorKey: "isTaxable",
    header: "Is Taxable",
    cell: ({ row }) => {
      return getYesNoBadge(row.getValue("isTaxable"))
    },
  },
  {
    accessorKey: "isEmployeeSuperannuation",
    header: "Is Employee Superannuation",
    cell: ({ row }) => {
      return getYesNoBadge(row.getValue("isEmployeeSuperannuation"))
    },
  },
  {
    accessorKey: "isOvertimePayComponent",
    header: "Is Overtime Pay Component",
    cell: ({ row }) => {
      return getYesNoBadge(row.getValue("isOvertimePayComponent"))
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
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return <div>{date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      return <div className="text-muted-foreground">{row.getValue("updatedAt")}</div>
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

