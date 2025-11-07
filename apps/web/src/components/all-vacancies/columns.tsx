"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export type Vacancy = {
  id: string
  employee: string
  employeeId: string
  designation: string
  department: string
  type: string
  vacantSince: string
  status: "Vacant" | "Filled"
  lastWorkingDate: string
  updatedAt: string
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

export const getColumns = (): ColumnDef<Vacancy>[] => [
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }) => {
      const employee = row.getValue("employee") as string
      const employeeId = row.original.employeeId
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-7 w-7">
            <AvatarFallback>{initials(employee)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{employee}</div>
            <div className="text-xs text-muted-foreground">ID: {employeeId}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => {
      return (
        <Badge variant="secondary" className="text-xs">
          {row.getValue("designation")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      return (
        <Badge variant="secondary" className="text-xs">
          {row.getValue("department")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Vacant Type",
    cell: ({ row }) => {
      return <div>{row.getValue("type")}</div>
    },
  },
  {
    accessorKey: "vacantSince",
    header: "Vacant Since",
    cell: ({ row }) => {
      return <div>{row.getValue("vacantSince")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Vacancy Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge className="bg-emerald-600">{status}</Badge>
      )
    },
  },
  {
    accessorKey: "lastWorkingDate",
    header: "Last Working Date",
    cell: ({ row }) => {
      return <div>{row.getValue("lastWorkingDate")}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      return (
        <div className="text-xs text-muted-foreground">
          {row.getValue("updatedAt")}
        </div>
      )
    },
  },
]

