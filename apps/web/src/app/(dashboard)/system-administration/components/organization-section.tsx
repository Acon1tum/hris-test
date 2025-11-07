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
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
import { useState, useRef } from "react"
import { DataTable } from "@/components/organization/data-table"
import { type Organization } from "@/components/organization/columns"

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

// Sample organizations data
const organizations: Organization[] = [
  {
    id: "1",
    name: "SPREP",
    slug: "sprep",
    currencyCode: "Philippine Peso",
    timeZone: "Asia/Manila",
    domain: "sprep.org",
    employeeIdLabel: "SSN",
    createdAt: "July 24, 2025",
  },
]

export function OrganizationSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "SPREP",
    slug: "sprep",
    currencyCode: "PHP",
    dayFormat: "F d, Y",
    timeFormat: "h:i:s A",
    timeZone: "Asia/Manila",
    domain: "",
    employeeIdLabel: "SSN",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData, "Avatar:", avatarPreview)
    setIsCreating(false)
  }

  const handleEdit = (org: Organization) => {
    // TODO: Load organization data into form
    setIsCreating(true)
  }

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
              <CardTitle>Organization Settings</CardTitle>
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
              onClick={() => setIsCreating(false)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit">Submit</Button>
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
            <CardTitle>Organization Settings</CardTitle>
            <CardDescription>Manage organization configuration and preferences</CardDescription>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={organizations}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(org) => {
            // TODO: Implement view
            console.log("View", org)
          }}
          onEdit={(org) => {
            handleEdit(org)
          }}
          onDelete={(org) => {
            // TODO: Implement delete
            console.log("Delete", org)
          }}
        />
      </CardContent>
    </Card>
  )
} 