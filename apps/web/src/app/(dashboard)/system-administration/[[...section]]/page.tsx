"use client"

import { SiteHeader } from "@/components/site-header"
import { DepartmentsSection } from "../components/departments-section"
import { OfficesSection } from "../components/offices-section"
import { DesignationsSection } from "../components/designations-section"
import { OrganizationSection } from "../components/organization-section"
import { HolidaysSection } from "../components/holidays-section"
import { EmploymentTypesSection } from "../components/employment-types-section"
import { EmployeeGradesSection } from "../components/grades-section"
import { LeaveTypesSection } from "../components/leave-types-section"
import { LeavePoliciesSection } from "../components/leave-policies-section"
import { ShiftsSection } from "../components/shifts-section"
import { GraceTimeSection } from "../components/grace-time-section"
import { OvertimeSection } from "../components/overtime-section"
import { ExpenseAccountsSection } from "../components/expense-accounts-section"
import { EmployerTaxableComponentsSection } from "../components/employer-taxable-components-section"
import { PayrollConfigSection } from "../components/payroll-config-section"
import { SystemAdministrationOverview } from "../components/overview-section"
import { MODULES } from "@hris/constants"
import { useAuthStore } from "@/stores/auth-store"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type SectionPageProps = {
  params: { section?: string[] }
}

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  offices: OfficesSection,
  departments: DepartmentsSection,
  designations: DesignationsSection,
  organization: OrganizationSection,
  holidays: HolidaysSection,
  "employment-types": EmploymentTypesSection,
  grades: EmployeeGradesSection,
  "leave-types": LeaveTypesSection,
  "leave-policies": LeavePoliciesSection,
  shifts: ShiftsSection,
  "grace-time": GraceTimeSection,
  overtime: OvertimeSection,
  "expense-accounts": ExpenseAccountsSection,
  "employer-taxable-components": EmployerTaxableComponentsSection,
  "payroll-config": PayrollConfigSection,
}

export default function SystemAdministrationSectionPage({ params }: SectionPageProps) {
  const { hasModuleAccess, hasPermission } = useAuthStore()
  const moduleData = MODULES.SYSTEM_ADMINISTRATION
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

  const Component = section ? SECTION_COMPONENTS[section] : SystemAdministrationOverview

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