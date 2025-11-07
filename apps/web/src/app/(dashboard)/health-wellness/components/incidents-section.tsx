"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRight, Plus, RefreshCw, Filter, CalendarRange } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { DataTable } from "@/components/incidents/data-table"
import { type Incident } from "@/components/incidents/columns"

const incidents: Incident[] = [
  {
    id: "1",
    title: "Chemical Spill in Laboratory",
    description: "Spillage of cleaning solvent in lab room",
    personInvolved: "Jordan Gerrard",
    reportsTo: "Samantha Strauss",
    type: "Chemical Spill or Hazardous Material Exposure",
    status: "New",
    date: "September 21, 2025",
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
  {
    id: "2",
    title: "Small Fire in Electrical Room",
    description: "A short circuit caused a small fire",
    personInvolved: "Nova Hamilton",
    reportsTo: "Susan Austin Howard",
    type: "Fire or Explosion",
    status: "New",
    date: "September 23, 2025",
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
  {
    id: "3",
    title: "Employee Slipped in Warehouse",
    description: "An employee slipped on a wet floor",
    personInvolved: "Dan Morris",
    reportsTo: "Jaehee Kim",
    type: "Slip, Trip, and Fall",
    status: "New",
    date: "September 22, 2025",
    createdAt: "September 24, 2025",
    updatedAt: "about 1 month ago",
  },
]

export function IncidentsSection() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "create" | "view">("list")
  const [selected, setSelected] = useState<Incident | null>(null)
  const [isInvestigationOpen, setIsInvestigationOpen] = useState(false)
  const [investigationTitle, setInvestigationTitle] = useState("")
  const [investigationDetails, setInvestigationDetails] = useState("")


  if (viewMode === "view" && selected) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span>Health & Safety Incident</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{selected.title}</span>
          </div>
          <CardTitle>{selected.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Details */}
            <div className="rounded-lg border p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-4">
                  <div>
                    <div className="text-muted-foreground">Title</div>
                    <div className="font-medium">{selected.title}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Description</div>
                    <div className="max-w-prose leading-relaxed">
                      {selected.description}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Created At</div>
                    <div>{selected.createdAt}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-muted-foreground">Reports To</div>
                    <div>{selected.reportsTo}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Action Taken</div>
                    <div className="text-muted-foreground">—</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Status</div>
                    <Badge className="bg-slate-600">{selected.status}</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-muted-foreground">Involved Persons</div>
                    <div className="inline-flex items-center gap-2">
                      <Badge variant="secondary">{selected.personInvolved}</Badge>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">+3 More</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Incident Date</div>
                    <div>{selected.date}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="rounded-lg border p-4">
              <div className="text-sm grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-muted-foreground">Address</div>
                    <div>78 Research Park</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Country</div>
                    <div>Germany</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-muted-foreground">City</div>
                    <div>Munich</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Zip Code</div>
                    <div>80331</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-muted-foreground">State</div>
                    <div>Bavaria</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Investigation & Corrective Actions */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Investigation & Corrective Actions</div>
                <Button variant="outline" size="sm" onClick={() => setIsInvestigationOpen(true)}>Add Note</Button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setViewMode("list")}>Back</Button>
            </div>
          </div>
        </CardContent>
        {/* Slide-over for Investigation & Corrective Actions */}
        <Sheet open={isInvestigationOpen} onOpenChange={setIsInvestigationOpen}>
          <SheetContent side="right" className="w-full sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Investigation and Corrective Actions</SheetTitle>
              <SheetDescription>
                Attach investigation files, evidence, and record details of corrective or preventive actions taken.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <div>
                <div className="text-sm font-medium mb-2">Investigation & Corrective Action Files</div>
                <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                  Drag &apos;n&apos; Drop some files here, or click to select files
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Actions Title</div>
                <Input
                  placeholder="Enter a title for the corrective actions taken"
                  value={investigationTitle}
                  onChange={(e) => setInvestigationTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Actions Details</div>
                <Textarea
                  rows={6}
                  placeholder="Details of actions taken"
                  value={investigationDetails}
                  onChange={(e) => setInvestigationDetails(e.target.value)}
                />
              </div>
            </div>

            <SheetFooter className="mt-6">
              <div className="flex w-full justify-end gap-2">
                <Button variant="outline" onClick={() => setIsInvestigationOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsInvestigationOpen(false)}>Save</Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Card>
    )
  }

  if (viewMode === "create") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span>Health & Safety Incident</span>
          </div>
          <CardTitle>Add a Health and Safety Incident</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Top grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-2">
                <div className="text-sm font-medium">Incident Title <span className="text-destructive">*</span></div>
                <Input placeholder="Title" />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Incident Date <span className="text-destructive">*</span></div>
                <div className="relative">
                  <CalendarRange className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Select Date" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Persons Involved <span className="text-destructive">*</span></div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Jordan Gerrard</SelectItem>
                    <SelectItem value="2">Nova Hamilton</SelectItem>
                    <SelectItem value="3">Dan Morris</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Incident Type <span className="text-destructive">*</span></div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spill">Chemical Spill</SelectItem>
                    <SelectItem value="fire">Fire or Explosion</SelectItem>
                    <SelectItem value="fall">Slip, Trip, and Fall</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Reported To</div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Samantha Strauss</SelectItem>
                    <SelectItem value="2">Susan Austin Howard</SelectItem>
                    <SelectItem value="3">Jaehee Kim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Description <span className="text-destructive">*</span></div>
              <textarea className="w-full rounded-md border bg-background p-2 text-sm" rows={6} placeholder="Describe the incident" />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Immediate Actions Taken</div>
              <textarea className="w-full rounded-md border bg-background p-2 text-sm" rows={4} placeholder="List any immediate actions taken" />
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Country <span className="text-destructive">*</span></div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select Country" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ph">Philippines</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">State <span className="text-destructive">*</span></div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">State 1</SelectItem>
                    <SelectItem value="2">State 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">City <span className="text-destructive">*</span></div>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select City" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">City 1</SelectItem>
                    <SelectItem value="2">City 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-3">
                <div className="text-sm font-medium">Address 1 <span className="text-destructive">*</span></div>
                <Input placeholder="Address 1" />
              </div>
              <div className="space-y-2 md:col-span-3">
                <div className="text-sm font-medium">Address 2</div>
                <Input placeholder="Address 2" />
              </div>
              <div className="space-y-2 md:col-span-3">
                <div className="text-sm font-medium">Zip Code <span className="text-destructive">*</span></div>
                <Input placeholder="Zip Code, e.g. 123456" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Attachments</div>
              <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                Drag &apos;n&apos; Drop some files here, or click to select files
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
              <span>Health & Safety Incident</span>
            </div>
            <CardTitle>Health and Safety Incidents</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <CalendarRange className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8 w-[200px]"
                type="text"
                placeholder="Select Date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" aria-label="Refresh"><RefreshCw className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Filters"><Filter className="h-4 w-4" /></Button>
            <Button onClick={() => setViewMode("create")}><Plus className="mr-2 h-4 w-4" />Create New</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={incidents}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          onView={(incident) => {
            setSelected(incident)
            setViewMode("view")
          }}
          onEdit={(incident) => {
            // TODO: Implement edit
            console.log("Edit", incident)
          }}
          onInvestigation={(incident) => {
            setSelected(incident)
            setIsInvestigationOpen(true)
          }}
          onDelete={(incident) => {
            // TODO: Implement delete
            console.log("Delete", incident)
          }}
        />
      </CardContent>
      {/* Slide-over for Investigation & Corrective Actions */}
      <Sheet open={isInvestigationOpen} onOpenChange={setIsInvestigationOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Investigation and Corrective Actions</SheetTitle>
            <SheetDescription>
              Attach investigation files, evidence, and record details of corrective or preventive actions taken.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <div>
              <div className="text-sm font-medium mb-2">Investigation & Corrective Action Files</div>
              <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                Drag &apos;n&apos; Drop some files here, or click to select files
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Actions Title</div>
              <Input
                placeholder="Enter a title for the corrective actions taken"
                value={investigationTitle}
                onChange={(e) => setInvestigationTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Actions Details</div>
              <Textarea
                rows={6}
                placeholder="Details of actions taken"
                value={investigationDetails}
                onChange={(e) => setInvestigationDetails(e.target.value)}
              />
            </div>
          </div>

          <SheetFooter className="mt-6">
            <div className="flex w-full justify-end gap-2">
              <Button variant="outline" onClick={() => setIsInvestigationOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsInvestigationOpen(false)}>Save</Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Card>
  )
}


