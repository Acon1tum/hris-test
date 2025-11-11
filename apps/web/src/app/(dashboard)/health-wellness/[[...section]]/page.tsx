"use client"

import { SiteHeader } from "@/components/site-header"
import { IncidentTypesSection } from "../components/incident-types-section"
import { IncidentsSection } from "../components/incidents-section"
import { ActivitiesSection } from "../components/activities-section"
import { MODULES } from "@hris/constants"
import { useAuthStore } from "@/stores/auth-store"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type SectionPageProps = {
  params: { section?: string[] }
}

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  "incident-types": IncidentTypesSection,
  incidents: IncidentsSection,
  activities: ActivitiesSection,
}

export default function HealthWellnessSectionPage({ params }: SectionPageProps) {
  const { hasModuleAccess, hasPermission } = useAuthStore()
  const moduleData = MODULES.HEALTH_WELLNESS
  const canAccess =
    hasModuleAccess(moduleData.slug) &&
    hasPermission(`${moduleData.slug.replace(/-/g, "_")}:read`)

  if (!canAccess) {
    return (
      <>
        <SiteHeader />
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Forbidden</CardTitle>
                <CardDescription>You do not have access to {moduleData.name}.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </>
    )
  }

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


