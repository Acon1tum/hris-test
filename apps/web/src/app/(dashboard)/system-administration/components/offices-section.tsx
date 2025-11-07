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
import { Plus, ArrowLeft, X } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/offices/data-table"
import { type Office } from "@/components/offices/columns"

const offices: Office[] = [
  { id: "1", name: "SPREP", location: "Apia, Samoa", createdAt: "July 24, 2025" },
  { id: "2", name: "Pacific Office", location: "Suva, Fiji", createdAt: "July 24, 2025" },
  { id: "3", name: "Regional Office", location: "Nouméa, New Caledonia", createdAt: "July 24, 2025" },
]

export function OfficesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([""])
  const [emailAddresses, setEmailAddresses] = useState<string[]>([""])
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    branchName: "",
    description: "",
    country: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    zipCode: "",
  })

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""])
  }

  const handleRemovePhoneNumber = (index: number) => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index))
    }
  }

  const handleAddEmail = () => {
    setEmailAddresses([...emailAddresses, ""])
  }

  const handleRemoveEmail = (index: number) => {
    if (emailAddresses.length > 1) {
      setEmailAddresses(emailAddresses.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData, phoneNumbers, emailAddresses)
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Create New Office</CardTitle>
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
                  <Label htmlFor="country">
                    Country <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                    required
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="samoa">Samoa</SelectItem>
                      <SelectItem value="fiji">Fiji</SelectItem>
                      <SelectItem value="new-caledonia">New Caledonia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">
                    State <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData({ ...formData, state: value })}
                    required
                  >
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="state1">State 1</SelectItem>
                      <SelectItem value="state2">State 2</SelectItem>
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
                      <SelectItem value="city1">City 1</SelectItem>
                      <SelectItem value="city2">City 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address1">
                    Address 1 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address1"
                    value={formData.address1}
                    onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address2">Address 2</Label>
                  <Input
                    id="address2"
                    value={formData.address2}
                    onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">
                  Zip Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="Zip Code. e.g 123456"
                  required
                />
              </div>
            </div>

            {/* Phone Numbers Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Phone Numbers</h3>
              {phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm">🇺🇸</span>
                      <span className="text-sm">+1</span>
                    </div>
                    <Input
                      value={phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newPhones = [...phoneNumbers]
                        newPhones[index] = e.target.value
                        setPhoneNumbers(newPhones)
                      }}
                      className="pl-16"
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
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newEmails = [...emailAddresses]
                      newEmails[index] = e.target.value
                      setEmailAddresses(newEmails)
                    }}
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
            <CardTitle>Offices</CardTitle>
            <CardDescription>Manage office locations and branches</CardDescription>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={offices}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(office) => {
            // TODO: Implement view
            console.log("View", office)
          }}
          onEdit={(office) => {
            // TODO: Implement edit
            console.log("Edit", office)
          }}
          onDelete={(office) => {
            // TODO: Implement delete
            console.log("Delete", office)
          }}
        />
      </CardContent>
    </Card>
  )
} 