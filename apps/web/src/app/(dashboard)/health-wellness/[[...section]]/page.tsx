"use client"

import { SiteHeader } from "@/components/site-header"
import { IncidentTypesSection } from "../components/incident-types-section"
import { IncidentsSection } from "../components/incidents-section"
import { ActivitiesSection } from "../components/activities-section"

type SectionPageProps = {
  params: { section?: string[] }
}

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  "incident-types": IncidentTypesSection,
  incidents: IncidentsSection,
  activities: ActivitiesSection,
}

export default function HealthWellnessSectionPage({ params }: SectionPageProps) {
  const section = params.section?.[0] || null

  const Component = section ? SECTION_COMPONENTS[section] : ActivitiesSection

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


