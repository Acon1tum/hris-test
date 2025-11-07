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
import { ArrowLeft, Upload, X, Plus, Loader2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { DataTable } from "@/components/organization/data-table"
import { type Organization } from "@/components/organization/columns"
import { useOrganizations, useCreateOrganization, useUpdateOrganization, useDeleteOrganization } from "@/hooks/useOrganizations"
import { toast } from "sonner"

// Sample data for dropdowns
const currencyCodes = [
  { value: "PHP", label: "Philippine Peso" },
  { value: "USD", label: "US Dollar" },
  { value: "EUR", label: "Euro" },
  { value: "GBP", label: "British Pound" },
  { value: "JPY", label: "Japanese Yen" },
  { value: "AUD", label: "Australian Dollar" },
]

const dayFormats = [
  { value: "F d, Y", label: "November 05, 2025" },
  { value: "d/m/Y", label: "05/11/2025" },
  { value: "m/d/Y", label: "11/05/2025" },
  { value: "Y-m-d", label: "2025-11-05" },
  { value: "d-M-Y", label: "05-Nov-2025" },
]

const timeFormats = [
  { value: "h:i:s A", label: "09:34:57 AM" },
  { value: "H:i:s", label: "09:34:57" },
  { value: "h:i A", label: "09:34 AM" },
  { value: "H:i", label: "09:34" },
]

const timeZones = [
  { value: "Asia/Manila", label: "Asia/Manila (UTC+8) - November 05, 2025 09:34:58 AM" },
  { value: "America/New_York", label: "America/New_York (UTC-5)" },
  { value: "Europe/London", label: "Europe/London (UTC+0)" },
  { value: "Asia/Tokyo", label: "Asia/Tokyo (UTC+9)" },
  { value: "Australia/Sydney", label: "Australia/Sydney (UTC+10)" },
]

export function OrganizationSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  
  // Hooks
  const { data: organizations = [], isLoading, error } = useOrganizations()
  const createMutation = useCreateOrganization()
  const updateMutation = useUpdateOrganization()
  const deleteMutation = useDeleteOrganization()
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    currencyCode: "PHP",
    dayFormat: "F d, Y",
    timeFormat: "h:i:s A",
    timeZone: "Asia/Manila",
    domain: "",
    employeeIdLabel: "Employee ID",
    avatar: "",
  })

  // Convert organizations to match the Organization type from columns
  const organizationData: Organization[] = organizations.map((org) => ({
    id: org.id,
    name: org.name,
    slug: org.slug,
    currencyCode: org.currencyCode,
    timeZone: org.timeZone,
    domain: org.domain || "",
    employeeIdLabel: org.employeeIdLabel,
    createdAt: new Date(org.createdAt).toLocaleDateString(),
  }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          data: {
            ...formData,
            domain: formData.domain || null,
            avatar: avatarPreview || null,
          },
        })
        toast.success("Organization updated successfully")
      } else {
        await createMutation.mutateAsync({
          ...formData,
          domain: formData.domain || undefined,
          avatar: avatarPreview || undefined,
        })
        toast.success("Organization created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      setAvatarPreview(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save organization")
    }
  }

  const handleEdit = (org: Organization) => {
    const fullOrg = organizations.find((o) => o.id === org.id)
    if (fullOrg) {
      setFormData({
        name: fullOrg.name,
        slug: fullOrg.slug,
        currencyCode: fullOrg.currencyCode,
        dayFormat: fullOrg.dayFormat,
        timeFormat: fullOrg.timeFormat,
        timeZone: fullOrg.timeZone,
        domain: fullOrg.domain || "",
        employeeIdLabel: fullOrg.employeeIdLabel,
        avatar: fullOrg.avatar || "",
      })
      setAvatarPreview(fullOrg.avatar || null)
      setEditingId(fullOrg.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (org: Organization) => {
    if (!confirm(`Are you sure you want to delete "${org.name}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(org.id)
      toast.success("Organization deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete organization")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      currencyCode: "PHP",
      dayFormat: "F d, Y",
      timeFormat: "h:i:s A",
      timeZone: "Asia/Manila",
      domain: "",
      employeeIdLabel: "Employee ID",
      avatar: "",
    })
    setAvatarPreview(null)
    setEditingId(null)
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    resetForm()
  }

  // Auto-generate slug from name
  useEffect(() => {
    if (!editingId && formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.name, editingId])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveAvatar = () => {
    setAvatarPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleChooseAvatar = () => {
    fileInputRef.current?.click()
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{editingId ? 'Edit Organization' : 'Create Organization'}</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Organization Settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Labels */}
            <div className="space-y-6">
              <div className="space-y-1">
                <Label>
                  Name <span className="text-destructive">*</span>
                </Label>
              </div>
              
              <div className="space-y-1">
                <Label>
                  Slug <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">Update organization slug from here</p>
              </div>

              <div className="space-y-1">
                <Label>
                  Currency Code <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">Update currency code from here</p>
              </div>

              <div className="space-y-1">
                <Label>
                  Day format <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">Update day format from here</p>
              </div>

              <div className="space-y-1">
                <Label>
                  Time format <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">Update time format from here</p>
              </div>

              <div className="space-y-1">
                <Label>
                  Time Zone <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">Update time zone from here</p>
              </div>

              <div className="space-y-1">
                <Label>Domain</Label>
              </div>

              <div className="space-y-1">
                <Label>
                  Employee Identification No Label <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">Update employee identification no label from here</p>
              </div>

              <div className="space-y-1">
                <Label>Avatar</Label>
              </div>
            </div>

            {/* Right Column - Inputs */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Select
                  value={formData.currencyCode}
                  onValueChange={(value) => setFormData({ ...formData, currencyCode: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencyCodes.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Select
                  value={formData.dayFormat}
                  onValueChange={(value) => setFormData({ ...formData, dayFormat: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dayFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Select
                  value={formData.timeFormat}
                  onValueChange={(value) => setFormData({ ...formData, timeFormat: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Select
                  value={formData.timeZone}
                  onValueChange={(value) => setFormData({ ...formData, timeZone: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Input
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="Enter domain"
                />
              </div>

              <div className="space-y-2">
                <Input
                  value={formData.employeeIdLabel}
                  onChange={(e) => setFormData({ ...formData, employeeIdLabel: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <div className="relative border-2 border-dashed rounded-lg p-8 min-h-[150px] flex items-center justify-center">
                  {avatarPreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="max-w-full max-h-[300px] mx-auto rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveAvatar}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">No avatar selected</p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleChooseAvatar}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Choose
                      </Button>
                    </div>
                  )}
                </div>
              </div>
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
          <CardTitle>Organization Settings</CardTitle>
          <CardDescription>Manage organization configuration and preferences</CardDescription>
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
          <CardTitle>Organization Settings</CardTitle>
          <CardDescription>Manage organization configuration and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">
            Error loading organizations: {error instanceof Error ? error.message : "Unknown error"}
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
            <CardTitle>Organization Settings</CardTitle>
            <CardDescription>Manage organization configuration and preferences</CardDescription>
          </div>
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={organizationData}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(org) => {
            handleEdit(org)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  )
} 