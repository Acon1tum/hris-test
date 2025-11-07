"use client"

import { SiteHeader } from "@/components/site-header"
import { JobPostsSection } from "../components/job-posts-section"
import { JobApplicationsSection } from "../components/job-applications-section"
import { AllVacanciesSection } from "../components/all-vacancies-section"
import { LatestVacanciesSection } from "../components/latest-vacancies-section"

type SectionPageProps = {
  params: { section?: string[] }
}

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  "job-posts": JobPostsSection,
  "job-applications": JobApplicationsSection,
  "all-vacancies": AllVacanciesSection,
  "latest-vacancies": LatestVacanciesSection,
}

export default function JobManagementSectionPage({ params }: SectionPageProps) {
  const section = params.section?.[0] || null

  const Component = section ? SECTION_COMPONENTS[section] : LatestVacanciesSection

  if (!Component) {
    return (
      <>
        <SiteHeader />
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-2">Section Not Found</h1>
              <p className="text-muted-foreground">The requested section does not exist.</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <Component />
        </div>
      </div>
    </>
  )
}


