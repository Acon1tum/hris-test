"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronRight, Plus, CalendarIcon, ChevronDown, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/shift-assignments/data-table"
import { type ShiftAssignment, type ShiftDetail } from "@/components/shift-assignments/columns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const employees: ShiftAssignment[] = [
  {
    id: "1",
    name: "Amor",
    employeeId: "EMP-00022",
    status: "Active",
    totalShifts: 2,
    avatar: "/avatars/amor.jpg",
    shifts: [
      {
        id: "shift-1",
        shiftType: "Morning",
        overtimePolicy: "",
        startDate: "2025-09-01",
        endDate: "",
        startTime: "06:00",
        endTime: "11:00",
        shiftDuration: "05:00",
        shiftEnd: false,
        disabled: false,
        createdAt: "2025-09-24",
        updatedAt: "2025-09-24",
      },
      {
        id: "shift-2",
        shiftType: "Regular",
        overtimePolicy: "Standard Overtime Comp...",
        startDate: "2025-07-30",
        endDate: "2025-09-01",
        startTime: "11:00",
        endTime: "19:00",
        shiftDuration: "08:00",
        shiftEnd: true,
        disabled: false,
        createdAt: "2025-07-30",
        updatedAt: "2025-09-24",
      },
    ],
  },
  {
    id: "2",
    name: "Anthony Mary Ray",
    employeeId: "EMP-00005",
    status: "Active",
    totalShifts: 2,
    avatar: "/avatars/anthony.jpg",
    shifts: [
      {
        id: "shift-3",
        shiftType: "Regular",
        overtimePolicy: "Standard Overtime",
        startDate: "2025-08-01",
        endDate: "",
        startTime: "09:00",
        endTime: "17:00",
        shiftDuration: "08:00",
        shiftEnd: false,
        disabled: false,
        createdAt: "2025-08-01",
        updatedAt: "2025-08-01",
      },
    ],
  },
  {
    id: "3",
    name: "Ashton Starc",
    employeeId: "EMP-00034",
    status: "Active",
    totalShifts: 1,
    avatar: "/avatars/ashton.jpg",
    shifts: [
      {
        id: "shift-4",
        shiftType: "Regular",
        overtimePolicy: "",
        startDate: "2025-08-15",
        endDate: "",
        startTime: "09:00",
        endTime: "17:00",
        shiftDuration: "08:00",
        shiftEnd: false,
        disabled: false,
        createdAt: "2025-08-15",
        updatedAt: "2025-08-15",
      },
    ],
  },
  {
    id: "4",
    name: "Brandon Lewis",
    employeeId: "EMP-00030",
    status: "Active",
    totalShifts: 1,
    avatar: "/avatars/brandon.jpg",
    shifts: [],
  },
  {
    id: "5",
    name: "Dan Morris",
    employeeId: "EMP-00037",
    status: "Active",
    totalShifts: 1,
    avatar: "/avatars/dan.jpg",
    shifts: [],
  },
  {
    id: "6",
    name: "David Anthony Martinez",
    employeeId: "EMP-00032",
    status: "Active",
    totalShifts: 1,
    avatar: "/avatars/david.jpg",
    shifts: [],
  },
  {
    id: "7",
    name: "David Potter",
    employeeId: "EMP-00026",
    status: "Active",
    totalShifts: 1,
    avatar: "/avatars/davidp.jpg",
    shifts: [],
  },
  {
    id: "8",
    name: "Francisco Phillip Church",
    employeeId: "EMP-00015",
    status: "Active",
    totalShifts: 2,
    avatar: "/avatars/francisco.jpg",
    shifts: [
      {
        id: "shift-5",
        shiftType: "Regular",
        overtimePolicy: "",
        startDate: "2025-08-20",
        endDate: "",
        startTime: "09:00",
        endTime: "17:00",
        shiftDuration: "08:00",
        shiftEnd: false,
        disabled: false,
        createdAt: "2025-08-20",
        updatedAt: "2025-08-20",
      },
    ],
  },
  {
    id: "9",
    name: "Francis Foden",
    employeeId: "EMP-00025",
    status: "Active",
    totalShifts: 1,
    avatar: "/avatars/francis.jpg",
    shifts: [],
  },
  {
    id: "10",
    name: "Jaehee Kim",
    employeeId: "EMP-00002",
    status: "Active",
    totalShifts: 2,
    avatar: "/avatars/jaehee.jpg",
    shifts: [
      {
        id: "shift-6",
        shiftType: "Regular",
        overtimePolicy: "",
        startDate: "2025-08-25",
        endDate: "",
        startTime: "09:00",
        endTime: "17:00",
        shiftDuration: "08:00",
        shiftEnd: false,
        disabled: false,
        createdAt: "2025-08-25",
        updatedAt: "2025-08-25",
      },
    ],
  },
]

const shiftTypes = [
  { id: "1", name: "Morning" },
  { id: "2", name: "Regular" },
  { id: "3", name: "Night" },
  { id: "4", name: "Evening" },
]

const overtimePolicies = [
  { id: "1", name: "Standard Overtime" },
  { id: "2", name: "Premium Overtime" },
  { id: "3", name: "Holiday Overtime" },
]

const departments = [
  { id: "1", name: "Marketing" },
  { id: "2", name: "Finance" },
  { id: "3", name: "Sales" },
  { id: "4", name: "Operations" },
]

const designations = [
  { id: "1", name: "Manager" },
  { id: "2", name: "Analyst" },
  { id: "3", name: "Sales Rep" },
  { id: "4", name: "Coordinator" },
  { id: "5", name: "Specialist" },
  { id: "6", name: "Accountant" },
  { id: "7", name: "Supervisor" },
]

type EmployeeForBulk = ShiftAssignment & {
  department: string
  designation: string
}

const allEmployeesList: EmployeeForBulk[] = [
  ...employees.map((emp) => ({
    ...emp,
    department: emp.id === "1" ? "Marketing" : emp.id === "2" ? "Finance" : emp.id === "3" ? "Sales" : emp.id === "4" ? "Marketing" : emp.id === "5" ? "Operations" : emp.id === "6" ? "Finance" : emp.id === "7" ? "Sales" : emp.id === "8" ? "Operations" : emp.id === "9" ? "Marketing" : "Finance",
    designation: emp.id === "1" ? "Manager" : emp.id === "2" ? "Analyst" : emp.id === "3" ? "Sales Rep" : emp.id === "4" ? "Coordinator" : emp.id === "5" ? "Specialist" : emp.id === "6" ? "Accountant" : emp.id === "7" ? "Manager" : emp.id === "8" ? "Supervisor" : emp.id === "9" ? "Manager" : "Manager",
  })),
  {
    id: "11",
    name: "Lauren Marsh",
    employeeId: "EMP-00001",
    status: "Active",
    totalShifts: 0,
    avatar: "/avatars/lauren.jpg",
    shifts: [],
    department: "Admin",
    designation: "Admin",
  },
]

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function ShiftAssignmentSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [shiftTypeFilter, setShiftTypeFilter] = useState("all")
  const [createMode, setCreateMode] = useState<"individual" | "bulk" | null>(null)
  
  // Individual form state
  const [individualForm, setIndividualForm] = useState({
    employee: "",
    shiftType: "",
    overtimePolicy: "",
    startDate: "",
    endDate: "",
  })

  // Bulk form state
  const [bulkForm, setBulkForm] = useState({
    shiftType: "",
    departments: "",
    designations: "",
    startDate: "",
    endDate: "",
  })
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])


  // Filter employees for bulk assignment based on filters
  const filteredBulkEmployees = allEmployeesList.filter((employee) => {
    const matchesDepartment = !bulkForm.departments || bulkForm.departments === "all" || employee.department === bulkForm.departments
    const matchesDesignation = !bulkForm.designations || bulkForm.designations === "all" || employee.designation === bulkForm.designations
    return matchesDepartment && matchesDesignation
  })

  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Individual form data:", individualForm)
    setCreateMode(null)
    setIndividualForm({
      employee: "",
      shiftType: "",
      overtimePolicy: "",
      startDate: "",
      endDate: "",
    })
  }

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Bulk form data:", bulkForm, "Selected employees:", selectedEmployees)
    setCreateMode(null)
    setBulkForm({
      shiftType: "",
      departments: "",
      designations: "",
      startDate: "",
      endDate: "",
    })
    setSelectedEmployees([])
  }

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    )
  }

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredBulkEmployees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(filteredBulkEmployees.map((emp) => emp.id))
    }
  }

  // Individual Assignment Form
  if (createMode === "individual") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Shift Assignments</span>
              </div>
              <CardTitle>Add a Shift Assignment</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleIndividualSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employee">
                  Employee <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={individualForm.employee}
                  onValueChange={(value) => setIndividualForm({ ...individualForm, employee: value })}
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
                <Label htmlFor="shiftType">
                  Shift Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={individualForm.shiftType}
                  onValueChange={(value) => setIndividualForm({ ...individualForm, shiftType: value })}
                  required
                >
                  <SelectTrigger id="shiftType">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimePolicy">Overtime Policy</Label>
                <Select
                  value={individualForm.overtimePolicy}
                  onValueChange={(value) => setIndividualForm({ ...individualForm, overtimePolicy: value })}
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

              <div className="space-y-2">
                <Label htmlFor="startDate">
                  Start Date <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    value={individualForm.startDate}
                    onChange={(e) => setIndividualForm({ ...individualForm, startDate: e.target.value })}
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
                    value={individualForm.endDate}
                    onChange={(e) => setIndividualForm({ ...individualForm, endDate: e.target.value })}
                    className="pl-10"
                    placeholder="Select Date"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateMode(null)}
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

  // Bulk Assignment Form
  if (createMode === "bulk") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Shift Assignments</span>
              </div>
              <CardTitle>Bulk Shift Assignment</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBulkSubmit} className="space-y-6">
            {/* Filter Employees to Assign Shift */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Filter Employees to Assign Shift</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bulkShiftType">Shift Type</Label>
                  <Select
                    value={bulkForm.shiftType}
                    onValueChange={(value) => setBulkForm({ ...bulkForm, shiftType: value })}
                  >
                    <SelectTrigger id="bulkShiftType">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Shift Types</SelectItem>
                      {shiftTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bulkDepartments">Departments</Label>
                  <Select
                    value={bulkForm.departments}
                    onValueChange={(value) => setBulkForm({ ...bulkForm, departments: value })}
                  >
                    <SelectTrigger id="bulkDepartments">
                      <SelectValue placeholder="Select..." />
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bulkDesignations">Designations</Label>
                  <Select
                    value={bulkForm.designations}
                    onValueChange={(value) => setBulkForm({ ...bulkForm, designations: value })}
                  >
                    <SelectTrigger id="bulkDesignations">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Designations</SelectItem>
                      {designations.map((des) => (
                        <SelectItem key={des.id} value={des.name}>
                          {des.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bulkStartDate">Start Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="bulkStartDate"
                      type="date"
                      value={bulkForm.startDate}
                      onChange={(e) => setBulkForm({ ...bulkForm, startDate: e.target.value })}
                      className="pl-10"
                      placeholder="Select Date"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bulkEndDate">End Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="bulkEndDate"
                      type="date"
                      value={bulkForm.endDate}
                      onChange={(e) => setBulkForm({ ...bulkForm, endDate: e.target.value })}
                      className="pl-10"
                      placeholder="Select Date"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Selection Table */}
            {filteredBulkEmployees.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Select Employees</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                  >
                    {selectedEmployees.length === filteredBulkEmployees.length ? "Deselect All" : "Select All"}
                  </Button>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={selectedEmployees.length === filteredBulkEmployees.length && filteredBulkEmployees.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Employee</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Designation</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBulkEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedEmployees.includes(employee.id)}
                              onCheckedChange={() => handleSelectEmployee(employee.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={employee.avatar} alt={employee.name} />
                                <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-sm text-muted-foreground">ID: {employee.employeeId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.designation}</TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-green-500">
                              {employee.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateMode(null)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit" disabled={selectedEmployees.length === 0}>
                Save
              </Button>
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
              <span>Shift Assignments</span>
            </div>
            <CardTitle>Shift Assignments</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setCreateMode("individual")}>Individual</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCreateMode("bulk")}>Bulk</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={employees}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          shiftTypeFilter={shiftTypeFilter}
          onShiftTypeFilterChange={setShiftTypeFilter}
          shiftTypes={shiftTypes}
          onView={(assignment) => {
            // TODO: Implement view
            console.log("View", assignment)
          }}
          onEdit={(shift, assignment) => {
            // TODO: Implement edit
            console.log("Edit shift", shift, "for", assignment)
          }}
          onDelete={(shift, assignment) => {
            // TODO: Implement delete
            console.log("Delete shift", shift, "for", assignment)
          }}
          onDisable={(shift, assignment) => {
            // TODO: Implement disable
            console.log("Disable shift", shift, "for", assignment)
          }}
        />
      </CardContent>
    </Card>
  )
}
