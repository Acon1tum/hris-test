"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, ArrowLeft, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DataTable } from "@/components/employment-types/data-table"
import { type EmploymentType } from "@/components/employment-types/columns"
import { useEmploymentTypes, useCreateEmploymentType, useUpdateEmploymentType, useDeleteEmploymentType } from "@/hooks/useEmploymentTypes"
import { toast } from "sonner"

export function EmploymentTypesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Hooks
  const { data: employmentTypes = [], isLoading, error } = useEmploymentTypes()
  const createMutation = useCreateEmploymentType()
  const updateMutation = useUpdateEmploymentType()
  const deleteMutation = useDeleteEmploymentType()
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  })

  // Convert employment types to match the EmploymentType type from columns
  const employmentTypeData: EmploymentType[] = employmentTypes.map((type) => ({
    id: type.id,
    name: type.name,
    code: type.code,
    description: type.description || "",
    createdAt: new Date(type.createdAt).toLocaleDateString(),
  }))

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
    })
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          data: {
            ...formData,
            description: formData.description || null,
          },
        })
        toast.success("Employment type updated successfully")
      } else {
        await createMutation.mutateAsync({
          ...formData,
          description: formData.description || null,
        })
        toast.success("Employment type created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save employment type")
    }
  }

  const handleEdit = (type: EmploymentType) => {
    const fullType = employmentTypes.find((t) => t.id === type.id)
    if (fullType) {
      setFormData({
        name: fullType.name,
        code: fullType.code,
        description: fullType.description || "",
      })
      setEditingId(fullType.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (type: EmploymentType) => {
    if (!confirm(`Are you sure you want to delete "${type.name}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(type.id)
      toast.success("Employment type deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete employment type")
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    resetForm()
  }

  // Auto-generate code from name
  useEffect(() => {
    if (!editingId && formData.name) {
      const code = formData.name
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 10)
      setFormData((prev) => ({ ...prev, code }))
    }
  }, [formData.name, editingId])

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{editingId ? 'Edit Employment Type' : 'Create New Employment Type'}</CardTitle>
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
                <Label htmlFor="code">
                  Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                  placeholder="Auto-generated from name"
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
                onClick={handleCancel}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Employment Types</CardTitle>
          <CardDescription>Manage employment type classifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Employment Types</CardTitle>
          <CardDescription>Manage employment type classifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">
            Error loading employment types: {error instanceof Error ? error.message : "Unknown error"}
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
            <CardTitle>Employment Types</CardTitle>
            <CardDescription>Manage employment type classifications</CardDescription>
          </div>
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={employmentTypeData}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(type) => {
            handleEdit(type)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  )
} 