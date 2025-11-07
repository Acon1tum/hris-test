"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react"
import { DataTableToolbar } from "./data-table-toolbar"
import { LeaveRequest, getColumns } from "./columns"

interface DataTableProps {
  data: LeaveRequest[]
  search: string
  onSearchChange: (value: string) => void
  departmentFilter: string
  onDepartmentFilterChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  dateFilter: string
  onDateFilterChange: (value: string) => void
  onView?: (request: LeaveRequest) => void
  onEdit?: (request: LeaveRequest) => void
  onApprove?: (request: LeaveRequest) => void
  onReject?: (request: LeaveRequest) => void
  onDelete?: (request: LeaveRequest) => void
}

export function DataTable({
  data,
  search,
  onSearchChange,
  departmentFilter,
  onDepartmentFilterChange,
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange,
  onView,
  onEdit,
  onApprove,
  onReject,
  onDelete,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  // Get columns with callbacks
  const columns = React.useMemo(
    () => getColumns({ onView, onEdit, onApprove, onReject, onDelete }),
    [onView, onEdit, onApprove, onReject, onDelete]
  )

  // Filter data based on search, department, status, and date
  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      // Search filter
      const matchesSearch =
        !search || item.employeeName.toLowerCase().includes(search.toLowerCase())

      // Department filter
      const matchesDepartment =
        !departmentFilter ||
        departmentFilter === "all" ||
        item.department.includes(departmentFilter)

      // Status filter
      const matchesStatus =
        !statusFilter ||
        statusFilter === "all" ||
        item.status.toLowerCase() === statusFilter.toLowerCase()

      // Date filter (check if startDate or endDate matches)
      const matchesDate =
        !dateFilter ||
        item.startDate.toISOString().split("T")[0] === dateFilter ||
        item.endDate.toISOString().split("T")[0] === dateFilter

      return matchesSearch && matchesDepartment && matchesStatus && matchesDate
    })
  }, [data, search, departmentFilter, statusFilter, dateFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        search={search}
        onSearchChange={onSearchChange}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-sm text-muted-foreground py-2"
                  >
                    Showing {1}-{table.getRowModel().rows.length} of{" "}
                    {table.getRowModel().rows.length}
                  </TableCell>
                </TableRow>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-muted-foreground py-8"
                >
                  No leave requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              {table.getState().pagination.pageIndex + 1}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

