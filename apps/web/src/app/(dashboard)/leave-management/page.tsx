"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MODULES } from "@hris/constants"
import {
  Plus,
  ArrowLeft,
  CalendarIcon,
  Maximize2,
  RefreshCw,
  Filter,
  ChevronRight,
  Upload,
} from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/leave-requests/data-table"
import { type LeaveRequest } from "@/components/leave-requests/columns"

const moduleData = MODULES.LEAVE_MANAGEMENT

// Sample leave requests data
const leaveRequests: LeaveRequest[] = [
  {
    id: "1",
    employeeName: "Amor",
    employeeId: "1",
    leaveType: "Vacation leave",
    status: "Approved",
    totalDays: 1,
    department: "Marketing",
    startDate: new Date(2025, 7, 1), // August 01, 2025
    endDate: new Date(2025, 7, 1),
    createdAt: new Date(2025, 6, 30), // July 30, 2025
    updatedAt: "3 months ago",
  },
  {
    id: "2",
    employeeName: "Karina Samuel Berger",
    employeeId: "2",
    leaveType: "Sick Leave",
    status: "Approved",
    totalDays: 3,
    department: "Finance",
    startDate: new Date(2025, 5, 15), // June 15, 2025
    endDate: new Date(2025, 5, 17),
    createdAt: new Date(2025, 6, 30),
    updatedAt: "3 months ago",
  },
  {
    id: "3",
    employeeName: "Jennifer Michael Davis",
    employeeId: "3",
    leaveType: "Sick Leave",
    status: "Approved",
    totalDays: 2,
    department: "Sales, Operations, Marke...",
    startDate: new Date(2025, 5, 3), // June 03, 2025
    endDate: new Date(2025, 5, 4),
    createdAt: new Date(2025, 6, 30),
    updatedAt: "3 months ago",
  },
]

// Sample data for dropdowns
const departments = [
  { id: "1", name: "Marketing" },
  { id: "2", name: "Finance" },
  { id: "3", name: "Sales" },
  { id: "4", name: "Operations" },
]

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
]

const employees = [
  { id: "1", name: "Amor" },
  { id: "2", name: "Karina Samuel Berger" },
  { id: "3", name: "Jennifer Michael Davis" },
]

const leaveTypes = [
  { id: "1", name: "Vacation leave" },
  { id: "2", name: "Sick Leave" },
  { id: "3", name: "Personal Leave" },
]

export default function LeaveManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    requestedDate: "",
    employee: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    attachments: [] as File[],
  })
  const [dragActive, setDragActive] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData)
    setIsCreating(false)
    // Reset form
    setFormData({
      requestedDate: "",
      employee: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      attachments: [],
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...files],
      }))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...files],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }


  if (isCreating) {
    return (
      <>
        <SiteHeader />
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Add Leave</CardTitle>
                    <CardDescription className="mt-1">Dashboard &gt; Leave Management</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="requestedDate">
                        Requested Date <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="requestedDate"
                          type="date"
                          value={formData.requestedDate}
                          onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employee">
                        Select Employee <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.employee}
                        onValueChange={(value) => setFormData({ ...formData, employee: value })}
                        required
                      >
                        <SelectTrigger id="employee">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map((emp) => (
                            <SelectItem key={emp.id} value={emp.id}>
                              {emp.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="leaveType">
                        Select Leave Type <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.leaveType}
                        onValueChange={(value) => setFormData({ ...formData, leaveType: value })}
                        required
                      >
                        <SelectTrigger id="leaveType">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {leaveTypes.length > 0 ? (
                            leaveTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="px-2 py-1.5 text-sm text-muted-foreground">
                              No leave types with available balance
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startDate">
                        Start Date <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">
                        End Date <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">
                      Reason <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      rows={4}
                      className="resize-none"
                      required
                      placeholder="Enter reason for leave..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Attachments</Label>
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`
                        border-2 border-dashed rounded-lg p-8 text-center
                        ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
                        transition-colors cursor-pointer
                      `}
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag &apos;n&apos; Drop some files here, or click to select files
                      </p>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileInput}
                      />
                    </div>
                    {formData.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreating(false)}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>Dashboard</span>
                    <ChevronRight className="h-4 w-4" />
                    <span>Leave Management</span>
                  </div>
                  <CardTitle>{moduleData.name}</CardTitle>
                </div>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Select
                      value={departmentFilter || "all"}
                      onValueChange={(value) =>
                        setDepartmentFilter(value === "all" ? "" : value)
                      }
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by Departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={statusFilter || "all"} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="pl-10 w-40"
                        placeholder="Select Date"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <DataTable
                  data={leaveRequests}
                  search={searchQuery}
                  onSearchChange={setSearchQuery}
                  departmentFilter={departmentFilter}
                  onDepartmentFilterChange={setDepartmentFilter}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  dateFilter={dateFilter}
                  onDateFilterChange={setDateFilter}
                  onView={(request) => {
                    // TODO: Implement view
                    console.log("View", request)
                  }}
                  onEdit={(request) => {
                    // TODO: Implement edit
                    console.log("Edit", request)
                  }}
                  onApprove={(request) => {
                    // TODO: Implement approve
                    console.log("Approve", request)
                  }}
                  onReject={(request) => {
                    // TODO: Implement reject
                    console.log("Reject", request)
                  }}
                  onDelete={(request) => {
                    // TODO: Implement delete
                    console.log("Delete", request)
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
