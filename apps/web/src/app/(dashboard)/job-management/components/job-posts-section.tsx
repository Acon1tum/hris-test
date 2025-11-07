"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronRight,
  Plus,
  Search,
  RefreshCw,
  Filter,
} from "lucide-react"
import { DataTable } from "@/components/job-posts/data-table"
import { type JobPost } from "@/components/job-posts/columns"

const initialPosts: JobPost[] = [
  {
    id: "1",
    title: "Communications and Outreach Officer",
    position: "HR Manager",
    vacancies: 1,
    employmentType: "Full-time",
    status: "Published",
    applicationDeadline: "August 13, 2025",
    office: "SPREP",
    publishedAt: "July 29, 2025",
  },
  {
    id: "2",
    title: "Waste Management Project Coordinator",
    position: "Operations Manager",
    vacancies: 1,
    employmentType: "Full-time",
    status: "Published",
    applicationDeadline: "August 13, 2025",
    office: "SPREP",
    publishedAt: "July 29, 2025",
  },
  {
    id: "3",
    title: "Environmental Governance Advisor",
    position: "Operations Manager",
    vacancies: 2,
    employmentType: "Full-time",
    status: "Published",
    applicationDeadline: "August 13, 2025",
    office: "SPREP",
    publishedAt: "July 29, 2025",
  },
  {
    id: "4",
    title: "Marine Ecosystems Specialist",
    position: "Operations Manager",
    vacancies: 1,
    employmentType: "Full-time",
    status: "Published",
    applicationDeadline: "August 13, 2025",
    office: "SPREP",
    publishedAt: "July 29, 2025",
  },
  {
    id: "5",
    title: "Climate Change Adaptation Officer",
    position: "Operations Manager",
    vacancies: 2,
    employmentType: "Full-time",
    status: "Published",
    applicationDeadline: "August 13, 2025",
    office: "SPREP",
    publishedAt: "July 29, 2025",
  },
]

export function JobPostsSection() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "create">("list")

  const [formData, setFormData] = useState({
    title: "",
    position: "",
    vacancies: "",
    employmentType: "",
    status: "draft",
    applicationDeadline: "",
    office: "",
    tentativeJoiningDate: "",
    salaryFrom: "",
    salaryTo: "",
    payrollBasis: "monthly",
    description: "",
  })

  const [screeningQuestions, setScreeningQuestions] = useState<string[]>([])
  const [jobRounds, setJobRounds] = useState<{ roundName: string; interviewers: string }[]>([])


  if (viewMode === "create") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Job Posts</span>
              </div>
              <CardTitle>Add a Job Post</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" placeholder="Job title" value={formData.title} onChange={(e)=>setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vacancies">Vacancies</Label>
                <Input id="vacancies" type="number" placeholder="Number of Vacancies" value={formData.vacancies} onChange={(e)=>setFormData({ ...formData, vacancies: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>Position</Label>
                <Select value={formData.position} onValueChange={(v)=>setFormData({ ...formData, position: v })}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hr-manager">HR Manager</SelectItem>
                    <SelectItem value="operations-manager">Operations Manager</SelectItem>
                    <SelectItem value="advisor">Advisor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Employment Type *</Label>
                <Select value={formData.employmentType} onValueChange={(v)=>setFormData({ ...formData, employmentType: v })}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v)=>setFormData({ ...formData, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Office *</Label>
                <Select value={formData.office} onValueChange={(v)=>setFormData({ ...formData, office: v })}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sprep">SPREP</SelectItem>
                    <SelectItem value="hq">Head Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Application Deadline</Label>
                <Input type="date" value={formData.applicationDeadline} onChange={(e)=>setFormData({ ...formData, applicationDeadline: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tentative Joining Date</Label>
                <Input type="date" value={formData.tentativeJoiningDate} onChange={(e)=>setFormData({ ...formData, tentativeJoiningDate: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>Salary Range From</Label>
                <Input type="number" placeholder="Salary Range From" value={formData.salaryFrom} onChange={(e)=>setFormData({ ...formData, salaryFrom: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Salary Range To</Label>
                <Input type="number" placeholder="Salary Range To" value={formData.salaryTo} onChange={(e)=>setFormData({ ...formData, salaryTo: e.target.value })} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Payroll Basis *</Label>
                <Select value={formData.payrollBasis} onValueChange={(v)=>setFormData({ ...formData, payrollBasis: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Write the job description..." value={formData.description} onChange={(e)=>setFormData({ ...formData, description: e.target.value })} className="min-h-[140px]" />
            </div>

            <div className="space-y-3">
              <CardTitle className="text-lg">Screening Questions</CardTitle>
              <Button variant="outline" size="sm" onClick={()=>setScreeningQuestions([...screeningQuestions, ""]) }>
                <Plus className="mr-2 h-4 w-4" /> Add a Question
              </Button>
              <div className="space-y-2">
                {screeningQuestions.map((q, idx)=> (
                  <Input key={idx} placeholder={`Question #${idx+1}`} value={q} onChange={(e)=>{
                    const next=[...screeningQuestions]; next[idx]=e.target.value; setScreeningQuestions(next);
                  }} />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <CardTitle className="text-lg">Job Rounds</CardTitle>
              <Button variant="outline" size="sm" onClick={()=>setJobRounds([...jobRounds, { roundName: "", interviewers: "" }])}>
                <Plus className="mr-2 h-4 w-4" /> Add Round
              </Button>
              <div className="space-y-2">
                {jobRounds.map((r, idx)=> (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2" key={idx}>
                    <Input placeholder="Round Name *" value={r.roundName} onChange={(e)=>{
                      const next=[...jobRounds]; next[idx].roundName=e.target.value; setJobRounds(next);
                    }} />
                    <Input placeholder="Interviewers *" value={r.interviewers} onChange={(e)=>{
                      const next=[...jobRounds]; next[idx].interviewers=e.target.value; setJobRounds(next);
                    }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={()=>setViewMode("list")}>Back</Button>
              <Button type="button">Submit</Button>
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
              <span>Job Management</span>
            </div>
            <CardTitle>Job Posts</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Employment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by Employment Type</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="More Filters">
              <Filter className="h-4 w-4" />
            </Button>
            <Button onClick={() => setViewMode("create")}>
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={initialPosts}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          employmentTypeFilter={typeFilter}
          onEmploymentTypeFilterChange={setTypeFilter}
          onView={(post) => {
            // TODO: Implement view
            console.log("View", post)
          }}
          onEdit={(post) => {
            // TODO: Implement edit
            console.log("Edit", post)
          }}
          onDelete={(post) => {
            // TODO: Implement delete
            console.log("Delete", post)
          }}
        />
      </CardContent>
    </Card>
  )
}


