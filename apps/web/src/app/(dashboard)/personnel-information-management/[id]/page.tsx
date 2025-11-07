"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  SalaryTab,
  AttendanceTab,
  LeavesTab,
  ExpenseClaimsTab,
  ShiftAssignedTab,
  AssignedAssetsTab,
  TrainingTab,
  TravelRequestsTab,
  InductionPlanTab,
  IncidentsTab,
  ActivitiesTab,
  ResignationsTab,
  AuditTrailsTab,
} from "./employee-tabs"

// Sample employee data
const employeeData = {
  id: "1",
  name: "Lauren Marsh",
  employeeId: "EMP-00001",
  designation: "Admin",
  status: "Active",
  avatar: "/avatars/lauren.jpg",
  offerInfo: {
    leavePolicy: "",
    salaryStructure: "",
    assistant: "",
  },
  personalInfo: {
    firstName: "Lauren",
    lastName: "Marsh",
    dateOfBirth: "Sep 27, 1996",
    gender: "Prefer Not to Say",
    bloodGroup: "",
    maritalStatus: "Single",
    department: "Admin",
    religion: "",
    office: "",
  },
  contactInfo: {
    companyEmail: "",
    companyPhone: "+1 897 654 6789",
    personalPhone: "",
    personalEmail: "",
  },
  addressInfo: {
    type: "",
    addressLine1: "",
    city: "",
    zip: "",
    addressLine2: "",
    state: "",
    country: "",
  },
  officialDocuments: {
    passportNumber: "",
    ssn: "",
    tin: "",
    drivingLicense: "",
  },
  employmentDetails: {
    employeeStatus: "Active",
    reportTo: "",
    contractEndDate: "May 31, 2022",
    dateOfJoining: "Jun 18, 2022",
    salaryMode: "",
    noticePeriod: "",
    overtimePolicy: "",
    retirementDate: "",
    costToCompany: "",
    payrollCostCenter: "",
  },
  bankInfo: {
    routingNumber: "",
    accountNumber: "",
    accountType: "",
  },
  competencies: {
    skillsAndCompetencies: "",
  },
  exitInfo: {
    dateOfLeaving: "",
    resignationLetterDate: "",
    exitInterviewDate: "",
    newWorkplace: "",
    reasonForLeaving: "",
    relievingDate: "",
    feedback: "",
  },
  emergencyContact: {
    name: "",
    relation: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    bloodGroup: "",
  },
  education: [],
  workExperience: [],
  previousWorkExperience: [],
}

export default function EmployeeProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(employeeData)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const renderField = (label: string, value: string, key: string, section: string) => {
    if (isEditing) {
      return (
        <div className="space-y-2">
          <Label htmlFor={`${section}-${key}`}>{label}</Label>
          <Input
            id={`${section}-${key}`}
            value={value}
            onChange={(e) => {
              // Handle form updates
              setFormData((prev: any) => ({
                ...prev,
                [section]: {
                  ...prev[section],
                  [key]: e.target.value,
                },
              }))
            }}
            placeholder={label}
          />
        </div>
      )
    }
    return (
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">{label}</Label>
        <div className="text-sm font-medium">{value || "—"}</div>
      </div>
    )
  }

  return (
    <>
      <SiteHeader />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          {/* Breadcrumb and Edit Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Dashboard</span>
              <span>&gt;</span>
              <span>Employees</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => router.push("/personnel-information-management")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => setIsEditing(!isEditing)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>

          {/* Employee Header */}
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={formData.avatar} alt={formData.name} />
              <AvatarFallback>{getInitials(formData.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{formData.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{formData.designation}</Badge>
                <Badge variant="default">{formData.status}</Badge>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <div className="overflow-x-auto mb-6">
              <TabsList className="inline-flex w-auto min-w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="salary">Salary</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="leaves">Leaves</TabsTrigger>
                <TabsTrigger value="expense-claims">Expense Claims</TabsTrigger>
                <TabsTrigger value="shift-assigned">Shift Assigned</TabsTrigger>
                <TabsTrigger value="assigned-assets">Assigned Assets</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="travel-requests">Travel Requests</TabsTrigger>
                <TabsTrigger value="induction-plan">Induction Plan</TabsTrigger>
                <TabsTrigger value="incidents">Incidents</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="resignations">Resignations</TabsTrigger>
                <TabsTrigger value="audit-trails">Audit Trails</TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Offer Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renderField("Leave Policy", formData.offerInfo.leavePolicy, "leavePolicy", "offerInfo")}
                    {renderField("Salary Structure", formData.offerInfo.salaryStructure, "salaryStructure", "offerInfo")}
                    {renderField("Assistant", formData.offerInfo.assistant, "assistant", "offerInfo")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renderField("First Name", formData.personalInfo.firstName, "firstName", "personalInfo")}
                    {renderField("Last Name", formData.personalInfo.lastName, "lastName", "personalInfo")}
                    {renderField("Date of Birth", formData.personalInfo.dateOfBirth, "dateOfBirth", "personalInfo")}
                    {renderField("Gender", formData.personalInfo.gender, "gender", "personalInfo")}
                    {renderField("Blood Group", formData.personalInfo.bloodGroup, "bloodGroup", "personalInfo")}
                    {renderField("Marital Status", formData.personalInfo.maritalStatus, "maritalStatus", "personalInfo")}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Department</Label>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{formData.personalInfo.department || "—"}</div>
                        {isEditing && (
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    {renderField("Religion", formData.personalInfo.religion, "religion", "personalInfo")}
                    {renderField("Office", formData.personalInfo.office, "office", "personalInfo")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderField("Company Email", formData.contactInfo.companyEmail, "companyEmail", "contactInfo")}
                    {renderField("Company Phone", formData.contactInfo.companyPhone, "companyPhone", "contactInfo")}
                    {renderField("Personal Phone", formData.contactInfo.personalPhone, "personalPhone", "contactInfo")}
                    {renderField("Personal Email", formData.contactInfo.personalEmail, "personalEmail", "contactInfo")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renderField("Type", formData.addressInfo.type, "type", "addressInfo")}
                    {renderField("Address Line 1", formData.addressInfo.addressLine1, "addressLine1", "addressInfo")}
                    {renderField("City", formData.addressInfo.city, "city", "addressInfo")}
                    {renderField("Zip", formData.addressInfo.zip, "zip", "addressInfo")}
                    {renderField("Address Line 2", formData.addressInfo.addressLine2, "addressLine2", "addressInfo")}
                    {renderField("State", formData.addressInfo.state, "state", "addressInfo")}
                    {renderField("Country", formData.addressInfo.country, "country", "addressInfo")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Official Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderField("Passport Number", formData.officialDocuments.passportNumber, "passportNumber", "officialDocuments")}
                    {renderField("SSN", formData.officialDocuments.ssn, "ssn", "officialDocuments")}
                    {renderField("TIN", formData.officialDocuments.tin, "tin", "officialDocuments")}
                    {renderField("Driving License", formData.officialDocuments.drivingLicense, "drivingLicense", "officialDocuments")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Employment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renderField("Employee Status", formData.employmentDetails.employeeStatus, "employeeStatus", "employmentDetails")}
                    {renderField("Report To", formData.employmentDetails.reportTo, "reportTo", "employmentDetails")}
                    {renderField("Contract End Date", formData.employmentDetails.contractEndDate, "contractEndDate", "employmentDetails")}
                    {renderField("Date of Joining", formData.employmentDetails.dateOfJoining, "dateOfJoining", "employmentDetails")}
                    {renderField("Salary Mode", formData.employmentDetails.salaryMode, "salaryMode", "employmentDetails")}
                    {renderField("Notice Period (Days)", formData.employmentDetails.noticePeriod, "noticePeriod", "employmentDetails")}
                    {renderField("Overtime Policy", formData.employmentDetails.overtimePolicy, "overtimePolicy", "employmentDetails")}
                    {renderField("Retirement Date", formData.employmentDetails.retirementDate, "retirementDate", "employmentDetails")}
                    {renderField("Cost to Company", formData.employmentDetails.costToCompany, "costToCompany", "employmentDetails")}
                    {renderField("Payroll cost center", formData.employmentDetails.payrollCostCenter, "payrollCostCenter", "employmentDetails")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bank Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renderField("Routing Number", formData.bankInfo.routingNumber, "routingNumber", "bankInfo")}
                    {renderField("Account Number", formData.bankInfo.accountNumber, "accountNumber", "bankInfo")}
                    {renderField("Account Type", formData.bankInfo.accountType, "accountType", "bankInfo")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Competencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {renderField("Skills & Competencies", formData.competencies.skillsAndCompetencies, "skillsAndCompetencies", "competencies")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exit Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderField("Date of Leaving", formData.exitInfo.dateOfLeaving, "dateOfLeaving", "exitInfo")}
                    {renderField("Resignation Letter Date", formData.exitInfo.resignationLetterDate, "resignationLetterDate", "exitInfo")}
                    {renderField("Exit Interview Date", formData.exitInfo.exitInterviewDate, "exitInterviewDate", "exitInfo")}
                    {renderField("New Workplace", formData.exitInfo.newWorkplace, "newWorkplace", "exitInfo")}
                    {renderField("Reason for Leaving", formData.exitInfo.reasonForLeaving, "reasonForLeaving", "exitInfo")}
                    {renderField("Relieving Date", formData.exitInfo.relievingDate, "relievingDate", "exitInfo")}
                    {renderField("Feedback", formData.exitInfo.feedback, "feedback", "exitInfo")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renderField("Name", formData.emergencyContact.name, "name", "emergencyContact")}
                    {renderField("Relation", formData.emergencyContact.relation, "relation", "emergencyContact")}
                    {renderField("Email", formData.emergencyContact.email, "email", "emergencyContact")}
                    {renderField("Date of Birth", formData.emergencyContact.dateOfBirth, "dateOfBirth", "emergencyContact")}
                    {renderField("Phone", formData.emergencyContact.phone, "phone", "emergencyContact")}
                    {renderField("Blood Group", formData.emergencyContact.bloodGroup, "bloodGroup", "emergencyContact")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Institute</TableHead>
                          <TableHead>Degree</TableHead>
                          <TableHead>Major</TableHead>
                          <TableHead>Passing Year</TableHead>
                          <TableHead>Result/Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            No Records Found
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Office</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Designation</TableHead>
                          <TableHead>From Date</TableHead>
                          <TableHead>To Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            No Records Found
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Previous Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Designation</TableHead>
                          <TableHead>Date of Joining</TableHead>
                          <TableHead>Date of Leaving</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                            No Records Found
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other Tabs */}
            <TabsContent value="salary">
              <SalaryTab />
            </TabsContent>

            <TabsContent value="attendance">
              <AttendanceTab />
            </TabsContent>

            <TabsContent value="leaves">
              <LeavesTab />
            </TabsContent>

            <TabsContent value="expense-claims">
              <ExpenseClaimsTab />
            </TabsContent>

            <TabsContent value="shift-assigned">
              <ShiftAssignedTab />
            </TabsContent>

            <TabsContent value="assigned-assets">
              <AssignedAssetsTab />
            </TabsContent>

            <TabsContent value="training">
              <TrainingTab />
            </TabsContent>

            <TabsContent value="travel-requests">
              <TravelRequestsTab />
            </TabsContent>

            <TabsContent value="induction-plan">
              <InductionPlanTab />
            </TabsContent>

            <TabsContent value="incidents">
              <IncidentsTab />
            </TabsContent>

            <TabsContent value="activities">
              <ActivitiesTab />
            </TabsContent>

            <TabsContent value="resignations">
              <ResignationsTab />
            </TabsContent>

            <TabsContent value="audit-trails">
              <AuditTrailsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

