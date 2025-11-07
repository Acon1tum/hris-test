"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Plus, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/grades/data-table"
import { type Grade } from "@/components/grades/columns"

const grades: Grade[] = [
  { id: "1", name: "Grade A", code: "GR-A", level: 5, description: "Senior management level", createdAt: "July 24, 2025" },
  { id: "2", name: "Grade B", code: "GR-B", level: 4, description: "Management level", createdAt: "July 24, 2025" },
  { id: "3", name: "Grade C", code: "GR-C", level: 3, description: "Supervisory level", createdAt: "July 24, 2025" },
  { id: "4", name: "Grade D", code: "GR-D", level: 2, description: "Professional level", createdAt: "July 24, 2025" },
  { id: "5", name: "Grade E", code: "GR-E", level: 1, description: "Entry level", createdAt: "July 24, 2025" },
]

// Sample data for dropdowns
const leavePolicies = [
  { id: "1", name: "Standard Leave Policy" },
  { id: "2", name: "Manager Leave Policy" },
  { id: "3", name: "Executive Leave Policy" },
]

const employmentTypes = [
  { id: "1", name: "Full Time" },
  { id: "2", name: "Part Time" },
  { id: "3", name: "Contract" },
  { id: "4", name: "Temporary" },
]

const salaryStructures = [
  { id: "1", name: "Structure A" },
  { id: "2", name: "Structure B" },
  { id: "3", name: "Structure C" },
]

export function EmployeeGradesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    leavePolicy: "",
    employmentType: "",
    salaryStructure: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData)
    setIsCreating(false)
  }

  const handleEdit = (grade: Grade) => {
    // TODO: Load employee grade data into form
    setIsCreating(true)
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add New Employee Grade</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Employment Grades</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="leavePolicy">Leave Policy</Label>
                <Select
                  value={formData.leavePolicy}
                  onValueChange={(value) => setFormData({ ...formData, leavePolicy: value })}
                >
                  <SelectTrigger id="leavePolicy">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {leavePolicies.map((policy) => (
                      <SelectItem key={policy.id} value={policy.id}>
                        {policy.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select
                  value={formData.employmentType}
                  onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
                >
                  <SelectTrigger id="employmentType">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {employmentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryStructure">Salary Structure</Label>
                <Select
                  value={formData.salaryStructure}
                  onValueChange={(value) => setFormData({ ...formData, salaryStructure: value })}
                >
                  <SelectTrigger id="salaryStructure">
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
            <CardTitle>Employee Grades</CardTitle>
            <CardDescription>Manage employee grade classifications</CardDescription>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={grades}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(grade) => {
            // TODO: Implement view
            console.log("View", grade)
          }}
          onEdit={(grade) => {
            handleEdit(grade)
          }}
          onDelete={(grade) => {
            // TODO: Implement delete
            console.log("Delete", grade)
          }}
        />
      </CardContent>
    </Card>
  )
} 