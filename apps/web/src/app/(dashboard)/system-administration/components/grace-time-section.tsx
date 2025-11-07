"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/grace-time-organizations/data-table"
import { type GraceTimeOrganization } from "@/components/grace-time-organizations/columns"

// Sample organizations data
const organizations: GraceTimeOrganization[] = [
  { id: "1", name: "SPREP", slug: "sprep", createdAt: "July 24, 2025" },
  { id: "2", name: "Pacific Office", slug: "pacific-office", createdAt: "July 24, 2025" },
  { id: "3", name: "Regional Office", slug: "regional-office", createdAt: "July 24, 2025" },
]

export function GraceTimeSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    arrivalGraceEnabled: true,
    arrivalGraceTime: "10",
    departureGraceEnabled: true,
    departureGraceTime: "15",
    breakGraceEnabled: true,
    breakGraceTime: "5",
    earlyLeaveGraceEnabled: true,
    earlyLeaveGraceTime: "30",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Grace time config:", formData, "Organization:", selectedOrganization)
  }

  const handleSelectOrganization = (org: GraceTimeOrganization) => {
    setSelectedOrganization(org.id)
    // TODO: Load grace time config for selected organization
  }

  const handleBackToOrganizations = () => {
    setSelectedOrganization(null)
  }

  // Show organization selection table if no organization is selected
  if (!selectedOrganization) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Administration Grace time Config</CardTitle>
          <CardDescription>Select an organization to configure grace periods</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={organizations}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            onSelect={(org) => handleSelectOrganization(org)}
          />
        </CardContent>
      </Card>
    )
  }

  // Show grace time configuration form for selected organization
  const selectedOrg = organizations.find((org) => org.id === selectedOrganization)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Administration Grace time Config</CardTitle>
        <CardDescription>
          Configure grace periods for attendance - {selectedOrg?.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Arrival Grace */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="arrivalGraceEnabled">Arrival Grace Enabled</Label>
              <Switch
                id="arrivalGraceEnabled"
                checked={formData.arrivalGraceEnabled}
                onCheckedChange={(checked) => setFormData({ ...formData, arrivalGraceEnabled: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="arrivalGraceTime">Arrival Grace Time in minutes</Label>
              <Input
                id="arrivalGraceTime"
                type="number"
                value={formData.arrivalGraceTime}
                onChange={(e) => setFormData({ ...formData, arrivalGraceTime: e.target.value })}
                min="0"
                disabled={!formData.arrivalGraceEnabled}
              />
            </div>
          </div>

          {/* Departure Grace */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <Label htmlFor="departureGraceEnabled">Departure Grace Enabled</Label>
              <Switch
                id="departureGraceEnabled"
                checked={formData.departureGraceEnabled}
                onCheckedChange={(checked) => setFormData({ ...formData, departureGraceEnabled: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="departureGraceTime">Departure Grace Time in minutes</Label>
              <Input
                id="departureGraceTime"
                type="number"
                value={formData.departureGraceTime}
                onChange={(e) => setFormData({ ...formData, departureGraceTime: e.target.value })}
                min="0"
                disabled={!formData.departureGraceEnabled}
              />
            </div>
          </div>

          {/* Break Grace */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <Label htmlFor="breakGraceEnabled">Break Grace Enabled</Label>
              <Switch
                id="breakGraceEnabled"
                checked={formData.breakGraceEnabled}
                onCheckedChange={(checked) => setFormData({ ...formData, breakGraceEnabled: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="breakGraceTime">Break Grace Time in minutes</Label>
              <Input
                id="breakGraceTime"
                type="number"
                value={formData.breakGraceTime}
                onChange={(e) => setFormData({ ...formData, breakGraceTime: e.target.value })}
                min="0"
                disabled={!formData.breakGraceEnabled}
              />
            </div>
          </div>

          {/* Early Leave Grace */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <Label htmlFor="earlyLeaveGraceEnabled">Early Leave Grace Enabled</Label>
              <Switch
                id="earlyLeaveGraceEnabled"
                checked={formData.earlyLeaveGraceEnabled}
                onCheckedChange={(checked) => setFormData({ ...formData, earlyLeaveGraceEnabled: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="earlyLeaveGraceTime">Early Leave Grace Time in minutes</Label>
              <Input
                id="earlyLeaveGraceTime"
                type="number"
                value={formData.earlyLeaveGraceTime}
                onChange={(e) => setFormData({ ...formData, earlyLeaveGraceTime: e.target.value })}
                min="0"
                disabled={!formData.earlyLeaveGraceEnabled}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleBackToOrganizations}
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