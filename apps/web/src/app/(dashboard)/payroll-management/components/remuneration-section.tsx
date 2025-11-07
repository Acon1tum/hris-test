"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronRight,
  Plus,
  Search,
  MoreHorizontal,
  Maximize2,
  RefreshCw,
  Filter,
  ChevronLeft,
  Calendar as CalendarIcon,
  ArrowLeft,
  Trash2,
  ChevronDown,
  Users,
} from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import Link from "next/link"
import { DataTable as SalaryComponentsDataTable } from "@/components/salary-components/data-table"
import { DataTable as SalaryStructuresDataTable } from "@/components/salary-structures/data-table"
import { DataTable as SalaryStructureAssignmentsDataTable } from "@/components/salary-structure-assignments/data-table"
import { type SalaryComponent } from "@/components/salary-components/columns"
import { type SalaryStructure } from "@/components/salary-structures/columns"
import { type SalaryStructureAssignment } from "@/components/salary-structure-assignments/columns"

// Salary Components Data
const salaryComponents: SalaryComponent[] = [
  {
    id: "1",
    name: "Basic",
    type: "Earning",
    abbreviation: "BS",
    isTaxable: false,
    isEmployeeSuperannuation: false,
    isOvertimePayComponent: false,
    description: "",
    createdAt: new Date(2025, 6, 30),
    updatedAt: "about 1 month ago",
  },
  {
    id: "2",
    name: "Field Allowance",
    type: "Earning",
    abbreviation: "FA",
    isTaxable: false,
    isEmployeeSuperannuation: false,
    isOvertimePayComponent: false,
    description: "",
    createdAt: new Date(2025, 6, 30),
    updatedAt: "about 1 month ago",
  },
  {
    id: "3",
    name: "Housing Allowance",
    type: "Earning",
    abbreviation: "HA",
    isTaxable: false,
    isEmployeeSuperannuation: false,
    isOvertimePayComponent: false,
    description: "",
    createdAt: new Date(2025, 6, 30),
    updatedAt: "about 1 month ago",
  },
  {
    id: "4",
    name: "Medical Allowance",
    type: "Earning",
    abbreviation: "MA",
    isTaxable: false,
    isEmployeeSuperannuation: false,
    isOvertimePayComponent: false,
    description: "",
    createdAt: new Date(2025, 6, 30),
    updatedAt: "about 1 month ago",
  },
  {
    id: "5",
    name: "Other Deductions",
    type: "Deduction",
    abbreviation: "OD",
    isTaxable: true,
    isEmployeeSuperannuation: false,
    isOvertimePayComponent: false,
    description: "",
    createdAt: new Date(2025, 8, 25),
    updatedAt: "about 1 month ago",
  },
  {
    id: "6",
    name: "Paye Tax",
    type: "Deduction",
    abbreviation: "PT",
    isTaxable: true,
    isEmployeeSuperannuation: false,
    isOvertimePayComponent: false,
    description: "",
    createdAt: new Date(2025, 8, 25),
    updatedAt: "about 1 month ago",
  },
  {
    id: "7",
    name: "Staff Loan Repayment",
    type: "Deduction",
    abbreviation: "SLR",
    isTaxable: true,
    isEmployeeSuperannuation: false,
    isOvertimePayComponent: false,
    description: "",
    createdAt: new Date(2025, 8, 25),
    updatedAt: "about 1 month ago",
  },
  {
    id: "8",
    name: "Supper Annuation",
    type: "Deduction",
    abbreviation: "SA",
    isTaxable: true,
    isEmployeeSuperannuation: true,
    isOvertimePayComponent: false,
    description: "",
    createdAt: new Date(2025, 8, 25),
    updatedAt: "about 1 month ago",
  },
  {
    id: "9",
    name: "TDS",
    type: "Deduction",
    abbreviation: "---",
    isTaxable: true,
    isEmployeeSuperannuation: false,
    isOvertimePayComponent: false,
    description: "",
    createdAt: new Date(2025, 8, 25),
    updatedAt: "about 1 month ago",
  },
]

// Salary Structures Data
const salaryStructures: SalaryStructure[] = [
  {
    id: "1",
    name: "Assistant",
    salaryFrequency: "Monthly",
    description: "",
    totalComponents: 6,
    createdAt: new Date(2025, 6, 30),
  },
  {
    id: "2",
    name: "Executive",
    salaryFrequency: "Monthly",
    description: "",
    totalComponents: 5,
    createdAt: new Date(2025, 6, 30),
  },
]

// Salary Structure Assignments Data
const salaryStructureAssignments: SalaryStructureAssignment[] = [
  {
    id: "1",
    employeeName: "Valerie Christopher Morgan",
    employeeId: "1",
    effectiveDate: new Date(2025, 7, 30),
    salaryStructure: "Assistant",
    totalGross: "₱16,100.00",
    status: "Active",
    endDate: "",
    endStructure: false,
  },
  {
    id: "2",
    employeeName: "Lindsay Karen Eaton",
    employeeId: "2",
    effectiveDate: new Date(2025, 7, 30),
    salaryStructure: "Assistant",
    totalGross: "",
    status: "Active",
    endDate: "",
    endStructure: false,
  },
  {
    id: "3",
    employeeName: "David Potter",
    employeeId: "3",
    effectiveDate: new Date(2025, 7, 30),
    salaryStructure: "Assistant",
    totalGross: "",
    status: "Active",
    endDate: "",
    endStructure: false,
  },
  {
    id: "4",
    employeeName: "Joan Adrienne Tyler",
    employeeId: "4",
    effectiveDate: new Date(2025, 7, 30),
    salaryStructure: "Assistant",
    totalGross: "₱16,100.00",
    status: "Active",
    endDate: "",
    endStructure: false,
  },
  {
    id: "5",
    employeeName: "Jennifer Michael Davis",
    employeeId: "5",
    effectiveDate: new Date(2025, 7, 30),
    salaryStructure: "Assistant",
    totalGross: "",
    status: "Active",
    endDate: "",
    endStructure: false,
  },
  {
    id: "6",
    employeeName: "Susan Justin Howard",
    employeeId: "6",
    effectiveDate: new Date(2025, 7, 30),
    salaryStructure: "Assistant",
    totalGross: "",
    status: "Active",
    endDate: "",
    endStructure: false,
  },
  {
    id: "7",
    employeeName: "Anthony Mary Ray",
    employeeId: "7",
    effectiveDate: new Date(2025, 7, 30),
    salaryStructure: "Assistant",
    totalGross: "",
    status: "Active",
    endDate: "",
    endStructure: false,
  },
  {
    id: "8",
    employeeName: "Amor",
    employeeId: "8",
    effectiveDate: new Date(2025, 7, 30),
    salaryStructure: "Assistant",
    totalGross: "",
    status: "Active",
    endDate: "",
    endStructure: false,
  },
  {
    id: "9",
    employeeName: "Ashton Starc",
    employeeId: "9",
    effectiveDate: new Date(2025, 7, 30),
    salaryStructure: "Assistant",
    totalGross: "",
    status: "Active",
    endDate: "",
    endStructure: false,
  },
  {
    id: "10",
    employeeName: "Brandon Lewis",
    employeeId: "10",
    effectiveDate: new Date(2025, 7, 30),
    salaryStructure: "Assistant",
    totalGross: "",
    status: "Active",
    endDate: "",
    endStructure: false,
  },
]

const componentTypes = [
  { id: "1", name: "Earning" },
  { id: "2", name: "Deduction" },
]

const accounts = [
  { id: "1", name: "Salary Expense Account" },
  { id: "2", name: "Tax Payable Account" },
  { id: "3", name: "Deduction Account" },
]

const entryTypes = [
  { id: "1", name: "Credit" },
  { id: "2", name: "Debit" },
]

const salaryFrequencies = [
  { id: "1", name: "Monthly" },
  { id: "2", name: "Weekly" },
  { id: "3", name: "Bi-weekly" },
  { id: "4", name: "Annual" },
]

const calculationBases = [
  { id: "1", name: "Fixed Amount" },
  { id: "2", name: "Percentage" },
  { id: "3", name: "Formula" },
]

const departments = [
  { id: "1", name: "Sales" },
  { id: "2", name: "Marketing" },
  { id: "3", name: "HR" },
  { id: "4", name: "IT" },
  { id: "5", name: "Operations" },
]

const designations = [
  { id: "1", name: "Assistant" },
  { id: "2", name: "Executive" },
  { id: "3", name: "Manager" },
  { id: "4", name: "Director" },
]

const allEmployeesForAssignment = [
  { id: "1", name: "Valerie Christopher Morgan", employeeId: "EMP-00001", department: "Sales", designation: "Assistant" },
  { id: "2", name: "Lindsay Karen Eaton", employeeId: "EMP-00002", department: "Marketing", designation: "Executive" },
  { id: "3", name: "Linda Luis Lynn", employeeId: "EMP-00003", department: "HR", designation: "Assistant" },
  { id: "4", name: "Sean Richardson", employeeId: "EMP-00004", department: "IT", designation: "Executive" },
  { id: "5", name: "David Potter", employeeId: "EMP-00005", department: "Operations", designation: "Manager" },
  { id: "6", name: "Jennifer Michael Davis", employeeId: "EMP-00006", department: "Sales", designation: "Assistant" },
  { id: "7", name: "Joan Adrienne Tyler", employeeId: "EMP-00007", department: "Marketing", designation: "Executive" },
  { id: "8", name: "Nova Hamilton", employeeId: "EMP-00008", department: "HR", designation: "Assistant" },
  { id: "9", name: "Amor", employeeId: "EMP-00009", department: "IT", designation: "Executive" },
  { id: "10", name: "Anthony Mary Ray", employeeId: "EMP-00010", department: "Operations", designation: "Manager" },
]

export function RemunerationSection() {
  const [activeTab, setActiveTab] = useState("components")
  const [createMode, setCreateMode] = useState(false)
  const [assignmentViewMode, setAssignmentViewMode] = useState<"individual" | "bulk" | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [employeeFilter, setEmployeeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Form state for Salary Components
  const [componentFormData, setComponentFormData] = useState({
    name: "",
    abbreviation: "",
    type: "",
    description: "",
    isBasedOnTimeSheet: true,
    isOvertimePay: false,
    isEmployeeSuperannuation: false,
    isTaxable: false,
    account: "",
    entryType: "1", // Default to Credit
  })

  // Form state for Salary Structures
  const [structureFormData, setStructureFormData] = useState({
    name: "",
    description: "",
    salaryFrequency: "1", // Default to Monthly
    components: [
      {
        id: "1",
        salaryComponent: "",
        calculationBasis: "1", // Default to Fixed Amount
        fixedAmount: "0",
      },
    ],
  })

  const handleComponentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Component form data:", componentFormData)
    // TODO: Implement form submission
    setCreateMode(false)
    setComponentFormData({
      name: "",
      abbreviation: "",
      type: "",
      description: "",
      isBasedOnTimeSheet: true,
      isOvertimePay: false,
      isEmployeeSuperannuation: false,
      isTaxable: false,
      account: "",
      entryType: "1",
    })
  }

  const handleStructureSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Structure form data:", structureFormData)
    // TODO: Implement form submission
    setCreateMode(false)
    setStructureFormData({
      name: "",
      description: "",
      salaryFrequency: "1",
      components: [
        {
          id: "1",
          salaryComponent: "",
          calculationBasis: "1",
          fixedAmount: "0",
        },
      ],
    })
  }

  const addComponentRow = () => {
    setStructureFormData({
      ...structureFormData,
      components: [
        ...structureFormData.components,
        {
          id: Date.now().toString(),
          salaryComponent: "",
          calculationBasis: "1",
          fixedAmount: "0",
        },
      ],
    })
  }

  const removeComponentRow = (id: string) => {
    if (structureFormData.components.length > 1) {
      setStructureFormData({
        ...structureFormData,
        components: structureFormData.components.filter((comp) => comp.id !== id),
      })
    }
  }

  const updateComponentRow = (id: string, field: string, value: string) => {
    setStructureFormData({
      ...structureFormData,
      components: structureFormData.components.map((comp) =>
        comp.id === id ? { ...comp, [field]: value } : comp
      ),
    })
  }

  // Form state for Salary Structure Assignments
  const [individualAssignmentFormData, setIndividualAssignmentFormData] = useState({
    employee: "",
    salaryStructure: "",
    fromDate: "",
    totalGrossSalary: "0",
  })

  const [bulkAssignmentFormData, setBulkAssignmentFormData] = useState({
    salaryStructure: "",
    department: "all",
    designation: "all",
    selectedEmployees: new Set<string>(),
  })

  const handleIndividualAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Individual assignment form data:", individualAssignmentFormData)
    // TODO: Implement form submission
    setCreateMode(false)
    setAssignmentViewMode(null)
    setIndividualAssignmentFormData({
      employee: "",
      salaryStructure: "",
      fromDate: "",
      totalGrossSalary: "0",
    })
  }

  const handleBulkAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Bulk assignment form data:", {
      ...bulkAssignmentFormData,
      selectedEmployees: Array.from(bulkAssignmentFormData.selectedEmployees),
    })
    // TODO: Implement form submission
    setCreateMode(false)
    setAssignmentViewMode(null)
    setBulkAssignmentFormData({
      salaryStructure: "",
      department: "all",
      designation: "all",
      selectedEmployees: new Set<string>(),
    })
  }

  const handleSelectAllBulkEmployees = (checked: boolean) => {
    const filteredEmployees = getFilteredBulkEmployees()
    if (checked) {
      const allIds = filteredEmployees.map((emp) => emp.id)
      setBulkAssignmentFormData((prev) => ({
        ...prev,
        selectedEmployees: new Set(allIds),
      }))
    } else {
      setBulkAssignmentFormData((prev) => ({
        ...prev,
        selectedEmployees: new Set(),
      }))
    }
  }

  const handleSelectBulkEmployee = (employeeId: string, checked: boolean) => {
    setBulkAssignmentFormData((prev) => {
      const newSelection = new Set(prev.selectedEmployees)
      if (checked) {
        newSelection.add(employeeId)
      } else {
        newSelection.delete(employeeId)
      }
      return { ...prev, selectedEmployees: newSelection }
    })
  }

  const getFilteredBulkEmployees = () => {
    return allEmployeesForAssignment.filter((employee) => {
      const matchesDepartment = bulkAssignmentFormData.department === "all" || employee.department === bulkAssignmentFormData.department
      const matchesDesignation = bulkAssignmentFormData.designation === "all" || employee.designation === bulkAssignmentFormData.designation
      return matchesDepartment && matchesDesignation
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Create Form View for Salary Components
  if (createMode && activeTab === "components") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Salary Components</span>
              </div>
              <CardTitle>Add New Salary Component</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleComponentSubmit} className="space-y-6">
            {/* Salary Component Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Salary Component Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="componentName">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="componentName"
                    placeholder="Salary Component Name"
                    value={componentFormData.name}
                    onChange={(e) => setComponentFormData({ ...componentFormData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abbreviation">Abbreviation</Label>
                  <Input
                    id="abbreviation"
                    placeholder="Salary Component Abbreviation"
                    value={componentFormData.abbreviation}
                    onChange={(e) => setComponentFormData({ ...componentFormData, abbreviation: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={componentFormData.type}
                    onValueChange={(value) => setComponentFormData({ ...componentFormData, type: value })}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {componentTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Salary Component Description"
                  value={componentFormData.description}
                  onChange={(e) => setComponentFormData({ ...componentFormData, description: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              {/* Toggle Switches */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isBasedOnTimeSheet" className="cursor-pointer">
                    Is Based On Time Sheet
                  </Label>
                  <Switch
                    id="isBasedOnTimeSheet"
                    checked={componentFormData.isBasedOnTimeSheet}
                    onCheckedChange={(checked) =>
                      setComponentFormData({ ...componentFormData, isBasedOnTimeSheet: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="isOvertimePay" className="cursor-pointer">
                    Is Overtime Pay
                  </Label>
                  <Switch
                    id="isOvertimePay"
                    checked={componentFormData.isOvertimePay}
                    onCheckedChange={(checked) =>
                      setComponentFormData({ ...componentFormData, isOvertimePay: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="isEmployeeSuperannuation" className="cursor-pointer">
                    Is Employee Superannuation
                  </Label>
                  <Switch
                    id="isEmployeeSuperannuation"
                    checked={componentFormData.isEmployeeSuperannuation}
                    onCheckedChange={(checked) =>
                      setComponentFormData({ ...componentFormData, isEmployeeSuperannuation: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="isTaxable" className="cursor-pointer">
                    Is Taxable
                  </Label>
                  <Switch
                    id="isTaxable"
                    checked={componentFormData.isTaxable}
                    onCheckedChange={(checked) =>
                      setComponentFormData({ ...componentFormData, isTaxable: checked })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Accounts & Entry Type Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Accounts & Entry Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account">
                    Account <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={componentFormData.account}
                    onValueChange={(value) => setComponentFormData({ ...componentFormData, account: value })}
                    required
                  >
                    <SelectTrigger id="account">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entryType">
                    Entry Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={componentFormData.entryType}
                    onValueChange={(value) => setComponentFormData({ ...componentFormData, entryType: value })}
                    required
                  >
                    <SelectTrigger id="entryType">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {entryTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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

  // Create Form View for Individual Salary Structure Assignment
  if (createMode && activeTab === "assignments" && assignmentViewMode === "individual") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Salary Structure Assignments</span>
              </div>
              <CardTitle>Add New Salary Structure Assignment</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleIndividualAssignmentSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignmentEmployee">
                  Employee <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={individualAssignmentFormData.employee}
                  onValueChange={(value) =>
                    setIndividualAssignmentFormData({ ...individualAssignmentFormData, employee: value })
                  }
                  required
                >
                  <SelectTrigger id="assignmentEmployee">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {allEmployeesForAssignment.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name} (ID: {emp.employeeId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignmentSalaryStructure">
                  Salary Structure <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={individualAssignmentFormData.salaryStructure}
                  onValueChange={(value) =>
                    setIndividualAssignmentFormData({ ...individualAssignmentFormData, salaryStructure: value })
                  }
                  required
                >
                  <SelectTrigger id="assignmentSalaryStructure">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {salaryStructures.map((structure) => (
                      <SelectItem key={structure.id} value={structure.id}>
                        {structure.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fromDate">
                  From Date <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fromDate"
                    type="date"
                    value={individualAssignmentFormData.fromDate}
                    onChange={(e) =>
                      setIndividualAssignmentFormData({ ...individualAssignmentFormData, fromDate: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalGrossSalary">Total Gross Salary</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₱</span>
                  <Input
                    id="totalGrossSalary"
                    type="number"
                    value={individualAssignmentFormData.totalGrossSalary}
                    onChange={(e) =>
                      setIndividualAssignmentFormData({ ...individualAssignmentFormData, totalGrossSalary: e.target.value })
                    }
                    className="pl-8"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => {
                setCreateMode(false)
                setAssignmentViewMode(null)
              }}>
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

  // Create Form View for Bulk Salary Structure Assignment
  if (createMode && activeTab === "assignments" && assignmentViewMode === "bulk") {
    const filteredBulkEmployees = getFilteredBulkEmployees()
    const isAllSelected = filteredBulkEmployees.length > 0 && filteredBulkEmployees.every(emp => bulkAssignmentFormData.selectedEmployees.has(emp.id))
    const isSomeSelected = filteredBulkEmployees.some(emp => bulkAssignmentFormData.selectedEmployees.has(emp.id)) && !isAllSelected

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Salary Structure Assignments</span>
              </div>
              <CardTitle>Bulk Salary Structure Assignment</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBulkAssignmentSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Filter Employees to Assign Salary Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bulkSalaryStructure">
                    Salary Structure <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={bulkAssignmentFormData.salaryStructure}
                    onValueChange={(value) =>
                      setBulkAssignmentFormData({ ...bulkAssignmentFormData, salaryStructure: value })
                    }
                    required
                  >
                    <SelectTrigger id="bulkSalaryStructure">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {salaryStructures.map((structure) => (
                        <SelectItem key={structure.id} value={structure.id}>
                          {structure.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bulkDepartment">Departments</Label>
                  <Select
                    value={bulkAssignmentFormData.department}
                    onValueChange={(value) =>
                      setBulkAssignmentFormData({ ...bulkAssignmentFormData, department: value })
                    }
                  >
                    <SelectTrigger id="bulkDepartment">
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
                  <Label htmlFor="bulkDesignation">
                    Designations <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={bulkAssignmentFormData.designation}
                    onValueChange={(value) =>
                      setBulkAssignmentFormData({ ...bulkAssignmentFormData, designation: value })
                    }
                    required
                  >
                    <SelectTrigger id="bulkDesignation">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Designations</SelectItem>
                      {designations.map((desig) => (
                        <SelectItem key={desig.id} value={desig.name}>
                          {desig.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Employee Selection Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-center">
                      <Checkbox
                        checked={isAllSelected}
                        indeterminate={isSomeSelected}
                        onCheckedChange={handleSelectAllBulkEmployees}
                      />
                    </TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBulkEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No employees found matching filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBulkEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={bulkAssignmentFormData.selectedEmployees.has(employee.id)}
                            onCheckedChange={(checked) =>
                              handleSelectBulkEmployee(employee.id, !!checked)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
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
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => {
                setCreateMode(false)
                setAssignmentViewMode(null)
              }}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit" disabled={bulkAssignmentFormData.selectedEmployees.size === 0}>
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  // Create Form View for Salary Structures
  if (createMode && activeTab === "structures") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Salary Structures</span>
              </div>
              <CardTitle>Add a new Salary Structure</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleStructureSubmit} className="space-y-6">
            {/* Salary Structure Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Salary Structure Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="structureName">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="structureName"
                    placeholder="Enter Name"
                    value={structureFormData.name}
                    onChange={(e) => setStructureFormData({ ...structureFormData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryFrequency">
                    Salary Frequency <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={structureFormData.salaryFrequency}
                    onValueChange={(value) => setStructureFormData({ ...structureFormData, salaryFrequency: value })}
                    required
                  >
                    <SelectTrigger id="salaryFrequency">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {salaryFrequencies.map((freq) => (
                        <SelectItem key={freq.id} value={freq.id}>
                          {freq.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="structureDescription">Description</Label>
                <Textarea
                  id="structureDescription"
                  placeholder="Enter Description"
                  value={structureFormData.description}
                  onChange={(e) => setStructureFormData({ ...structureFormData, description: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            {/* Earning Deductions Salary Components Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Earning Deductions Salary Components</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        Salary Component <span className="text-destructive">*</span>
                      </TableHead>
                      <TableHead>
                        Calculation Basis <span className="text-destructive">*</span>
                      </TableHead>
                      <TableHead>
                        Fixed Amount <span className="text-destructive">*</span>
                      </TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {structureFormData.components.map((component, index) => (
                      <TableRow key={component.id}>
                        <TableCell>
                          <Select
                            value={component.salaryComponent}
                            onValueChange={(value) => updateComponentRow(component.id, "salaryComponent", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              {salaryComponents.map((comp) => (
                                <SelectItem key={comp.id} value={comp.id}>
                                  {comp.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={component.calculationBasis}
                            onValueChange={(value) => updateComponentRow(component.id, "calculationBasis", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              {calculationBases.map((basis) => (
                                <SelectItem key={basis.id} value={basis.id}>
                                  {basis.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={component.fixedAmount}
                            onChange={(e) => updateComponentRow(component.id, "fixedAmount", e.target.value)}
                            placeholder="0"
                            required
                            min="0"
                            step="0.01"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={addComponentRow}
                              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            {structureFormData.components.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeComponentRow(component.id)}
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Remuneration</span>
            </div>
            <CardTitle>
              {activeTab === "components"
                ? "Salary Components"
                : activeTab === "structures"
                ? "Salary Structures"
                : "Salary Structure Assignments"}
            </CardTitle>
          </div>
          {activeTab === "assignments" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {
                  setCreateMode(true)
                  setAssignmentViewMode("individual")
                }}>
                  Individual
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setCreateMode(true)
                  setAssignmentViewMode("bulk")
                }}>
                  Bulk
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setCreateMode(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value)
            setCreateMode(false)
            setAssignmentViewMode(null)
          }}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="components">Salary Components</TabsTrigger>
            <TabsTrigger value="structures">Salary Structures</TabsTrigger>
            <TabsTrigger value="assignments">Salary Structure Assignments</TabsTrigger>
          </TabsList>

          {/* Salary Components Tab */}
          <TabsContent value="components" className="space-y-4">
            <div className="flex items-center gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="earning">Earning</SelectItem>
                  <SelectItem value="deduction">Deduction</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <SalaryComponentsDataTable
              data={salaryComponents}
              search={searchQuery}
              onSearchChange={setSearchQuery}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
              onView={(component) => {
                // TODO: Implement view
                console.log("View", component)
              }}
              onEdit={(component) => {
                // TODO: Implement edit
                console.log("Edit", component)
              }}
              onDelete={(component) => {
                // TODO: Implement delete
                console.log("Delete", component)
              }}
            />
          </TabsContent>

          {/* Salary Structures Tab */}
          <TabsContent value="structures" className="space-y-4">
            <SalaryStructuresDataTable
              data={salaryStructures}
              search={searchQuery}
              onSearchChange={setSearchQuery}
              onView={(structure) => {
                // TODO: Implement view
                console.log("View", structure)
              }}
              onEdit={(structure) => {
                // TODO: Implement edit
                console.log("Edit", structure)
              }}
              onDelete={(structure) => {
                // TODO: Implement delete
                console.log("Delete", structure)
              }}
            />
          </TabsContent>

          {/* Salary Structure Assignments Tab */}
          <TabsContent value="assignments" className="space-y-4">
            <SalaryStructureAssignmentsDataTable
              data={salaryStructureAssignments}
              search={searchQuery}
              onSearchChange={setSearchQuery}
              employeeFilter={employeeFilter}
              onEmployeeFilterChange={setEmployeeFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              assignments={salaryStructureAssignments}
              onView={(assignment) => {
                // TODO: Implement view
                console.log("View", assignment)
              }}
              onEdit={(assignment) => {
                // TODO: Implement edit
                console.log("Edit", assignment)
              }}
              onDelete={(assignment) => {
                // TODO: Implement delete
                console.log("Delete", assignment)
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

