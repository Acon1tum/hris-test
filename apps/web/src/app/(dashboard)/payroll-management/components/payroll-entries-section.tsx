"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ChevronRight, Plus, RefreshCw, Columns, Calendar as CalendarIcon, Filter, ArrowLeft } from "lucide-react"
import { DataTable } from "@/components/payroll-entries/data-table"
import { type PayrollEntry } from "@/components/payroll-entries/columns"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

// Sample payroll entries data
const payrollEntries: PayrollEntry[] = [
  {
    id: "1",
    referenceNo: "PRJ00007",
    payrollDate: "September 25, 2025",
    startDate: "September 03, 2025",
    endDate: "September 15, 2025",
    approvalCutoff: "September 24, 2025",
    basedOnTimeSheet: true,
    status: "Draft",
    frequency: "Monthly",
    totalEmployees: 25,
    updatedAt: "about 1 month ago",
  },
  {
    id: "2",
    referenceNo: "PRJ00005",
    payrollDate: "August 22, 2025",
    startDate: "July 31, 2025",
    endDate: "August 14, 2025",
    approvalCutoff: "August 13, 2025",
    basedOnTimeSheet: true,
    status: "Paid",
    frequency: "Monthly",
    totalEmployees: 2,
    updatedAt: "3 months ago",
  },
  {
    id: "3",
    referenceNo: "PRJ00004",
    payrollDate: "July 31, 2025",
    startDate: "July 01, 2025",
    endDate: "July 15, 2025",
    approvalCutoff: "July 30, 2025",
    basedOnTimeSheet: false,
    status: "Approved",
    frequency: "Monthly",
    totalEmployees: 1,
    updatedAt: "about 1 month ago",
  },
  {
    id: "4",
    referenceNo: "PRJ00003",
    payrollDate: "July 30, 2025",
    startDate: "June 16, 2025",
    endDate: "June 30, 2025",
    approvalCutoff: "",
    basedOnTimeSheet: true,
    status: "Draft",
    frequency: "Monthly",
    totalEmployees: 3,
    updatedAt: "about 1 month ago",
  },
  {
    id: "5",
    referenceNo: "PRJ00002",
    payrollDate: "June 15, 2025",
    startDate: "June 01, 2025",
    endDate: "June 15, 2025",
    approvalCutoff: "",
    basedOnTimeSheet: false,
    status: "Paid",
    frequency: "Monthly",
    totalEmployees: 5,
    updatedAt: "2 months ago",
  },
  {
    id: "6",
    referenceNo: "PRJ00008",
    payrollDate: "May 31, 2025",
    startDate: "May 01, 2025",
    endDate: "May 31, 2025",
    approvalCutoff: "",
    basedOnTimeSheet: true,
    status: "Approved",
    frequency: "Monthly",
    totalEmployees: 10,
    updatedAt: "3 months ago",
  },
]

export function PayrollEntriesSection() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [startDateFilter, setStartDateFilter] = useState("all")
  const [endDateFilter, setEndDateFilter] = useState("all")
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    payrollCoveredStartDate: "",
    payrollCoveredEndDate: "",
    approvalCutoffDate: "",
    payrollDate: "",
    payrollFrequency: "",
    salarySlipBasedOnTimeSheet: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData)
    setIsCreating(false)
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Payroll Entries</span>
              </div>
              <CardTitle>Add Payroll Record</CardTitle>
            </div>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Last Approved Payroll Period: July 31, 2025 - August 14, 2025
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Fields Section */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payrollCoveredStartDate">
                      Payroll Covered Start Date <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="payrollCoveredStartDate"
                        type="date"
                        value={formData.payrollCoveredStartDate}
                        onChange={(e) =>
                          setFormData({ ...formData, payrollCoveredStartDate: e.target.value })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payrollCoveredEndDate">
                      Payroll Covered End Date <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="payrollCoveredEndDate"
                        type="date"
                        value={formData.payrollCoveredEndDate}
                        onChange={(e) =>
                          setFormData({ ...formData, payrollCoveredEndDate: e.target.value })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="approvalCutoffDate">
                      Approval Cutoff Date <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="approvalCutoffDate"
                        type="date"
                        value={formData.approvalCutoffDate}
                        onChange={(e) =>
                          setFormData({ ...formData, approvalCutoffDate: e.target.value })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payrollDate">
                      Payroll Date <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="payrollDate"
                        type="date"
                        value={formData.payrollDate}
                        onChange={(e) =>
                          setFormData({ ...formData, payrollDate: e.target.value })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payroll Frequency and Time Sheet Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payrollFrequency">
                    Payroll Frequency <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.payrollFrequency}
                    onValueChange={(value) =>
                      setFormData({ ...formData, payrollFrequency: value })
                    }
                    required
                  >
                    <SelectTrigger id="payrollFrequency">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="semi-monthly">Semi-Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="salarySlipBasedOnTimeSheet"
                    checked={formData.salarySlipBasedOnTimeSheet}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, salarySlipBasedOnTimeSheet: checked })
                    }
                  />
                  <Label htmlFor="salarySlipBasedOnTimeSheet" className="cursor-pointer">
                    Salary Slip Based On Time Sheet
                  </Label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" type="button" onClick={() => setIsCreating(false)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Payroll Entries</span>
            </div>
            <CardTitle>Payroll Entries</CardTitle>
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
          <div className="flex items-center gap-4 flex-wrap">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select value={startDateFilter} onValueChange={setStartDateFilter}>
                <SelectTrigger className="w-[240px] pl-10">
                  <SelectValue placeholder="Filter by Payroll Covered Start Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="2025-09">September 2025</SelectItem>
                  <SelectItem value="2025-08">August 2025</SelectItem>
                  <SelectItem value="2025-07">July 2025</SelectItem>
                  <SelectItem value="2025-06">June 2025</SelectItem>
                  <SelectItem value="2025-05">May 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select value={endDateFilter} onValueChange={setEndDateFilter}>
                <SelectTrigger className="w-[240px] pl-10">
                  <SelectValue placeholder="Filter by Payroll Covered End Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="2025-09">September 2025</SelectItem>
                  <SelectItem value="2025-08">August 2025</SelectItem>
                  <SelectItem value="2025-07">July 2025</SelectItem>
                  <SelectItem value="2025-06">June 2025</SelectItem>
                  <SelectItem value="2025-05">May 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
            <div className="flex items-center gap-1 ml-auto">
              <Button variant="ghost" size="icon" className="h-8 w-8" title="Column Visibility">
                <Columns className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" title="Refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" title="Layout">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </Button>
            </div>
          </div>

          <DataTable
            data={payrollEntries}
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            startDateFilter={startDateFilter}
            onStartDateFilterChange={setStartDateFilter}
            endDateFilter={endDateFilter}
            onEndDateFilterChange={setEndDateFilter}
            onView={(entry) => {
              // TODO: Implement view
              console.log("View", entry)
            }}
            onViewCostCenter={(entry) => {
              // TODO: Implement view cost center
              console.log("View Cost Center", entry)
            }}
            onEdit={(entry) => {
              // TODO: Implement edit
              console.log("Edit", entry)
            }}
            onPayrollRun={(entry) => {
              // TODO: Implement payroll run
              console.log("Payroll Run", entry)
            }}
            onDelete={(entry) => {
              // TODO: Implement delete
              console.log("Delete", entry)
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

