"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { DataTableRowActions } from "./data-table-row-actions"

export type Employee = {
  id: string
  name: string
  employeeId: string
  email: string
  phone: string
  departments: string[]
  designations: string[]
  status: string
  gender: string
  reportTo: string
  dateOfBirth: string
  joiningDate: string
  updateDate: string
  avatar: string
}

interface ColumnCallbacks {
  onView?: (employee: Employee) => void
  onEdit?: (employee: Employee) => void
  onDelete?: (employee: Employee) => void
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const getStatusVariant = (status: string) => {
  if (status === "Active") return "default"
  if (status === "Termination Requested") return "secondary"
  return "outline"
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<Employee>[] => [
  {
    accessorKey: "name",
    header: "Employee",
    cell: ({ row }) => {
      const employee = row.original
      return (
        <Link
          href={`/personnel-information-management/${employee.id}`}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{employee.name}</div>
            <div className="text-sm text-muted-foreground">{employee.employeeId}</div>
          </div>
        </Link>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return <div>{row.getValue("phone")}</div>
    },
  },
  {
    accessorKey: "departments",
    header: "Departments",
    cell: ({ row }) => {
      const departments = row.getValue("departments") as string[]
      return (
        <div className="flex items-center gap-1 flex-wrap">
          {departments.slice(0, 1).map((dept, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {dept}
            </Badge>
          ))}
          {departments.length > 1 && (
            <Badge variant="secondary" className="text-xs">
              +{departments.length - 1}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "designations",
    header: "Designations",
    cell: ({ row }) => {
      const designations = row.getValue("designations") as string[]
      return (
        <div className="flex items-center gap-1 flex-wrap">
          {designations.map((des, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {des}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={getStatusVariant(status) as any}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      return <div>{row.getValue("gender")}</div>
    },
  },
  {
    accessorKey: "reportTo",
    header: "Report To",
    cell: ({ row }) => {
      return <div>{row.getValue("reportTo")}</div>
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ row }) => {
      return <div>{row.getValue("dateOfBirth")}</div>
    },
  },
  {
    accessorKey: "joiningDate",
    header: "Joining Date",
    cell: ({ row }) => {
      return <div>{row.getValue("joiningDate")}</div>
    },
  },
  {
    accessorKey: "updateDate",
    header: "Update Date",
    cell: ({ row }) => {
      return <div>{row.getValue("updateDate")}</div>
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

