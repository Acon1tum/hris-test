"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { 
  Plus, 
  CalendarIcon, 
  Clock, 
  ArrowLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/overtime-requests/data-table"
import { type OvertimeRequest } from "@/components/overtime-requests/columns"

const overtimeRequests: OvertimeRequest[] = [
  {
    id: "1",
    employeeName: "Jennifer Michael Davis",
    employeeId: "1",
    department: "Sales",
    overtimePolicy: "Standard Policy",
    overtimeType: "Weekday",
    status: "Approved",
    reason: "Critical bug fix for production...",
    workDescription: "Fix authentication issues in th...",
    startTime: new Date(2025, 0, 26), // January 26, 2025
    endTime: new Date(2025, 0, 26), // January 26, 2025
    overtimeDate: new Date(2025, 0, 25), // January 25, 2025
    requestDate: new Date(2025, 0, 20), // January 20, 2025
  },
  {
    id: "2",
    employeeName: "Susan Justin Howard",
    employeeId: "2",
    department: "Operations",
    overtimePolicy: "Standard Policy",
    overtimeType: "Weekend",
    status: "Pending",
    reason: "Campaign launch preparation",
    workDescription: "Prepare marketing materials f...",
    startTime: new Date(2025, 0, 26), // January 26, 2025
    endTime: new Date(2025, 0, 27), // January 27, 2025
    overtimeDate: new Date(2025, 0, 26), // January 26, 2025
    requestDate: new Date(2025, 0, 22), // January 22, 2025
  },
  {
    id: "3",
    employeeName: "Anthony Mary Ray",
    employeeId: "3",
    department: "Operations",
    overtimePolicy: "Senior Staff Policy",
    overtimeType: "Holiday",
    status: "Rejected",
    reason: "Emergency server maintenance",
    workDescription: "Database migration and serve...",
    startTime: new Date(2025, 0, 28), // January 28, 2025
    endTime: new Date(2025, 0, 29), // January 29, 2025
    overtimeDate: new Date(2025, 0, 28), // January 28, 2025
    requestDate: new Date(2025, 0, 23), // January 23, 2025
  },
  {
    id: "4",
    employeeName: "Joan Adrienne Tyler",
    employeeId: "4",
    department: "Sales",
    overtimePolicy: "Standard Policy",
    overtimeType: "Weekday",
    status: "Draft",
    reason: "Month-end financial reporting",
    workDescription: "Complete quarterly financial s...",
    startTime: new Date(2025, 0, 30), // January 30, 2025
    endTime: new Date(2025, 0, 30), // January 30, 2025
    overtimeDate: new Date(2025, 0, 29), // January 29, 2025
    requestDate: new Date(2025, 0, 24), // January 24, 2025
  },
]

const employees = [
  { id: "1", name: "Jennifer Michael Davis" },
  { id: "2", name: "Susan Justin Howard" },
  { id: "3", name: "Anthony Mary Ray" },
  { id: "4", name: "Joan Adrienne Tyler" },
  { id: "5", name: "Amor" },
]

const overtimeTypes = [
  { id: "1", name: "Weekday" },
  { id: "2", name: "Weekend" },
  { id: "3", name: "Holiday" },
]

const overtimePolicies = [
  { id: "1", name: "Standard Policy" },
  { id: "2", name: "Senior Staff Policy" },
  { id: "3", name: "Holiday Overtime Policy" },
]

export function OvertimeRequestSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [createMode, setCreateMode] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    employee: "",
    requestDate: "",
    overtimeDate: "",
    startTime: "",
    endTime: "",
    endDate: "",
    overtimeType: "",
    overtimePolicy: "",
    reason: "",
    workDescription: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form data:", formData)
    setCreateMode(false)
    setFormData({
      employee: "",
      requestDate: "",
      overtimeDate: "",
      startTime: "",
      endTime: "",
      endDate: "",
      overtimeType: "",
      overtimePolicy: "",
      reason: "",
      workDescription: "",
    })
  }


  // Create Form View
  if (createMode) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>HRM</span>
                <ChevronRight className="h-4 w-4" />
                <span>Overtime Request</span>
              </div>
              <CardTitle>Add a Overtime Request</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employee">
                  Employee <span className="text-destructive">*</span>
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
                <Label htmlFor="requestDate">
                  Request Date <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="requestDate"
                    type="date"
                    value={formData.requestDate}
                    onChange={(e) => setFormData({ ...formData, requestDate: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimeDate">
                  Overtime Date <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="overtimeDate"
                    type="date"
                    value={formData.overtimeDate}
                    onChange={(e) => setFormData({ ...formData, overtimeDate: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">
                  Start Time <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">
                  End Time <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimeType">
                  Overtime Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.overtimeType}
                  onValueChange={(value) => setFormData({ ...formData, overtimeType: value })}
                  required
                >
                  <SelectTrigger id="overtimeType">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {overtimeTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimePolicy">
                  Overtime Policy <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.overtimePolicy}
                  onValueChange={(value) => setFormData({ ...formData, overtimePolicy: value })}
                  required
                >
                  <SelectTrigger id="overtimePolicy">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {overtimePolicies.map((policy) => (
                      <SelectItem key={policy.id} value={policy.id}>
                        {policy.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reason">
                  Reason <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workDescription">
                  Work Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="workDescription"
                  value={formData.workDescription}
                  onChange={(e) => setFormData({ ...formData, workDescription: e.target.value })}
                  className="min-h-[100px]"
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setCreateMode(false)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  // Main List View
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>HRM</span>
              <ChevronRight className="h-4 w-4" />
              <span>Overtime Request</span>
            </div>
            <CardTitle>Overtime Request</CardTitle>
          </div>
          <Button onClick={() => setCreateMode(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={overtimeRequests}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(request) => {
            // TODO: Implement view
            console.log("View", request)
          }}
          onEdit={(request) => {
            // TODO: Implement edit
            console.log("Edit", request)
          }}
          onDelete={(request) => {
            // TODO: Implement delete
            console.log("Delete", request)
          }}
        />
      </CardContent>
    </Card>
  )
}
