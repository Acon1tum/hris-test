 "use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MODULES } from "@hris/constants"
import { useAuthStore } from "@/stores/auth-store"

const moduleData = MODULES.PERFORMANCE_MANAGEMENT

export default function PerformanceManagementPage() {
  const { hasModuleAccess, hasPermission } = useAuthStore()
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

  return (
    <>
      <SiteHeader />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>{moduleData.name}</CardTitle>
              <CardDescription>{moduleData.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Performance management module content coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

