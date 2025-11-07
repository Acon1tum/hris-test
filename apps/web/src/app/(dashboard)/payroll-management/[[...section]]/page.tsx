"use client"

import { SiteHeader } from "@/components/site-header"
import { RemunerationSection } from "../components/remuneration-section"
import { PayrollEntriesSection } from "../components/payroll-entries-section"
import { SalarySlipsSection } from "../components/salary-slips-section"
import { AdditionalSalariesSection } from "../components/additional-salaries-section"
import { BonusPaySection } from "../components/bonus-pay-section"
import { IncentivePaySection } from "../components/incentive-pay-section"
import { BackPaySection } from "../components/back-pay-section"
import { AdvanceLoanSection } from "../components/advance-loan-section"
import { PayrollManagementOverview } from "../components/overview-section"

type SectionPageProps = {
  params: { section?: string[] }
}

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  remuneration: RemunerationSection,
  "payroll-entries": PayrollEntriesSection,
  "salary-slips": SalarySlipsSection,
  "additional-salaries": AdditionalSalariesSection,
  "bonus-pay": BonusPaySection,
  "incentive-pay": IncentivePaySection,
  "back-pay": BackPaySection,
  "advance-loan": AdvanceLoanSection,
}

export default function PayrollManagementSectionPage({ params }: SectionPageProps) {
  const section = params.section?.[0] || null

  const Component = section ? SECTION_COMPONENTS[section] : PayrollManagementOverview

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

