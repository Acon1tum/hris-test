"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, ArrowLeft, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DataTable } from "@/components/grades/data-table"
import { type Grade } from "@/components/grades/columns"
import { useGrades, useCreateGrade, useUpdateGrade, useDeleteGrade } from "@/hooks/useGrades"
import { toast } from "sonner"

export function EmployeeGradesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Hooks
  const { data: grades = [], isLoading, error } = useGrades()
  const createMutation = useCreateGrade()
  const updateMutation = useUpdateGrade()
  const deleteMutation = useDeleteGrade()
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    level: 1,
    description: "",
  })

  // Convert grades to match the Grade type from columns
  const gradeData: Grade[] = grades.map((grade) => ({
    id: grade.id,
    name: grade.name,
    code: grade.code,
    level: grade.level,
    description: grade.description || "",
    createdAt: new Date(grade.createdAt).toLocaleDateString(),
  }))

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      level: 1,
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
        toast.success("Grade updated successfully")
      } else {
        await createMutation.mutateAsync({
          ...formData,
          description: formData.description || null,
        })
        toast.success("Grade created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save grade")
    }
  }

  const handleEdit = (grade: Grade) => {
    const fullGrade = grades.find((g) => g.id === grade.id)
    if (fullGrade) {
      setFormData({
        name: fullGrade.name,
        code: fullGrade.code,
        level: fullGrade.level,
        description: fullGrade.description || "",
      })
      setEditingId(fullGrade.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (grade: Grade) => {
    if (!confirm(`Are you sure you want to delete "${grade.name}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(grade.id)
      toast.success("Grade deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete grade")
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
              <CardTitle>{editingId ? 'Edit Employee Grade' : 'Create New Employee Grade'}</CardTitle>
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
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Employee Grades</CardTitle>
            <CardDescription>Manage employee grade classifications</CardDescription>
          </div>
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-destructive">
            Error loading grades: {error instanceof Error ? error.message : "Unknown error"}
          </div>
        ) : (
          <DataTable
            data={gradeData}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            onView={(grade) => {
              handleEdit(grade)
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </CardContent>
    </Card>
  )
} 