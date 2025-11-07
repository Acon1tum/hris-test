"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ChevronRight, Plus, RefreshCw, Filter, LayoutGrid, CalendarRange } from "lucide-react"
import { DataTable } from "@/components/activities/data-table"
import { type Activity } from "@/components/activities/columns"

export function ActivitiesSection() {
  const [viewMode, setViewMode] = useState<"list" | "create">("list")
  const [search, setSearch] = useState("")

  if (viewMode === "create") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span>Health & Wellness</span>
          </div>
          <CardTitle>Add Health & Safety Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Row 1 */}
              <div className="space-y-2 md:col-span-1">
                <div className="text-sm font-medium">Activity Name <span className="text-destructive">*</span></div>
                <Input placeholder="Enter activity name" />
              </div>
              <div className="space-y-2 md:col-span-1">
                <div className="text-sm font-medium">Frequency <span className="text-destructive">*</span></div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-1">
                <div className="text-sm font-medium">Start Date <span className="text-destructive">*</span></div>
                <div className="relative">
                  <CalendarRange className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Select Date" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="space-y-2 md:col-span-1">
                <div className="text-sm font-medium">End Date</div>
                <div className="relative">
                  <CalendarRange className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Select Date" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-1">
                <div className="text-sm font-medium">Responsible Person <span className="text-destructive">*</span></div>
                <Input placeholder="Select..." />
              </div>
              <div className="space-y-2 md:col-span-1">
                <div className="text-sm font-medium">Status <span className="text-destructive">*</span></div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 3 */}
              <div className="space-y-2 md:col-span-1">
                <div className="text-sm font-medium">Region <span className="text-destructive">*</span></div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emea">EMEA</SelectItem>
                    <SelectItem value="apac">APAC</SelectItem>
                    <SelectItem value="amer">AMER</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="text-sm font-medium">Reminder Days Before</div>
                <Input placeholder="e.g. 7" />
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <Switch id="reminders" />
                  <label htmlFor="reminders" className="text-muted-foreground">Enable Reminders</label>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-3">
                <div className="text-sm font-medium">Description <span className="text-destructive">*</span></div>
                <textarea className="w-full rounded-md border bg-background p-2 text-sm" rows={6} placeholder="Describe the activity" />
              </div>

              {/* Departments / Designations */}
              <div className="space-y-2 md:col-span-1">
                <div className="text-sm font-medium">Departments</div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="ops">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="text-sm font-medium">Designations <span className="text-destructive">*</span></div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="officer">Officer</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Attachments */}
              <div className="space-y-2 md:col-span-3">
                <div className="text-sm font-medium">Attachments</div>
                <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                  Drag &apos;n&apos; Drop some files here, or click to select files
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setViewMode("list")}>Back</Button>
              <Button>Save</Button>
            </div>
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Health & Safety Activities</span>
            </div>
            <CardTitle>Health & Safety Activities</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Grid"><LayoutGrid className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Refresh"><RefreshCw className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Filters"><Filter className="h-4 w-4" /></Button>
            <Button onClick={() => setViewMode("create")}><Plus className="mr-2 h-4 w-4" />Create New</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={[]}
          search={search}
          onSearchChange={setSearch}
          onView={(activity) => {
            // TODO: Implement view
            console.log("View", activity)
          }}
          onEdit={(activity) => {
            // TODO: Implement edit
            console.log("Edit", activity)
          }}
          onDelete={(activity) => {
            // TODO: Implement delete
            console.log("Delete", activity)
          }}
        />
      </CardContent>
    </Card>
  )
}
