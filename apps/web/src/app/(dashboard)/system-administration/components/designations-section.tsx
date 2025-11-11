"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Plus, Loader2, Search } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { DataTable } from "@/components/designations/data-table"
import type { Designation as DesignationTableRow } from "@/components/designations/columns"
import {
  useDesignations,
  useCreateDesignation,
  useUpdateDesignation,
  useDeleteDesignation,
} from "@/hooks/useDesignations"
import { usePermissions, groupPermissionsByResource } from "@/hooks/usePermissions"
import { toast } from "sonner"
import { AnimatedLoader } from "@/components/ui/animated-loader"

export function DesignationsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [permissionSearch, setPermissionSearch] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set())
  const [permissionPreview, setPermissionPreview] = useState<DesignationTableRow | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const {
    data: designationsData,
    isLoading,
    isFetching,
    error,
    refetch: refetchDesignations,
  } = useDesignations()
  const { data: permissions = [], isLoading: isLoadingPermissions } = usePermissions()
  const createMutation = useCreateDesignation()
  const updateMutation = useUpdateDesignation()
  const deleteMutation = useDeleteDesignation()

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
    level: 1,
  })

  const designationsList = useMemo(() => designationsData ?? [], [designationsData])

  const tableData: DesignationTableRow[] = useMemo(
    () =>
      designationsList.map((designation) => ({
        id: designation.id,
        title: designation.title,
        code: designation.code,
        level: designation.level,
        description: designation.description ?? "",
        createdAt: designation.createdAt,
        updatedAt: designation.updatedAt,
        designationPermissions: designation.designationPermissions ?? [],
      })),
    [designationsList]
  )

  const groupedPermissions = useMemo(() => {
    const filtered = permissions.filter((p) =>
      p.name.toLowerCase().includes(permissionSearch.toLowerCase()) ||
      p.module.name.toLowerCase().includes(permissionSearch.toLowerCase()) ||
      p.resource.toLowerCase().includes(permissionSearch.toLowerCase())
    )
    return groupPermissionsByResource(filtered)
  }, [permissions, permissionSearch])

  const sortedModuleNames = useMemo(() => {
    return Object.keys(groupedPermissions).sort((a, b) => {
      const moduleA = permissions.find((p) => p.module.name === a)?.module
      const moduleB = permissions.find((p) => p.module.name === b)?.module
      return (moduleA?.order || 0) - (moduleB?.order || 0)
    })
  }, [groupedPermissions, permissions])

  const resetForm = () => {
    setFormData({
      title: "",
      code: "",
      description: "",
      level: 1,
    })
    setSelectedPermissions(new Set())
    setPermissionSearch("")
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const permissionIds = Array.from(selectedPermissions)
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          data: {
            ...formData,
            description: formData.description || null,
            permissionIds,
          },
        })
        toast.success("Designation updated successfully")
      } else {
        await createMutation.mutateAsync({
          ...formData,
          description: formData.description || null,
          permissionIds,
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

  const handleEdit = (designation: DesignationTableRow) => {
    const fullDesignation = designationsList.find((d) => d.id === designation.id)
    if (!fullDesignation) return

    setFormData({
      title: fullDesignation.title,
      code: fullDesignation.code,
      description: fullDesignation.description || "",
      level: fullDesignation.level,
    })
    const existingPermissionIds = new Set(
      fullDesignation.designationPermissions?.map((dp) => dp.permission.id) || []
    )
    setSelectedPermissions(existingPermissionIds)
    setEditingId(fullDesignation.id)
    setIsCreating(true)
  }

  const handleDelete = async (designation: DesignationTableRow) => {
    if (!confirm(`Are you sure you want to delete "${designation.title}"?`)) {
      return
    }

    try {
      setDeletingId(designation.id)
      await deleteMutation.mutateAsync(designation.id)
      toast.success("Designation deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete designation")
    } finally {
      setDeletingId(null)
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    resetForm()
  }

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(permissionId)) {
        newSet.delete(permissionId)
      } else {
        newSet.add(permissionId)
      }
      return newSet
    })
  }

  const toggleAllInCategory = (moduleName: string, resourceName: string) => {
    const categoryPermissions = groupedPermissions[moduleName]?.[resourceName] || []
    const allSelected = categoryPermissions.every((p) => selectedPermissions.has(p.id))

    setSelectedPermissions((prev) => {
      const newSet = new Set(prev)
      if (allSelected) {
        categoryPermissions.forEach((p) => newSet.delete(p.id))
      } else {
        categoryPermissions.forEach((p) => newSet.add(p.id))
      }
      return newSet
    })
  }

  const isCategoryAllSelected = (moduleName: string, resourceName: string) => {
    const categoryPermissions = groupedPermissions[moduleName]?.[resourceName] || []
    return (
      categoryPermissions.length > 0 &&
      categoryPermissions.every((p) => selectedPermissions.has(p.id))
    )
  }

  const isCategorySomeSelected = (moduleName: string, resourceName: string) => {
    const categoryPermissions = groupedPermissions[moduleName]?.[resourceName] || []
    return (
      categoryPermissions.some((p) => selectedPermissions.has(p.id)) &&
      !isCategoryAllSelected(moduleName, resourceName)
    )
  }

  useEffect(() => {
    if (!editingId && formData.title) {
      const code = formData.title
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 10)
      setFormData((prev) => ({ ...prev, code }))
    }
  }, [formData.title, editingId])

  const isRefreshing = isFetching && !isLoading

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="w-full text-center">Designation Name</CardTitle>
              <CardDescription className="mt-1 text-center">
                Add your designation.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Designation Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Enter designation name"
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the responsibilities or scope of this designation"
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="permission-search">Search Permissions</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="permission-search"
                  value={permissionSearch}
                  onChange={(e) => setPermissionSearch(e.target.value)}
                  placeholder="Search permissions..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-6 rounded-lg border p-4 max-h-[600px] overflow-y-auto">
              {isLoadingPermissions ? (
                <AnimatedLoader className="py-8" />
              ) : Object.keys(groupedPermissions).length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No permissions found
                </div>
              ) : (
                sortedModuleNames.map((moduleName) => {
                  const resources = groupedPermissions[moduleName]
                  return (
                    <div key={moduleName} className="space-y-4">
                      {Object.entries(resources).map(([resourceName, resourcePermissions]) => {
                        const displayResourceName = resourceName
                          .split("_")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")

                        return (
                          <div key={`${moduleName}-${resourceName}`} className="space-y-3">
                            <div className="flex items-center space-x-2 border-b pb-2">
                              <Checkbox
                                checked={isCategoryAllSelected(moduleName, resourceName)}
                                indeterminate={isCategorySomeSelected(moduleName, resourceName)}
                                onCheckedChange={() => toggleAllInCategory(moduleName, resourceName)}
                                id={`select-all-${moduleName}-${resourceName}`}
                              />
                              <Label
                                htmlFor={`select-all-${moduleName}-${resourceName}`}
                                className="cursor-pointer text-sm font-semibold"
                              >
                                Select All
                              </Label>
                              <span className="ml-2 text-sm text-muted-foreground">
                                {displayResourceName}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 gap-3 pl-6 md:grid-cols-2">
                              {resourcePermissions.map((permission) => (
                                <div key={permission.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`permission-${permission.id}`}
                                    checked={selectedPermissions.has(permission.id)}
                                    onCheckedChange={() => togglePermission(permission.id)}
                                  />
                                  <Label
                                    htmlFor={`permission-${permission.id}`}
                                    className="flex-1 cursor-pointer text-sm font-normal"
                                  >
                                    {permission.name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })
              )}
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-10 text-center shadow-sm">
        <AnimatedLoader className="mx-auto py-6" />
        <p className="text-sm text-muted-foreground">Loading designations...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4 rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center shadow-sm">
        <p className="text-base font-semibold text-destructive">Unable to load designations</p>
        <p className="text-sm text-muted-foreground">
          {error instanceof Error ? error.message : "An unexpected error occurred."}
        </p>
        <Button variant="outline" onClick={() => refetchDesignations()}>
          Try again
        </Button>
      </div>
    )
  }

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Roles &amp; Designations</h2>
            <p className="text-muted-foreground">
              Manage job titles and the permissions assigned to each designation.
            </p>
          </div>
          <Button
            size="lg"
            className="gap-2"
            onClick={() => {
              setIsCreating(true)
              resetForm()
            }}
          >
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </div>

        <DataTable
          data={tableData}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={setPermissionPreview}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
          onRefresh={() => refetchDesignations()}
          isRefreshing={isRefreshing}
        />
      </section>

      <Sheet
        open={Boolean(permissionPreview)}
        onOpenChange={(open) => {
          if (!open) setPermissionPreview(null)
        }}
      >
        <SheetContent side="right" className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{permissionPreview?.title ?? "Permissions"}</SheetTitle>
            <SheetDescription>
              {permissionPreview?.title
                ? "Complete list of permissions assigned to this designation."
                : "Select a designation to view its permissions."}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4 pr-2">
            {permissionPreview?.designationPermissions?.length ? (
              permissionPreview.designationPermissions.map((dp) => (
                <div
                  key={dp.id}
                  className="rounded-lg border border-dashed p-3"
                >
                  <p className="text-sm font-medium">{dp.permission.name}</p>
                  {dp.permission.module?.name && (
                    <p className="text-xs text-muted-foreground">
                      {dp.permission.module.name}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                This designation does not have any permissions assigned yet.
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
