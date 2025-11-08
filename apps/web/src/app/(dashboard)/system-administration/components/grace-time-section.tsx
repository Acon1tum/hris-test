"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DataTable } from "@/components/grace-time-organizations/data-table"
import { type GraceTimeOrganization } from "@/components/grace-time-organizations/columns"
import { useGraceTimes, useGraceTimeByOrganization, useCreateGraceTime, useUpdateGraceTimeByOrganization } from "@/hooks/useGraceTimes"
import { useOrganizations } from "@/hooks/useOrganizations"
import { toast } from "sonner"

export function GraceTimeSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null)
  
  // Hooks
  const { data: organizations = [], isLoading: isLoadingOrgs } = useOrganizations()
  const { data: graceTime, isLoading: isLoadingGraceTime, error: graceTimeError } = useGraceTimeByOrganization(selectedOrganization || "")
  const createMutation = useCreateGraceTime()
  const updateMutation = useUpdateGraceTimeByOrganization()
  
  // Form state
  const [formData, setFormData] = useState({
    arrivalGraceEnabled: true,
    arrivalGraceTime: 10,
    departureGraceEnabled: true,
    departureGraceTime: 15,
    breakGraceEnabled: true,
    breakGraceTime: 5,
    earlyLeaveGraceEnabled: true,
    earlyLeaveGraceTime: 30,
  })

  // Load grace time data when organization is selected
  useEffect(() => {
    if (graceTime && selectedOrganization) {
      setFormData({
        arrivalGraceEnabled: graceTime.arrivalGraceEnabled,
        arrivalGraceTime: graceTime.arrivalGraceTime,
        departureGraceEnabled: graceTime.departureGraceEnabled,
        departureGraceTime: graceTime.departureGraceTime,
        breakGraceEnabled: graceTime.breakGraceEnabled,
        breakGraceTime: graceTime.breakGraceTime,
        earlyLeaveGraceEnabled: graceTime.earlyLeaveGraceEnabled,
        earlyLeaveGraceTime: graceTime.earlyLeaveGraceTime,
      })
    } else if (!graceTime && selectedOrganization) {
      // Reset to defaults if no grace time exists
      setFormData({
        arrivalGraceEnabled: true,
        arrivalGraceTime: 10,
        departureGraceEnabled: true,
        departureGraceTime: 15,
        breakGraceEnabled: true,
        breakGraceTime: 5,
        earlyLeaveGraceEnabled: true,
        earlyLeaveGraceTime: 30,
      })
    }
  }, [graceTime, selectedOrganization])

  // Convert organizations to match the GraceTimeOrganization type from columns
  const organizationData: GraceTimeOrganization[] = organizations.map((org) => ({
    id: org.id,
    name: org.name,
    slug: org.slug,
    createdAt: new Date(org.createdAt).toLocaleDateString(),
  }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedOrganization) {
      toast.error("Please select an organization")
      return
    }

    try {
      if (graceTime) {
        // Update existing grace time
        await updateMutation.mutateAsync({
          organizationId: selectedOrganization,
          data: {
            arrivalGraceEnabled: formData.arrivalGraceEnabled,
            arrivalGraceTime: formData.arrivalGraceTime,
            departureGraceEnabled: formData.departureGraceEnabled,
            departureGraceTime: formData.departureGraceTime,
            breakGraceEnabled: formData.breakGraceEnabled,
            breakGraceTime: formData.breakGraceTime,
            earlyLeaveGraceEnabled: formData.earlyLeaveGraceEnabled,
            earlyLeaveGraceTime: formData.earlyLeaveGraceTime,
          },
        })
        toast.success("Grace time configuration updated successfully")
      } else {
        // Create new grace time
        await createMutation.mutateAsync({
          organizationId: selectedOrganization,
          arrivalGraceEnabled: formData.arrivalGraceEnabled,
          arrivalGraceTime: formData.arrivalGraceTime,
          departureGraceEnabled: formData.departureGraceEnabled,
          departureGraceTime: formData.departureGraceTime,
          breakGraceEnabled: formData.breakGraceEnabled,
          breakGraceTime: formData.breakGraceTime,
          earlyLeaveGraceEnabled: formData.earlyLeaveGraceEnabled,
          earlyLeaveGraceTime: formData.earlyLeaveGraceTime,
        })
        toast.success("Grace time configuration created successfully")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save grace time configuration")
    }
  }

  const handleSelectOrganization = (org: GraceTimeOrganization) => {
    setSelectedOrganization(org.id)
  }

  const handleBackToOrganizations = () => {
    setSelectedOrganization(null)
    setFormData({
      arrivalGraceEnabled: true,
      arrivalGraceTime: 10,
      departureGraceEnabled: true,
      departureGraceTime: 15,
      breakGraceEnabled: true,
      breakGraceTime: 5,
      earlyLeaveGraceEnabled: true,
      earlyLeaveGraceTime: 30,
    })
  }

  // Show organization selection table if no organization is selected
  if (!selectedOrganization) {
    if (isLoadingOrgs) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Administration Grace time Config</CardTitle>
            <CardDescription>Select an organization to configure grace periods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Administration Grace time Config</CardTitle>
          <CardDescription>Select an organization to configure grace periods</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={organizationData}
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

  if (isLoadingGraceTime) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Administration Grace time Config</CardTitle>
          <CardDescription>
            Configure grace periods for attendance - {selectedOrg?.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

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
                onChange={(e) => setFormData({ ...formData, arrivalGraceTime: parseInt(e.target.value) || 0 })}
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
                onChange={(e) => setFormData({ ...formData, departureGraceTime: parseInt(e.target.value) || 0 })}
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
                onChange={(e) => setFormData({ ...formData, breakGraceTime: parseInt(e.target.value) || 0 })}
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
                onChange={(e) => setFormData({ ...formData, earlyLeaveGraceTime: parseInt(e.target.value) || 0 })}
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
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
