"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ChevronRight, 
  Plus, 
  CalendarIcon, 
  ArrowLeft,
  Clock,
} from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/attendances/data-table"
import { type Attendance } from "@/components/attendances/columns"

const employees: Attendance[] = [
  {
    id: "1",
    name: "Lauren Marsh",
    employeeId: "EMP-00001",
    status: "Active",
    totalAttendances: 25,
    avatar: "/avatars/lauren.jpg",
  },
  {
    id: "2",
    name: "Jaehee Kim",
    employeeId: "EMP-00002",
    status: "Active",
    totalAttendances: 30,
    avatar: "/avatars/jaehee.jpg",
  },
]

const allEmployeesList = [
  ...employees,
  {
    id: "3",
    name: "Amor",
    employeeId: "EMP-00022",
    status: "Active",
    totalAttendances: 0,
    avatar: "/avatars/amor.jpg",
  },
]

export function AttendancesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [createMode, setCreateMode] = useState(false)
  
  // Add attendance form state
  const [formData, setFormData] = useState({
    employee: "",
    date: "",
    inTime: "",
    outTime: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData)
    setCreateMode(false)
    setFormData({
      employee: "",
      date: "",
      inTime: "",
      outTime: "",
    })
  }


  // Add Attendance Form
  if (createMode) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Attendances</span>
              </div>
              <CardTitle>Add to the Attendance</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    {allEmployeesList.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">
                  Date <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inTime">
                  In <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="inTime"
                    type="time"
                    value={formData.inTime}
                    onChange={(e) => setFormData({ ...formData, inTime: e.target.value })}
                    className="pl-10"
                    placeholder="Select time"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="outTime">Out</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="outTime"
                    type="time"
                    value={formData.outTime}
                    onChange={(e) => setFormData({ ...formData, outTime: e.target.value })}
                    className="pl-10"
                    placeholder="Select time"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateMode(false)}
              >
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
              <span>Attendances</span>
            </div>
            <CardTitle>Attendances</CardTitle>
          </div>
          <Button onClick={() => setCreateMode(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={employees}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </CardContent>
    </Card>
  )
}
