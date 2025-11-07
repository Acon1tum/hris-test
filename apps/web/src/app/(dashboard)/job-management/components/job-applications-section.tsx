"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRight, Filter, RefreshCw, Search } from "lucide-react"
import { DataTable } from "@/components/job-applications/data-table"
import { type Application } from "@/components/job-applications/columns"

const initialApplications: Application[] = Array.from({ length: 27 }).map((_, i) => {
  const names = [
    "Christopher Reed",
    "Sophia Isabelle Rodriguez",
    "Marcus Elijah Washington",
    "Natalie Grace Kim",
    "Eric Bennett",
    "Daniel Patrick O'Connor",
    "Jason Mitchell",
    "Rebecca Lynn Carter",
    "Anthony Scott",
    "Ethan Lucas Ramirez",
  ]
  const n = names[i % names.length]
  return {
    id: String(i + 1),
    name: n,
    jobTitle: [
      "Waste Management Project Coordinator",
      "Environmental Governance Advisor",
      "Marine Ecosystems Specialist",
    ][i % 3],
    position: "Operations Manager",
    email: `${n.split(" ")[0].toLowerCase()}.${n.split(" ")[1]?.toLowerCase() || "user"}@example.com`,
    phone: "+1 5555" + String(67890 + i),
    status: (i % 7 === 0 ? "Selected" : "Pending") as Application["status"],
    appliedAt: "July 29, 2025",
    jobPosting: {
      title: [
        "Waste Management Project Coordinator",
        "Environmental Governance Advisor",
        "Marine Ecosystems Specialist",
      ][i % 3],
      vacancy: (i % 2) + 1,
      jobType: "Operations manager",
    },
    gender: i % 2 === 0 ? "Male" : "Female",
    dateOfBirth: i % 2 === 0 ? "Apr 30, 1999" : "Aug 12, 1998",
    skills: ["Solid Waste Management", "Community Education"],
    academics: [
      {
        institute: "Boston University",
        degree: "MS in Sustainability",
        major: "Solid Waste Management",
        year: "2025",
        grade: "3.6",
      },
      {
        institute: "Arizona State University",
        degree: "BS in Environmental Studies",
        major: "Sustainable Waste Planning",
        year: "2023",
        grade: "3.5",
      },
    ],
    screening: {
      question:
        "Define Environmental Engineering and Waste Management Process.",
      answer:
        "Environmental engineering improves public health by minimizing pollution and promoting green infrastructure. Effective waste management supports sustainability by converting waste into resources like compost, energy, or new products.",
    },
  }
})

export function JobApplicationsSection() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [positionFilter, setPositionFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "detail">("list")
  const [selected, setSelected] = useState<Application | null>(null)


  if (viewMode === "detail" && selected) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Job Management</span>
                <ChevronRight className="h-4 w-4" />
                <span>Job Applications</span>
              </div>
              <CardTitle>{selected.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Set Interview (Third round- Interview)</Button>
              <Button variant="destructive">Reject</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Job Posting Details */}
            <div className="rounded-md border p-4">
              <div className="text-sm font-medium mb-4">Job Posting Details</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Job Title</div>
                  <div className="font-medium">{selected.jobPosting?.title}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Vacancy</div>
                  <div className="font-medium">{selected.jobPosting?.vacancy}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Job Type</div>
                  <div className="font-medium">{selected.jobPosting?.jobType}</div>
                </div>
              </div>
            </div>

            {/* Applicant Details */}
            <div className="rounded-md border p-4">
              <div className="text-sm font-medium mb-4">Applicant Details</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Name</div>
                  <div className="font-medium">{selected.name}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Gender</div>
                  <div className="font-medium">{selected.gender}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Phone</div>
                  <div className="font-medium">{selected.phone}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Email</div>
                  <div className="font-medium">{selected.email}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Date of Birth</div>
                  <div className="font-medium">{selected.dateOfBirth}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-muted-foreground text-sm">Skills</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selected.skills?.map((s, i) => (
                    <Badge key={i} variant="outline">{s}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Qualifications */}
            <div className="rounded-md border p-4">
              <div className="text-sm font-medium mb-4">Academic Qualifications</div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institute</TableHead>
                      <TableHead>Degree</TableHead>
                      <TableHead>Major</TableHead>
                      <TableHead>Passing Year</TableHead>
                      <TableHead>Result/Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selected.academics?.map((a, i) => (
                      <TableRow key={i}>
                        <TableCell>{a.institute}</TableCell>
                        <TableCell>{a.degree}</TableCell>
                        <TableCell>{a.major}</TableCell>
                        <TableCell>{a.year}</TableCell>
                        <TableCell>{a.grade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Screening Questions */}
            <div className="rounded-md border p-4">
              <div className="text-sm font-medium mb-4">Screening Questions</div>
              <div className="rounded-md border text-sm p-3 text-muted-foreground">
                <div className="mb-1">
                  <span className="font-medium">Question:</span> {selected.screening?.question}
                </div>
                <div>
                  <span className="font-medium">Answer:</span> {selected.screening?.answer}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Badge className={selected.status === "Selected" ? "bg-emerald-600" : "bg-amber-600"}>
                {selected.status}
              </Badge>
              <Button variant="outline" onClick={() => { setViewMode("list"); setSelected(null) }}>Back</Button>
              <Button onClick={() => setSelected({ ...selected, status: "Selected" })}>Shortlist</Button>
              <Button variant="destructive" onClick={() => setSelected({ ...selected, status: "Pending" })}>Reject</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Dashboard</span>
          <ChevronRight className="h-4 w-4" />
          <span>Job Management</span>
        </div>
        <CardTitle>Job Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="selected">Selected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Job Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by Job Position</SelectItem>
                <SelectItem value="waste management project coordinator">Waste Management Project Coordinator</SelectItem>
                <SelectItem value="environmental governance advisor">Environmental Governance Advisor</SelectItem>
                <SelectItem value="marine ecosystems specialist">Marine Ecosystems Specialist</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="More Filters">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <DataTable
            data={initialApplications}
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            positionFilter={positionFilter}
            onPositionFilterChange={setPositionFilter}
            onView={(application) => {
              setSelected(application)
              setViewMode("detail")
            }}
            onEdit={(application) => {
              // TODO: Implement edit
              console.log("Edit", application)
            }}
            onDelete={(application) => {
              // TODO: Implement delete
              console.log("Delete", application)
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}


