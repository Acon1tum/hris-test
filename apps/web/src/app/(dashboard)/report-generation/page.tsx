import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MODULES } from "@hris/constants"

const moduleData = MODULES.REPORT_GENERATION

export default function ReportGenerationPage() {
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
              <p className="text-muted-foreground">Report generation module content coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

