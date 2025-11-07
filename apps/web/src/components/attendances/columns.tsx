"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

export type Attendance = {
  id: string
  name: string
  employeeId: string
  status: string
  totalAttendances: number
  avatar: string
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export const getColumns = (): ColumnDef<Attendance>[] => [
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        Employee
      </div>
    ),
    cell: ({ row }) => {
      const attendance = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={attendance.avatar} alt={attendance.name} />
            <AvatarFallback>{getInitials(attendance.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{attendance.name}</div>
            <div className="text-sm text-muted-foreground">ID: {attendance.employeeId}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Employee Status",
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
    accessorKey: "totalAttendances",
    header: "Total Attendances",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("totalAttendances")}</div>
    },
  },
]

