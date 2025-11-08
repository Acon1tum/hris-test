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
import { Plus, ArrowLeft, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DataTable } from "@/components/departments/data-table"
import { type Department } from "@/components/departments/columns"
import { useDepartments, useCreateDepartment, useUpdateDepartment, useDeleteDepartment } from "@/hooks/useDepartments"
import { useOffices } from "@/hooks/useOffices"
import { useEmployees } from "@/hooks/useEmployees"
import { toast } from "sonner"

export function DepartmentsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Hooks
  const { data: departments = [], isLoading: departmentsLoading, error: departmentsError } = useDepartments()
  const { data: offices = [], isLoading: officesLoading } = useOffices()
  const { data: employees = [], isLoading: employeesLoading } = useEmployees()
  const createMutation = useCreateDepartment()
  const updateMutation = useUpdateDepartment()
  const deleteMutation = useDeleteDepartment()
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    parentDepartmentId: "none",
    officeId: "none",
    departmentHeadId: "none",
  })

  // Convert departments to match the Department type from columns
  const departmentData: Department[] = departments.map((dept) => ({
    id: dept.id,
    name: dept.name,
    officeName: dept.office?.name || "---",
    departmentHeadName: dept.departmentHead 
      ? `${dept.departmentHead.user.firstName} ${dept.departmentHead.user.lastName}`
      : "---",
    parentDepartment: dept.parentDepartment?.name || "---",
    createdAt: new Date(dept.createdAt).toLocaleDateString(),
  }))

  // Filter out current department from parent department options when editing
  const parentDepartmentOptions = departments.filter(
    (dept) => !editingId || dept.id !== editingId
  )

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      parentDepartmentId: "none",
      officeId: "none",
      departmentHeadId: "none",
    })
    setEditingId(null)
  }

  const handleEdit = (department: Department) => {
    const fullDepartment = departments.find((d) => d.id === department.id)
    if (fullDepartment) {
      setFormData({
        name: fullDepartment.name,
        code: fullDepartment.code,
        description: fullDepartment.description || "",
        parentDepartmentId: fullDepartment.parentDepartmentId || "none",
        officeId: fullDepartment.officeId || "none",
        departmentHeadId: fullDepartment.departmentHeadId || "none",
      })
      setEditingId(fullDepartment.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (department: Department) => {
    if (!confirm(`Are you sure you want to delete "${department.name}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(department.id)
      toast.success("Department deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete department")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const submitData = {
        name: formData.name,
        code: formData.code,
        description: formData.description || null,
        parentDepartmentId: formData.parentDepartmentId === "none" ? null : formData.parentDepartmentId,
        officeId: formData.officeId === "none" ? null : formData.officeId,
        departmentHeadId: formData.departmentHeadId === "none" ? null : formData.departmentHeadId,
      }

      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          data: submitData,
        })
        toast.success("Department updated successfully")
      } else {
        await createMutation.mutateAsync(submitData)
        toast.success("Department created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save department")
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
              <CardTitle>{editingId ? 'Edit Department' : 'Create New Department'}</CardTitle>
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

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Department description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentDepartment">Parent Department</Label>
                <Select
                  value={formData.parentDepartmentId}
                  onValueChange={(value) => setFormData({ ...formData, parentDepartmentId: value })}
                >
                  <SelectTrigger id="parentDepartment">
                    <SelectValue placeholder="Select parent department (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {parentDepartmentOptions.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name} ({dept.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="office">Office</Label>
                <Select
                  value={formData.officeId}
                  onValueChange={(value) => setFormData({ ...formData, officeId: value })}
                  disabled={officesLoading}
                >
                  <SelectTrigger id="office">
                    <SelectValue placeholder={officesLoading ? "Loading offices..." : "Select office (optional)"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {offices.map((office) => (
                      <SelectItem key={office.id} value={office.id}>
                        {office.name} {office.branchName ? `- ${office.branchName}` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="departmentHead">Department Head</Label>
                <Select
                  value={formData.departmentHeadId}
                  onValueChange={(value) => setFormData({ ...formData, departmentHeadId: value })}
                  disabled={employeesLoading}
                >
                  <SelectTrigger id="departmentHead">
                    <SelectValue placeholder={employeesLoading ? "Loading employees..." : "Select department head (optional)"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.user.firstName} {employee.user.lastName} ({employee.employeeNumber})
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

  if (departmentsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
          <CardDescription>Manage departments and organizational structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (departmentsError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
          <CardDescription>Manage departments and organizational structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">
            Error loading departments: {departmentsError instanceof Error ? departmentsError.message : "Unknown error"}
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
            <CardTitle>Departments</CardTitle>
            <CardDescription>Manage departments and organizational structure</CardDescription>
          </div>
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={departmentData}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(dept) => {
            handleEdit(dept)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  )
}
