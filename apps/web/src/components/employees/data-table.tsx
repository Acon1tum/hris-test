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
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DataTableToolbar } from "./data-table-toolbar"
import { Employee, getColumns } from "./columns"

interface DataTableProps {
  data: Employee[]
  search: string
  onSearchChange: (value: string) => void
  departmentFilter: string
  onDepartmentFilterChange: (value: string) => void
  designationFilter: string
  onDesignationFilterChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  showTerminated: boolean
  onShowTerminatedChange: (value: boolean) => void
  onView?: (employee: Employee) => void
  onEdit?: (employee: Employee) => void
  onDelete?: (employee: Employee) => void
}

export function DataTable({
  data,
  search,
  onSearchChange,
  departmentFilter,
  onDepartmentFilterChange,
  designationFilter,
  onDesignationFilterChange,
  statusFilter,
  onStatusFilterChange,
  showTerminated,
  onShowTerminatedChange,
  onView,
  onEdit,
  onDelete,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const columns = React.useMemo(
    () => getColumns({ onView, onEdit, onDelete }),
    [onView, onEdit, onDelete]
  )

  // Filter data based on search and filters
  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      // Search filter
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.includes(search) ||
        item.departments.some((dept) =>
          dept.toLowerCase().includes(search.toLowerCase())
        ) ||
        item.designations.some((des) =>
          des.toLowerCase().includes(search.toLowerCase())
        )

      // Department filter
      const matchesDepartment =
        !departmentFilter ||
        departmentFilter === "all" ||
        item.departments.some(
          (dept) => dept.toLowerCase() === departmentFilter.toLowerCase()
        )

      // Designation filter
      const matchesDesignation =
        !designationFilter ||
        designationFilter === "all" ||
        item.designations.some((des) =>
          des.toLowerCase().includes(designationFilter.toLowerCase())
        )

      // Status filter
      const matchesStatus =
        !statusFilter ||
        statusFilter === "all" ||
        item.status.toLowerCase() === statusFilter.toLowerCase()

      // Terminated filter
      const matchesTerminated =
        !showTerminated || item.status === "Termination Requested"

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesDesignation &&
        matchesStatus &&
        matchesTerminated
      )
    })
  }, [
    data,
    search,
    departmentFilter,
    designationFilter,
    statusFilter,
    showTerminated,
  ])

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
              table.getRowModel().rows.map((row) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-muted-foreground py-8"
                >
                  No employees found.
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
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from(
              { length: Math.min(table.getPageCount(), 4) },
              (_, i) => {
                const totalPages = table.getPageCount()
                const currentPage = table.getState().pagination.pageIndex + 1
                let pageNum
                if (totalPages <= 4) {
                  pageNum = i + 1
                } else if (currentPage <= 2) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 1) {
                  pageNum = totalPages - 3 + i
                } else {
                  pageNum = currentPage - 1 + i
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => table.setPageIndex(pageNum - 1)}
                  >
                    {pageNum}
                  </Button>
                )
              }
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

