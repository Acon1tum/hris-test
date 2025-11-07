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
import { DataTable } from "@/components/departments/data-table"
import { type Department } from "@/components/departments/columns"

const departments: Department[] = [
  { id: "1", name: "Finance", officeName: "SPREP", departmentHeadName: "Karina Samuel Berger", parentDepartment: "---", createdAt: "July 24, 2025" },
  { id: "2", name: "HR", officeName: "SPREP", departmentHeadName: "Taylor Lisa Williams", parentDepartment: "---", createdAt: "July 24, 2025" },
  { id: "3", name: "Marketing", officeName: "SPREP", departmentHeadName: "James Jason Tate", parentDepartment: "---", createdAt: "July 24, 2025" },
  { id: "4", name: "Operations", officeName: "SPREP", departmentHeadName: "Susan Justin Howard", parentDepartment: "---", createdAt: "July 24, 2025" },
  { id: "5", name: "Sales", officeName: "SPREP", departmentHeadName: "Jason Aaron Owens", parentDepartment: "---", createdAt: "July 24, 2025" },
]

// Sample data for dropdowns
const parentDepartments = [
  { id: "1", name: "Finance" },
  { id: "2", name: "HR" },
  { id: "3", name: "Marketing" },
  { id: "4", name: "Operations" },
]

const offices = [
  { id: "1", name: "SPREP" },
  { id: "2", name: "Pacific Office" },
  { id: "3", name: "Regional Office" },
]

const departmentHeads = [
  { id: "1", name: "Karina Samuel Berger" },
  { id: "2", name: "Taylor Lisa Williams" },
  { id: "3", name: "James Jason Tate" },
  { id: "4", name: "Susan Justin Howard" },
  { id: "5", name: "Jason Aaron Owens" },
]

export function DepartmentsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    parentDepartment: "",
    office: "",
    departmentHead: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData)
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Create New Department</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Departments</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Label htmlFor="parentDepartment">Parent Department</Label>
                <Select
                  value={formData.parentDepartment}
                  onValueChange={(value) => setFormData({ ...formData, parentDepartment: value })}
                >
                  <SelectTrigger id="parentDepartment">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {parentDepartments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="office">Office</Label>
                <Select
                  value={formData.office}
                  onValueChange={(value) => setFormData({ ...formData, office: value })}
                >
                  <SelectTrigger id="office">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {offices.map((office) => (
                      <SelectItem key={office.id} value={office.id}>
                        {office.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="departmentHead">Department Head</Label>
                <Select
                  value={formData.departmentHead}
                  onValueChange={(value) => setFormData({ ...formData, departmentHead: value })}
                >
                  <SelectTrigger id="departmentHead">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentHeads.map((head) => (
                      <SelectItem key={head.id} value={head.id}>
                        {head.name}
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
            <CardTitle>Departments</CardTitle>
            <CardDescription>Manage departments and organizational structure</CardDescription>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={departments}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(dept) => {
            // TODO: Implement view
            console.log("View", dept)
          }}
          onEdit={(dept) => {
            // TODO: Implement edit
            console.log("Edit", dept)
          }}
          onDelete={(dept) => {
            // TODO: Implement delete
            console.log("Delete", dept)
          }}
        />
      </CardContent>
    </Card>
  )
} 