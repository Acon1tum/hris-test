"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { format } from "date-fns"

export type SalaryStructureAssignment = {
  id: string
  employeeName: string
  employeeId: string
  effectiveDate: Date
  salaryStructure: string
  totalGross: string
  status: string
  endDate: string
  endStructure: boolean
}

interface ColumnCallbacks {
  onView?: (assignment: SalaryStructureAssignment) => void
  onEdit?: (assignment: SalaryStructureAssignment) => void
  onDelete?: (assignment: SalaryStructureAssignment) => void
}

const getYesNoBadge = (value: boolean) => {
  return value ? (
    <Badge variant="default" className="bg-green-500">Yes</Badge>
  ) : (
    <Badge variant="destructive">No</Badge>
  )
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<SalaryStructureAssignment>[] => [
  {
    accessorKey: "employeeName",
    header: "Name",
    cell: ({ row }) => {
      const assignment = row.original
      return (
        <Link
          href={`/personnel-information-management/${assignment.employeeId}`}
          className="text-primary hover:underline"
        >
          {row.getValue("employeeName")}
        </Link>
      )
    },
  },
  {
    accessorKey: "effectiveDate",
    header: "Effective Date",
    cell: ({ row }) => {
      const date = row.getValue("effectiveDate") as Date
      return <div>{format(date, "MMM dd, yyyy")}</div>
    },
  },
  {
    accessorKey: "salaryStructure",
    header: "Salary Structure",
    cell: ({ row }) => {
      return <div>{row.getValue("salaryStructure")}</div>
    },
  },
  {
    accessorKey: "totalGross",
    header: "Total Gross",
    cell: ({ row }) => {
      const totalGross = row.getValue("totalGross") as string
      return <div>{totalGross || "---"}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant="default" className="bg-green-500">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const endDate = row.getValue("endDate") as string
      return <div>{endDate || "---"}</div>
    },
  },
  {
    accessorKey: "endStructure",
    header: "End Structure",
    cell: ({ row }) => {
      return getYesNoBadge(row.getValue("endStructure") as boolean)
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

