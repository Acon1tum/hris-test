"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin, Clock, Briefcase, Users } from "lucide-react"
import Link from "next/link"
import { type JobPost } from "@/components/job-posts/columns"

// Sample published job posts - in production, this would come from an API
const publishedJobs: JobPost[] = [
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

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState("all")
  const [officeFilter, setOfficeFilter] = useState("all")

  // Filter only published jobs
  const filteredJobs = publishedJobs.filter((job) => {
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.position.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType =
      employmentTypeFilter === "all" || job.employmentType.toLowerCase() === employmentTypeFilter.toLowerCase()
    const matchesOffice =
      officeFilter === "all" || job.office.toLowerCase() === officeFilter.toLowerCase()
    return matchesSearch && matchesType && matchesOffice
  })

  const uniqueOffices = Array.from(new Set(publishedJobs.map((job) => job.office)))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Quanby HRIS</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/jobs">
              <Button>View Jobs</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 lg:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Career Opportunities</h1>
          <p className="text-muted-foreground text-lg">
            Explore exciting career opportunities and join our team
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title or position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={employmentTypeFilter} onValueChange={setEmploymentTypeFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Employment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              <Select value={officeFilter} onValueChange={setOfficeFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Office" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Offices</SelectItem>
                  {uniqueOffices.map((office) => (
                    <SelectItem key={office} value={office.toLowerCase()}>
                      {office}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No job openings found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div>
                        <Link href={`/jobs/${job.id}`}>
                          <h2 className="text-2xl font-semibold hover:text-primary transition-colors cursor-pointer">
                            {job.title}
                          </h2>
                        </Link>
                        <p className="text-muted-foreground mt-1">{job.position}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{job.office}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          <span>{job.employmentType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{job.vacancies} {job.vacancies === 1 ? "vacancy" : "vacancies"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Deadline: {job.applicationDeadline}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 md:items-end">
                      <Badge className="bg-emerald-600 w-fit">Published</Badge>
                      <Link href={`/jobs/${job.id}`}>
                        <Button>View Details</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Results Count */}
        {filteredJobs.length > 0 && (
          <div className="mt-6 text-sm text-muted-foreground text-center">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
          </div>
        )}
      </main>
    </div>
  )
}

