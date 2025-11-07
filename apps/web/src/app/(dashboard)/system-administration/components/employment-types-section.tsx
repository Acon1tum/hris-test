"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/employment-types/data-table"
import { type EmploymentType } from "@/components/employment-types/columns"

const employmentTypes: EmploymentType[] = [
  { id: "1", name: "Full Time", code: "FT", description: "Full-time employment", createdAt: "July 24, 2025" },
  { id: "2", name: "Part Time", code: "PT", description: "Part-time employment", createdAt: "July 24, 2025" },
  { id: "3", name: "Contract", code: "CON", description: "Contract employment", createdAt: "July 24, 2025" },
  { id: "4", name: "Temporary", code: "TEMP", description: "Temporary employment", createdAt: "July 24, 2025" },
]

export function EmploymentTypesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData)
    setIsCreating(false)
  }

  const handleEdit = (type: EmploymentType) => {
    // TODO: Load employment type data into form
    setFormData({
      name: type.name,
      description: type.description,
    })
    setIsCreating(true)
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add New Employment Type</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Employment Types</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="resize-none"
                  placeholder="Enter description..."
                />
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
            <CardTitle>Employment Types</CardTitle>
            <CardDescription>Manage employment type classifications</CardDescription>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={employmentTypes}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(type) => {
            // TODO: Implement view
            console.log("View", type)
          }}
          onEdit={(type) => {
            handleEdit(type)
          }}
          onDelete={(type) => {
            // TODO: Implement delete
            console.log("Delete", type)
          }}
        />
      </CardContent>
    </Card>
  )
} 