"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, ArrowLeft, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DataTable } from "@/components/designations/data-table"
import { type Designation } from "@/components/designations/columns"
import { useDesignations, useCreateDesignation, useUpdateDesignation, useDeleteDesignation } from "@/hooks/useDesignations"
import { toast } from "sonner"

export function DesignationsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Hooks
  const { data: designations = [], isLoading, error } = useDesignations()
  const createMutation = useCreateDesignation()
  const updateMutation = useUpdateDesignation()
  const deleteMutation = useDeleteDesignation()
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
    level: 1,
  })

  // Convert designations to match the Designation type from columns
  const designationData: Designation[] = designations.map((designation) => ({
    id: designation.id,
    title: designation.title,
    code: designation.code,
    level: designation.level,
    description: designation.description || "",
    createdAt: new Date(designation.createdAt).toLocaleDateString(),
  }))

  const resetForm = () => {
    setFormData({
      title: "",
      code: "",
      description: "",
      level: 1,
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
        toast.success("Designation updated successfully")
      } else {
        await createMutation.mutateAsync({
          ...formData,
          description: formData.description || null,
        })
        toast.success("Designation created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save designation")
    }
  }

  const handleEdit = (designation: Designation) => {
    const fullDesignation = designations.find((d) => d.id === designation.id)
    if (fullDesignation) {
      setFormData({
        title: fullDesignation.title,
        code: fullDesignation.code,
        description: fullDesignation.description || "",
        level: fullDesignation.level,
      })
      setEditingId(fullDesignation.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (designation: Designation) => {
    if (!confirm(`Are you sure you want to delete "${designation.title}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(designation.id)
      toast.success("Designation deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete designation")
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    resetForm()
  }

  // Auto-generate code from title
  useEffect(() => {
    if (!editingId && formData.title) {
      const code = formData.title
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 10)
      setFormData((prev) => ({ ...prev, code }))
    }
  }, [formData.title, editingId])

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{editingId ? 'Edit Designation' : 'Create New Designation'}</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Designations</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  placeholder="Auto-generated from title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">
                  Level <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="level"
                  type="number"
                  min="1"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) || 1 })}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
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
          <CardTitle>Designations</CardTitle>
          <CardDescription>Manage job titles and designations</CardDescription>
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
          <CardTitle>Designations</CardTitle>
          <CardDescription>Manage job titles and designations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">
            Error loading designations: {error instanceof Error ? error.message : "Unknown error"}
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
            <CardTitle>Designations</CardTitle>
            <CardDescription>Manage job titles and designations</CardDescription>
          </div>
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={designationData}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(designation) => {
            handleEdit(designation)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  )
}
