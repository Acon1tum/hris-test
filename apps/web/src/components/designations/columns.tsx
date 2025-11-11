"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTableRowActions } from "./data-table-row-actions"

type DesignationPermission = {
  id: string
  permission: {
    id: string
    name: string
    module?: {
      id?: string
      name?: string
    }
  }
}

export type Designation = {
  id: string
  title: string
  code: string
  level: number
  description: string
  createdAt: string
  updatedAt?: string
  designationPermissions?: DesignationPermission[]
}

interface ColumnCallbacks {
  onView?: (designation: Designation) => void
  onEdit?: (designation: Designation) => void
  onDelete?: (designation: Designation) => void
  deletingId?: string | null
}

const RELATIVE_TIME_FORMATTER = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
})

const RELATIVE_TIME_DIVISIONS: Array<{
  amount: number
  unit: Intl.RelativeTimeFormatUnit
}> = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 4.34524, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: Number.POSITIVE_INFINITY, unit: "year" },
]

const formatRelativeTime = (value?: string) => {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  let duration = (date.getTime() - Date.now()) / 1000

  for (const division of RELATIVE_TIME_DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return RELATIVE_TIME_FORMATTER.format(
        Math.round(duration),
        division.unit
      )
    }
    duration /= division.amount
  }

  return "—"
}

const formatDisplayDate = (value?: string) => {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export const getColumns = (
  callbacks?: ColumnCallbacks
): ColumnDef<Designation>[] => [
  {
    accessorKey: "title",
    header: () => <span className="text-xs font-semibold uppercase">Name</span>,
    cell: ({ row }) => {
      const designation = row.original
      return (
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {designation.title}
          </p>
          <p className="text-xs text-muted-foreground">
            Code {designation.code} • Level {designation.level}
          </p>
          {designation.description && (
            <p className="text-xs text-muted-foreground">
              {designation.description}
            </p>
          )}
        </div>
      )
    },
  },
  {
    id: "permissions",
    header: () => (
      <span className="text-xs font-semibold uppercase">Permissions</span>
    ),
    cell: ({ row }) => {
      const designation = row.original
      const permissions = designation.designationPermissions ?? []
      const visiblePermissions = permissions.slice(0, 4)
      const remaining = Math.max(permissions.length - visiblePermissions.length, 0)

      return (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {visiblePermissions.length ? (
              visiblePermissions.map((dp) => (
                <Badge
                  key={dp.id}
                  variant="secondary"
                  className="rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium"
                >
                  {dp.permission.name}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">
                No permissions assigned
              </span>
            )}
            {remaining > 0 && (
              <Badge
                variant="outline"
                className="rounded-full border-dashed px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                +{remaining} more
              </Badge>
            )}
          </div>
          {permissions.length > 0 && callbacks?.onView && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-fit text-xs"
              onClick={() => callbacks.onView?.(designation)}
            >
              See All Permissions
            </Button>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <span className="text-xs font-semibold uppercase">Created At</span>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDisplayDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "updatedAt",
    header: () => (
      <span className="text-xs font-semibold uppercase">Updated</span>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatRelativeTime(row.original.updatedAt ?? row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => (
      <span className="text-xs font-semibold uppercase text-right">
        Actions
      </span>
    ),
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={callbacks?.onView}
        onEdit={callbacks?.onEdit}
        onDelete={callbacks?.onDelete}
        deletingId={callbacks?.deletingId}
      />
    ),
  },
]

