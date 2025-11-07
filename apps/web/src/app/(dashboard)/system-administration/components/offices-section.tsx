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
import { Textarea } from "@/components/ui/textarea"
import { Plus, ArrowLeft, X, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DataTable } from "@/components/offices/data-table"
import { type Office, formatOfficeLocation } from "@/components/offices/columns"
import { useOffices, useCreateOffice, useUpdateOffice, useDeleteOffice } from "@/hooks/useOffices"
import { toast } from "sonner"
import type { OfficePhone, OfficeEmail } from "@/services/office.service"

// Philippine Regions (simplified list - can be expanded)
const philippineRegions = [
  { value: "National Capital Region (NCR)", label: "National Capital Region (NCR)" },
  { value: "Cordillera Administrative Region (CAR)", label: "Cordillera Administrative Region (CAR)" },
  { value: "Ilocos Region (Region I)", label: "Ilocos Region (Region I)" },
  { value: "Cagayan Valley (Region II)", label: "Cagayan Valley (Region II)" },
  { value: "Central Luzon (Region III)", label: "Central Luzon (Region III)" },
  { value: "CALABARZON (Region IV-A)", label: "CALABARZON (Region IV-A)" },
  { value: "MIMAROPA (Region IV-B)", label: "MIMAROPA (Region IV-B)" },
  { value: "Bicol Region (Region V)", label: "Bicol Region (Region V)" },
  { value: "Western Visayas (Region VI)", label: "Western Visayas (Region VI)" },
  { value: "Central Visayas (Region VII)", label: "Central Visayas (Region VII)" },
  { value: "Eastern Visayas (Region VIII)", label: "Eastern Visayas (Region VIII)" },
  { value: "Zamboanga Peninsula (Region IX)", label: "Zamboanga Peninsula (Region IX)" },
  { value: "Northern Mindanao (Region X)", label: "Northern Mindanao (Region X)" },
  { value: "Davao Region (Region XI)", label: "Davao Region (Region XI)" },
  { value: "SOCCSKSARGEN (Region XII)", label: "SOCCSKSARGEN (Region XII)" },
  { value: "Caraga (Region XIII)", label: "Caraga (Region XIII)" },
  { value: "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)", label: "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)" },
]

// Major Philippine Provinces (simplified - can be expanded)
const philippineProvinces = [
  { value: "Metro Manila", label: "Metro Manila" },
  { value: "Bulacan", label: "Bulacan" },
  { value: "Cavite", label: "Cavite" },
  { value: "Laguna", label: "Laguna" },
  { value: "Rizal", label: "Rizal" },
  { value: "Pampanga", label: "Pampanga" },
  { value: "Batangas", label: "Batangas" },
  { value: "Cebu", label: "Cebu" },
  { value: "Davao del Sur", label: "Davao del Sur" },
  { value: "Iloilo", label: "Iloilo" },
  { value: "Negros Occidental", label: "Negros Occidental" },
  { value: "Quezon", label: "Quezon" },
  { value: "Zamboanga del Sur", label: "Zamboanga del Sur" },
  { value: "Palawan", label: "Palawan" },
  { value: "Albay", label: "Albay" },
]

// Major Philippine Cities (simplified - can be expanded)
const philippineCities = [
  { value: "Manila", label: "Manila" },
  { value: "Quezon City", label: "Quezon City" },
  { value: "Caloocan", label: "Caloocan" },
  { value: "Pasig", label: "Pasig" },
  { value: "Makati", label: "Makati" },
  { value: "Taguig", label: "Taguig" },
  { value: "Mandaluyong", label: "Mandaluyong" },
  { value: "Cebu City", label: "Cebu City" },
  { value: "Davao City", label: "Davao City" },
  { value: "Iloilo City", label: "Iloilo City" },
  { value: "Bacolod", label: "Bacolod" },
  { value: "Antipolo", label: "Antipolo" },
  { value: "Puerto Princesa", label: "Puerto Princesa" },
  { value: "Zamboanga City", label: "Zamboanga City" },
  { value: "Legazpi", label: "Legazpi" },
]

export function OfficesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [phoneNumbers, setPhoneNumbers] = useState<OfficePhone[]>([{ countryCode: "+63", number: "", isPrimary: false }])
  const [emailAddresses, setEmailAddresses] = useState<OfficeEmail[]>([{ email: "", isPrimary: false }])
  
  // Hooks
  const { data: offices = [], isLoading, error } = useOffices()
  const createMutation = useCreateOffice()
  const updateMutation = useUpdateOffice()
  const deleteMutation = useDeleteOffice()
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    branchName: "",
    description: "",
    region: "",
    province: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    barangay: "",
    zipCode: "",
    country: "Philippines",
  })

  // Convert offices to match the Office type from columns
  const officeData: Office[] = offices.map((office) => ({
    id: office.id,
    name: office.name,
    location: formatOfficeLocation(office),
    createdAt: new Date(office.createdAt).toLocaleDateString(),
  }))

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, { countryCode: "+63", number: "", isPrimary: false }])
  }

  const handleRemovePhoneNumber = (index: number) => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index))
    }
  }

  const handlePhoneNumberChange = (index: number, field: keyof OfficePhone, value: string | boolean) => {
    const newPhones = [...phoneNumbers]
    if (field === 'isPrimary' && value === true) {
      // Set all other phones to not primary
      newPhones.forEach((phone, i) => {
        phone.isPrimary = i === index
      })
    } else {
      newPhones[index] = { ...newPhones[index], [field]: value }
    }
    setPhoneNumbers(newPhones)
  }

  const handleAddEmail = () => {
    setEmailAddresses([...emailAddresses, { email: "", isPrimary: false }])
  }

  const handleRemoveEmail = (index: number) => {
    if (emailAddresses.length > 1) {
      setEmailAddresses(emailAddresses.filter((_, i) => i !== index))
    }
  }

  const handleEmailChange = (index: number, field: keyof OfficeEmail, value: string | boolean) => {
    const newEmails = [...emailAddresses]
    if (field === 'isPrimary' && value === true) {
      // Set all other emails to not primary
      newEmails.forEach((email, i) => {
        email.isPrimary = i === index
      })
    } else {
      newEmails[index] = { ...newEmails[index], [field]: value }
    }
    setEmailAddresses(newEmails)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      branchName: "",
      description: "",
      region: "",
      province: "",
      city: "",
      addressLine1: "",
      addressLine2: "",
      barangay: "",
      zipCode: "",
      country: "Philippines",
    })
    setPhoneNumbers([{ countryCode: "+63", number: "", isPrimary: false }])
    setEmailAddresses([{ email: "", isPrimary: false }])
    setEditingId(null)
  }

  const handleEdit = (office: Office) => {
    const fullOffice = offices.find((o) => o.id === office.id)
    if (fullOffice) {
      setFormData({
        name: fullOffice.name,
        branchName: fullOffice.branchName || "",
        description: fullOffice.description || "",
        region: fullOffice.region,
        province: fullOffice.province,
        city: fullOffice.city,
        addressLine1: fullOffice.addressLine1,
        addressLine2: fullOffice.addressLine2 || "",
        barangay: fullOffice.barangay || "",
        zipCode: fullOffice.zipCode,
        country: fullOffice.country,
      })
      setPhoneNumbers(
        fullOffice.phoneNumbers && fullOffice.phoneNumbers.length > 0
          ? fullOffice.phoneNumbers
          : [{ countryCode: "+63", number: "", isPrimary: false }]
      )
      setEmailAddresses(
        fullOffice.emailAddresses && fullOffice.emailAddresses.length > 0
          ? fullOffice.emailAddresses
          : [{ email: "", isPrimary: false }]
      )
      setEditingId(fullOffice.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (office: Office) => {
    if (!confirm(`Are you sure you want to delete "${office.name}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(office.id)
      toast.success("Office deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete office")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const submitData = {
        ...formData,
        branchName: formData.branchName || null,
        description: formData.description || null,
        addressLine2: formData.addressLine2 || null,
        barangay: formData.barangay || null,
        phoneNumbers: phoneNumbers.filter((phone) => phone.number.trim() !== "").map((phone) => ({
          countryCode: phone.countryCode,
          number: phone.number,
          type: phone.type || null,
          isPrimary: phone.isPrimary,
        })),
        emailAddresses: emailAddresses.filter((email) => email.email.trim() !== "").map((email) => ({
          email: email.email,
          type: email.type || null,
          isPrimary: email.isPrimary,
        })),
      }

      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          data: submitData,
        })
        toast.success("Office updated successfully")
      } else {
        await createMutation.mutateAsync(submitData)
        toast.success("Office created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save office")
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    resetForm()
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{editingId ? 'Edit Office' : 'Create New Office'}</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Office</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
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
                  <Label htmlFor="branchName">Branch Name</Label>
                  <Input
                    id="branchName"
                    value={formData.branchName}
                    onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>

            {/* Address Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">
                    Region <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) => setFormData({ ...formData, region: value })}
                    required
                  >
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      {philippineRegions.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">
                    Province <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.province}
                    onValueChange={(value) => setFormData({ ...formData, province: value })}
                    required
                  >
                    <SelectTrigger id="province">
                      <SelectValue placeholder="Select Province" />
                    </SelectTrigger>
                    <SelectContent>
                      {philippineProvinces.map((province) => (
                        <SelectItem key={province.value} value={province.value}>
                          {province.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => setFormData({ ...formData, city: value })}
                    required
                  >
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {philippineCities.map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">
                    Address Line 1 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="addressLine1"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="barangay">Barangay</Label>
                  <Input
                    id="barangay"
                    value={formData.barangay}
                    onChange={(e) => setFormData({ ...formData, barangay: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">
                    Zip Code <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="Zip Code. e.g 1600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Phone Numbers Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Phone Numbers</h3>
              {phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm">{phone.countryCode === "+63" ? "🇵🇭" : "🌍"}</span>
                      <span className="text-sm">{phone.countryCode}</span>
                    </div>
                    <Input
                      value={phone.number}
                      onChange={(e) => handlePhoneNumberChange(index, 'number', e.target.value)}
                      className="pl-20"
                      placeholder="Phone Number"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddPhoneNumber}
                    className="h-9 w-9 text-green-600 hover:text-green-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  {phoneNumbers.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemovePhoneNumber(index)}
                      className="h-9 w-9 text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Email Addresses Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Email Addresses</h3>
              {emailAddresses.map((email, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="email"
                    value={email.email}
                    onChange={(e) => handleEmailChange(index, 'email', e.target.value)}
                    placeholder="Email Address"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddEmail}
                    className="h-9 w-9 text-green-600 hover:text-green-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  {emailAddresses.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveEmail(index)}
                      className="h-9 w-9 text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
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
          <CardTitle>Offices</CardTitle>
          <CardDescription>Manage office locations and branches</CardDescription>
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
          <CardTitle>Offices</CardTitle>
          <CardDescription>Manage office locations and branches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">
            Error loading offices: {error instanceof Error ? error.message : "Unknown error"}
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
            <CardTitle>Offices</CardTitle>
            <CardDescription>Manage office locations and branches</CardDescription>
          </div>
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={officeData}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(office) => {
            handleEdit(office)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  )
}
