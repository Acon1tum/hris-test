"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Briefcase, Users, ArrowLeft } from "lucide-react"
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

type JobDetailPageProps = {
  params: { id: string }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = params
  const job = publishedJobs.find((j) => j.id === id)

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
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
        <main className="container mx-auto px-4 py-8 lg:px-6">
          <Card>
            <CardContent className="py-12 text-center">
              <h1 className="text-2xl font-bold mb-2">Job Not Found</h1>
              <p className="text-muted-foreground mb-4">The job posting you're looking for doesn't exist.</p>
              <Link href="/jobs">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

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
        <Link href="/jobs">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
                    <p className="text-lg text-muted-foreground">{job.position}</p>
                  </div>
                  <Badge className="bg-emerald-600">Published</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Job Details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Office</div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{job.office}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Employment Type</div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-medium">{job.employmentType}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Vacancies</div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">{job.vacancies} {job.vacancies === 1 ? "vacancy" : "vacancies"}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Application Deadline</div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{job.applicationDeadline}</span>
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="pt-4 border-t">
                  <h3 className="text-xl font-semibold mb-4">Job Description</h3>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p>
                      We are seeking a highly motivated and experienced professional to join our team. 
                      This role offers an excellent opportunity to contribute to our organization's mission 
                      and work with a diverse team of professionals.
                    </p>
                    <p className="mt-4">
                      The ideal candidate will have strong communication skills, relevant experience in the field, 
                      and a passion for making a difference. You will be responsible for key initiatives and 
                      collaborate with various stakeholders.
                    </p>
                  </div>
                </div>

                {/* Requirements */}
                <div className="pt-4 border-t">
                  <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Bachelor's degree in a related field</li>
                    <li>Minimum 3-5 years of relevant experience</li>
                    <li>Strong communication and interpersonal skills</li>
                    <li>Ability to work independently and as part of a team</li>
                    <li>Proficiency in relevant software and tools</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Interested in this position? Click below to apply or login to your account.
                </p>
                <Link href="/login" className="block">
                  <Button className="w-full">Apply Now</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full">Login to Apply</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Published</div>
                  <div className="font-medium">{job.publishedAt}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Application Deadline</div>
                  <div className="font-medium">{job.applicationDeadline}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Employment Type</div>
                  <div className="font-medium">{job.employmentType}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Office</div>
                  <div className="font-medium">{job.office}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

