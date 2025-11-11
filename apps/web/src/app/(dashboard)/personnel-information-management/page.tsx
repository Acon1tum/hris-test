"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  MODULES
} from "@hris/constants"
import { 
  Plus, 
  Download, 
  Upload, 
  RefreshCw,
  LayoutGrid,
  List,
  ArrowLeft,
  Calendar as CalendarIcon,
  Trash2,
} from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/employees/data-table"
import { type Employee } from "@/components/employees/columns"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/stores/auth-store"

const moduleData = MODULES.PERSONNEL_INFORMATION

// Sample employee data
const employees: Employee[] = [
  {
    id: "1",
    name: "Lauren Marsh",
    employeeId: "EMP-00001",
    email: "dknitu51@gmail.com",
    phone: "+1 897 654 6789",
    departments: ["Sales"],
    designations: ["Admin"],
    status: "Active",
    gender: "Prefer not to say",
    reportTo: "---",
    dateOfBirth: "September 27, 1996",
    joiningDate: "June 16, 2022",
    updateDate: "17 days ago",
    avatar: "/avatars/lauren.jpg",
  },
  {
    id: "2",
    name: "Jaehee Kim",
    employeeId: "EMP-00002",
    email: "sajid@redq.io",
    phone: "+1 435 467 5869",
    departments: ["Finance"],
    designations: ["Marketing Manager"],
    status: "Active",
    gender: "Male",
    reportTo: "Susan Justin Howard",
    dateOfBirth: "July 21, 2001",
    joiningDate: "July 01, 2023",
    updateDate: "2 days ago",
    avatar: "/avatars/jaehee.jpg",
  },
  {
    id: "3",
    name: "Jennifer Michael Davis",
    employeeId: "EMP-00003",
    email: "jennifer@example.com",
    phone: "+1 234 567 8901",
    departments: ["Sales"],
    designations: ["Sales Manager"],
    status: "Active",
    gender: "Female",
    reportTo: "---",
    dateOfBirth: "March 15, 1990",
    joiningDate: "January 10, 2021",
    updateDate: "5 days ago",
    avatar: "/avatars/jennifer.jpg",
  },
  {
    id: "4",
    name: "John Smith",
    employeeId: "EMP-00004",
    email: "john@example.com",
    phone: "+1 345 678 9012",
    departments: ["Sales", "Marketing", "Operations", "HR", "Finance"],
    designations: ["Manager"],
    status: "Active",
    gender: "Male",
    reportTo: "---",
    dateOfBirth: "April 20, 1985",
    joiningDate: "March 01, 2020",
    updateDate: "1 day ago",
    avatar: "/avatars/john.jpg",
  },
  {
    id: "5",
    name: "Sarah Johnson",
    employeeId: "EMP-00005",
    email: "sarah@example.com",
    phone: "+1 456 789 0123",
    departments: ["Operations"],
    designations: ["Operations Manager"],
    status: "Termination Requested",
    gender: "Female",
    reportTo: "John Smith",
    dateOfBirth: "August 12, 1992",
    joiningDate: "February 15, 2022",
    updateDate: "10 days ago",
    avatar: "/avatars/sarah.jpg",
  },
  {
    id: "6",
    name: "Michael Brown",
    employeeId: "EMP-00006",
    email: "michael@example.com",
    phone: "+1 567 890 1234",
    departments: ["HR"],
    designations: ["HR Manager"],
    status: "Active",
    gender: "Male",
    reportTo: "---",
    dateOfBirth: "November 05, 1988",
    joiningDate: "May 01, 2021",
    updateDate: "3 days ago",
    avatar: "/avatars/michael.jpg",
  },
  {
    id: "7",
    name: "Emily Davis",
    employeeId: "EMP-00007",
    email: "emily@example.com",
    phone: "+1 678 901 2345",
    departments: ["Marketing"],
    designations: ["Marketing Specialist"],
    status: "Active",
    gender: "Other",
    reportTo: "Jaehee Kim",
    dateOfBirth: "December 25, 1995",
    joiningDate: "August 10, 2023",
    updateDate: "7 days ago",
    avatar: "/avatars/emily.jpg",
  },
  {
    id: "8",
    name: "David Wilson",
    employeeId: "EMP-00008",
    email: "david@example.com",
    phone: "+1 789 012 3456",
    departments: ["Finance"],
    designations: ["Accountant"],
    status: "Active",
    gender: "Male",
    reportTo: "Jaehee Kim",
    dateOfBirth: "January 30, 1993",
    joiningDate: "September 05, 2022",
    updateDate: "4 days ago",
    avatar: "/avatars/david.jpg",
  },
  {
    id: "9",
    name: "Lisa Anderson",
    employeeId: "EMP-00009",
    email: "lisa@example.com",
    phone: "+1 890 123 4567",
    departments: ["Sales"],
    designations: ["Sales Representative"],
    status: "Active",
    gender: "Female",
    reportTo: "Jennifer Michael Davis",
    dateOfBirth: "June 18, 1994",
    joiningDate: "October 12, 2022",
    updateDate: "6 days ago",
    avatar: "/avatars/lisa.jpg",
  },
  {
    id: "10",
    name: "Robert Taylor",
    employeeId: "EMP-00010",
    email: "robert@example.com",
    phone: "+1 901 234 5678",
    departments: ["Operations"],
    designations: ["Operations Coordinator"],
    status: "Active",
    gender: "Male",
    reportTo: "Sarah Johnson",
    dateOfBirth: "February 14, 1991",
    joiningDate: "November 20, 2023",
    updateDate: "1 day ago",
    avatar: "/avatars/robert.jpg",
  },
]

// Sample filter options
const departments = [
  { value: "all", label: "All Departments" },
  { value: "sales", label: "Sales" },
  { value: "finance", label: "Finance" },
  { value: "hr", label: "HR" },
  { value: "marketing", label: "Marketing" },
  { value: "operations", label: "Operations" },
]

const designations = [
  { value: "all", label: "All Designations" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "specialist", label: "Specialist" },
  { value: "coordinator", label: "Coordinator" },
]

const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "termination-requested", label: "Termination Requested" },
]

export default function PersonnelInformationPage() {
  const { hasModuleAccess, hasPermission } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedDesignation, setSelectedDesignation] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showTerminated, setShowTerminated] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // Basic Details
    avatar: null as File | null,
    firstName: "",
    middleName: "",
    lastName: "",
    religion: "",
    gender: "",
    maritalStatus: "",
    bloodGroup: "",
    nationality: "",
    dateOfBirth: "",
    passportNo: "",
    ssn: "",
    drivingLicense: "",
    tin: "",
    // Employment Info
    employeeId: "EMP-00042",
    attendanceDeviceId: "",
    jobApplication: "",
    inviteTo: "",
    userId: "",
    office: "",
    departments: "",
    designation: "",
    reportsTo: "",
    employmentType: "",
    leavePolicy: "",
    employeeGrade: "",
    offerDate: "",
    confirmationDate: "",
    joiningDate: "",
    contractEndDate: "",
    dateOfLeaving: "",
    resignationLetterDate: "",
    referringDate: "",
    exitInterviewHeldOn: "",
    noticePeriod: "",
    expenseApprover: "",
    leaveApprover: "",
    shiftRequestApprover: "",
    overtimePolicy: "",
    reasonForLeaving: "",
    feedback: "",
    // Bank Information
    routingNumber: "",
    accountNumber: "",
    accountType: "",
    // Competencies
    competencies: [] as string[],
    // Additional Services
    github: false,
    microsoftOffice: false,
    googleWorkspace: false,
    // Contact Info
    companyPhone: "",
    companyPhoneCountry: "",
    companyEmail: "",
    personalEmail: "",
    personalPhone: "",
    personalPhoneCountry: "",
    // Emergency Contact
    emergencyName: "",
    emergencyRelation: "",
    emergencyEmail: "",
    emergencyPhone: "",
    emergencyPhoneCountry: "",
    emergencyDateOfBirth: "",
    emergencyBloodGroup: "",
    showEmergencyData: false,
    // Academic Info
    academicRecords: [] as Array<{
      id: string
      institute: string
      degree: string
      passingYear: string
      major: string
      grade: string
    }>,
    // Work Experiences
    workExperiences: [] as Array<{
      id: string
      office: string
      department: string
      designation: string
      fromDate: string
      toDate: string
    }>,
    // Previous Work Experiences
    previousWorkExperiences: [] as Array<{
      id: string
      company: string
      designation: string
      employmentType: string
      dateOfJoining: string
      dateOfLeaving: string
    }>,
    // Attachments
    attachments: [] as File[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData)
    setIsCreating(false)
  }

  const addAcademicRecord = () => {
    setFormData((prev) => ({
      ...prev,
      academicRecords: [
        ...prev.academicRecords,
        {
          id: Date.now().toString(),
          institute: "",
          degree: "",
          passingYear: "",
          major: "",
          grade: "",
        },
      ],
    }))
  }

  const removeAcademicRecord = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      academicRecords: prev.academicRecords.filter((record) => record.id !== id),
    }))
  }

  const updateAcademicRecord = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      academicRecords: prev.academicRecords.map((record) =>
        record.id === id ? { ...record, [field]: value } : record
      ),
    }))
  }

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: [
        ...prev.workExperiences,
        {
          id: Date.now().toString(),
          office: "",
          department: "",
          designation: "",
          fromDate: "",
          toDate: "",
        },
      ],
    }))
  }

  const removeWorkExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.filter((exp) => exp.id !== id),
    }))
  }

  const updateWorkExperience = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }))
  }

  const addPreviousWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      previousWorkExperiences: [
        ...prev.previousWorkExperiences,
        {
          id: Date.now().toString(),
          company: "",
          designation: "",
          employmentType: "",
          dateOfJoining: "",
          dateOfLeaving: "",
        },
      ],
    }))
  }

  const removePreviousWorkExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      previousWorkExperiences: prev.previousWorkExperiences.filter(
        (exp) => exp.id !== id
      ),
    }))
  }

  const updatePreviousWorkExperience = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      previousWorkExperiences: prev.previousWorkExperiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...files],
      }))
    }
  }

  const removeAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

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

  if (isCreating) {
    return (
      <>
        <SiteHeader />
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Add a New Employee</CardTitle>
                    <CardDescription>Dashboard &gt; Personnel Information Management</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Save Draft
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Details Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-24 w-24">
                          <AvatarFallback>Upload</AvatarFallback>
                        </Avatar>
                        <Button type="button" variant="outline" size="sm">
                          Upload Avatar
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          First Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="middleName">Middle Name</Label>
                        <Input
                          id="middleName"
                          value={formData.middleName}
                          onChange={(e) =>
                            setFormData({ ...formData, middleName: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          Last Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="religion">Religion</Label>
                        <Select
                          value={formData.religion}
                          onValueChange={(value) =>
                            setFormData({ ...formData, religion: value })
                          }
                        >
                          <SelectTrigger id="religion">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="christianity">Christianity</SelectItem>
                            <SelectItem value="islam">Islam</SelectItem>
                            <SelectItem value="hinduism">Hinduism</SelectItem>
                            <SelectItem value="buddhism">Buddhism</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">
                          Gender <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) =>
                            setFormData({ ...formData, gender: value })
                          }
                          required
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maritalStatus">Marital Status</Label>
                        <Select
                          value={formData.maritalStatus}
                          onValueChange={(value) =>
                            setFormData({ ...formData, maritalStatus: value })
                          }
                        >
                          <SelectTrigger id="maritalStatus">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <Select
                          value={formData.bloodGroup}
                          onValueChange={(value) =>
                            setFormData({ ...formData, bloodGroup: value })
                          }
                        >
                          <SelectTrigger id="bloodGroup">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a+">A+</SelectItem>
                            <SelectItem value="a-">A-</SelectItem>
                            <SelectItem value="b+">B+</SelectItem>
                            <SelectItem value="b-">B-</SelectItem>
                            <SelectItem value="ab+">AB+</SelectItem>
                            <SelectItem value="ab-">AB-</SelectItem>
                            <SelectItem value="o+">O+</SelectItem>
                            <SelectItem value="o-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality</Label>
                        <Select
                          value={formData.nationality}
                          onValueChange={(value) =>
                            setFormData({ ...formData, nationality: value })
                          }
                        >
                          <SelectTrigger id="nationality">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="philippines">Philippines</SelectItem>
                            <SelectItem value="usa">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">
                          Date of Birth <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) =>
                              setFormData({ ...formData, dateOfBirth: e.target.value })
                            }
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passportNo">Passport No.</Label>
                        <Input
                          id="passportNo"
                          value={formData.passportNo}
                          onChange={(e) =>
                            setFormData({ ...formData, passportNo: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ssn">SSN</Label>
                        <Input
                          id="ssn"
                          value={formData.ssn}
                          onChange={(e) =>
                            setFormData({ ...formData, ssn: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="drivingLicense">Driving License</Label>
                        <Input
                          id="drivingLicense"
                          value={formData.drivingLicense}
                          onChange={(e) =>
                            setFormData({ ...formData, drivingLicense: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tin">TIN</Label>
                        <Input
                          id="tin"
                          value={formData.tin}
                          onChange={(e) =>
                            setFormData({ ...formData, tin: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Employment Info Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-semibold">Employment Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employeeId">Employee ID</Label>
                        <Input
                          id="employeeId"
                          value={formData.employeeId}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="attendanceDeviceId">Attendance Device ID</Label>
                        <Input
                          id="attendanceDeviceId"
                          value={formData.attendanceDeviceId}
                          onChange={(e) =>
                            setFormData({ ...formData, attendanceDeviceId: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobApplication">Job Application</Label>
                        <Select
                          value={formData.jobApplication}
                          onValueChange={(value) =>
                            setFormData({ ...formData, jobApplication: value })
                          }
                        >
                          <SelectTrigger id="jobApplication">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Application 1</SelectItem>
                            <SelectItem value="2">Application 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inviteTo">Invite To</Label>
                        <Input
                          id="inviteTo"
                          type="email"
                          value={formData.inviteTo}
                          onChange={(e) =>
                            setFormData({ ...formData, inviteTo: e.target.value })
                          }
                          placeholder="Email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="userId">User ID</Label>
                        <Select
                          value={formData.userId}
                          onValueChange={(value) =>
                            setFormData({ ...formData, userId: value })
                          }
                        >
                          <SelectTrigger id="userId">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">User 1</SelectItem>
                            <SelectItem value="2">User 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="office">
                          Office <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.office}
                          onValueChange={(value) =>
                            setFormData({ ...formData, office: value })
                          }
                          required
                        >
                          <SelectTrigger id="office">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="office1">Office 1</SelectItem>
                            <SelectItem value="office2">Office 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="departments">
                          Departments <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.departments}
                          onValueChange={(value) =>
                            setFormData({ ...formData, departments: value })
                          }
                          required
                        >
                          <SelectTrigger id="departments">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="hr">HR</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation">
                          Designation <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.designation}
                          onValueChange={(value) =>
                            setFormData({ ...formData, designation: value })
                          }
                          required
                        >
                          <SelectTrigger id="designation">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="specialist">Specialist</SelectItem>
                            <SelectItem value="coordinator">Coordinator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reportsTo">Reports To</Label>
                        <Select
                          value={formData.reportsTo}
                          onValueChange={(value) =>
                            setFormData({ ...formData, reportsTo: value })
                          }
                        >
                          <SelectTrigger id="reportsTo">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Manager 1</SelectItem>
                            <SelectItem value="2">Manager 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employmentType">
                          Employment Type <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.employmentType}
                          onValueChange={(value) =>
                            setFormData({ ...formData, employmentType: value })
                          }
                          required
                        >
                          <SelectTrigger id="employmentType">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full Time</SelectItem>
                            <SelectItem value="part-time">Part Time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="intern">Intern</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="leavePolicy">Leave Policy</Label>
                        <Select
                          value={formData.leavePolicy}
                          onValueChange={(value) =>
                            setFormData({ ...formData, leavePolicy: value })
                          }
                        >
                          <SelectTrigger id="leavePolicy">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="policy1">Policy 1</SelectItem>
                            <SelectItem value="policy2">Policy 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employeeGrade">Employee Grade</Label>
                        <Select
                          value={formData.employeeGrade}
                          onValueChange={(value) =>
                            setFormData({ ...formData, employeeGrade: value })
                          }
                        >
                          <SelectTrigger id="employeeGrade">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grade1">Grade 1</SelectItem>
                            <SelectItem value="grade2">Grade 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="offerDate">Offer Date</Label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="offerDate"
                            type="date"
                            value={formData.offerDate}
                            onChange={(e) =>
                              setFormData({ ...formData, offerDate: e.target.value })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmationDate">Confirmation Date</Label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmationDate"
                            type="date"
                            value={formData.confirmationDate}
                            onChange={(e) =>
                              setFormData({ ...formData, confirmationDate: e.target.value })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="joiningDate">
                          Joining Date <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="joiningDate"
                            type="date"
                            value={formData.joiningDate}
                            onChange={(e) =>
                              setFormData({ ...formData, joiningDate: e.target.value })
                            }
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contractEndDate">Contract End Date</Label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="contractEndDate"
                            type="date"
                            value={formData.contractEndDate}
                            onChange={(e) =>
                              setFormData({ ...formData, contractEndDate: e.target.value })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfLeaving">Date of Leaving</Label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="dateOfLeaving"
                            type="date"
                            value={formData.dateOfLeaving}
                            onChange={(e) =>
                              setFormData({ ...formData, dateOfLeaving: e.target.value })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resignationLetterDate">Resignation Letter Date</Label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="resignationLetterDate"
                            type="date"
                            value={formData.resignationLetterDate}
                            onChange={(e) =>
                              setFormData({ ...formData, resignationLetterDate: e.target.value })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="referringDate">Referring Date</Label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="referringDate"
                            type="date"
                            value={formData.referringDate}
                            onChange={(e) =>
                              setFormData({ ...formData, referringDate: e.target.value })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exitInterviewHeldOn">Exit Interview Held On</Label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="exitInterviewHeldOn"
                            type="date"
                            value={formData.exitInterviewHeldOn}
                            onChange={(e) =>
                              setFormData({ ...formData, exitInterviewHeldOn: e.target.value })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="noticePeriod">Notice Period (Days)</Label>
                        <Input
                          id="noticePeriod"
                          type="number"
                          value={formData.noticePeriod}
                          onChange={(e) =>
                            setFormData({ ...formData, noticePeriod: e.target.value })
                          }
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expenseApprover">Expense Approver</Label>
                        <Select
                          value={formData.expenseApprover}
                          onValueChange={(value) =>
                            setFormData({ ...formData, expenseApprover: value })
                          }
                        >
                          <SelectTrigger id="expenseApprover">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Approver 1</SelectItem>
                            <SelectItem value="2">Approver 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="leaveApprover">Leave Approver</Label>
                        <Select
                          value={formData.leaveApprover}
                          onValueChange={(value) =>
                            setFormData({ ...formData, leaveApprover: value })
                          }
                        >
                          <SelectTrigger id="leaveApprover">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Approver 1</SelectItem>
                            <SelectItem value="2">Approver 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shiftRequestApprover">Shift Request Approver</Label>
                        <Select
                          value={formData.shiftRequestApprover}
                          onValueChange={(value) =>
                            setFormData({ ...formData, shiftRequestApprover: value })
                          }
                        >
                          <SelectTrigger id="shiftRequestApprover">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Approver 1</SelectItem>
                            <SelectItem value="2">Approver 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="overtimePolicy">Overtime Policy</Label>
                        <Select
                          value={formData.overtimePolicy}
                          onValueChange={(value) =>
                            setFormData({ ...formData, overtimePolicy: value })
                          }
                        >
                          <SelectTrigger id="overtimePolicy">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="policy1">Policy 1</SelectItem>
                            <SelectItem value="policy2">Policy 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 md:col-span-3">
                        <Label htmlFor="reasonForLeaving">Reason For Leaving</Label>
                        <Textarea
                          id="reasonForLeaving"
                          value={formData.reasonForLeaving}
                          onChange={(e) =>
                            setFormData({ ...formData, reasonForLeaving: e.target.value })
                          }
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-3">
                        <Label htmlFor="feedback">Feedback</Label>
                        <Textarea
                          id="feedback"
                          value={formData.feedback}
                          onChange={(e) =>
                            setFormData({ ...formData, feedback: e.target.value })
                          }
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bank Information Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-semibold">Bank Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="routingNumber">Routing Number</Label>
                        <Input
                          id="routingNumber"
                          value={formData.routingNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, routingNumber: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          value={formData.accountNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, accountNumber: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountType">Account Type</Label>
                        <Select
                          value={formData.accountType}
                          onValueChange={(value) =>
                            setFormData({ ...formData, accountType: value })
                          }
                        >
                          <SelectTrigger id="accountType">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checking">Checking</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Competencies Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-semibold">Competencies</h3>
                    <div className="space-y-2">
                      <Label htmlFor="competencies">Select Competencies</Label>
                      <Select
                        value=""
                        onValueChange={(value) => {
                          if (!formData.competencies.includes(value)) {
                            setFormData((prev) => ({
                              ...prev,
                              competencies: [...prev.competencies, value],
                            }))
                          }
                        }}
                      >
                        <SelectTrigger id="competencies">
                          <SelectValue placeholder="Select competencies..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="communication">Communication</SelectItem>
                          <SelectItem value="leadership">Leadership</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="problem-solving">Problem Solving</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.competencies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.competencies.map((comp, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  competencies: prev.competencies.filter((c) => c !== comp),
                                }))
                              }}
                            >
                              {comp}
                              <span className="ml-2">×</span>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Services Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-semibold">Additional Services</h3>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="github"
                          checked={formData.github}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, github: !!checked })
                          }
                        />
                        <Label htmlFor="github" className="cursor-pointer">
                          Github
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="microsoftOffice"
                          checked={formData.microsoftOffice}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, microsoftOffice: !!checked })
                          }
                        />
                        <Label htmlFor="microsoftOffice" className="cursor-pointer">
                          Microsoft Office
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="googleWorkspace"
                          checked={formData.googleWorkspace}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, googleWorkspace: !!checked })
                          }
                        />
                        <Label htmlFor="googleWorkspace" className="cursor-pointer">
                          Google Workspace
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-semibold">Contact Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyPhone">Company Phone</Label>
                        <div className="flex gap-2">
                          <Select
                            value={formData.companyPhoneCountry}
                            onValueChange={(value) =>
                              setFormData({ ...formData, companyPhoneCountry: value })
                            }
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+1">+1</SelectItem>
                              <SelectItem value="+63">+63</SelectItem>
                              <SelectItem value="+44">+44</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            id="companyPhone"
                            value={formData.companyPhone}
                            onChange={(e) =>
                              setFormData({ ...formData, companyPhone: e.target.value })
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyEmail">Company Email</Label>
                        <Input
                          id="companyEmail"
                          type="email"
                          value={formData.companyEmail}
                          onChange={(e) =>
                            setFormData({ ...formData, companyEmail: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="personalEmail">Personal Email</Label>
                        <Input
                          id="personalEmail"
                          type="email"
                          value={formData.personalEmail}
                          onChange={(e) =>
                            setFormData({ ...formData, personalEmail: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="personalPhone">Personal Phone</Label>
                        <div className="flex gap-2">
                          <Select
                            value={formData.personalPhoneCountry}
                            onValueChange={(value) =>
                              setFormData({ ...formData, personalPhoneCountry: value })
                            }
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+1">+1</SelectItem>
                              <SelectItem value="+63">+63</SelectItem>
                              <SelectItem value="+44">+44</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            id="personalPhone"
                            value={formData.personalPhone}
                            onChange={(e) =>
                              setFormData({ ...formData, personalPhone: e.target.value })
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-semibold">Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyName">Name</Label>
                        <Input
                          id="emergencyName"
                          value={formData.emergencyName}
                          onChange={(e) =>
                            setFormData({ ...formData, emergencyName: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyRelation">Relation</Label>
                        <Input
                          id="emergencyRelation"
                          value={formData.emergencyRelation}
                          onChange={(e) =>
                            setFormData({ ...formData, emergencyRelation: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyEmail">Email</Label>
                        <Input
                          id="emergencyEmail"
                          type="email"
                          value={formData.emergencyEmail}
                          onChange={(e) =>
                            setFormData({ ...formData, emergencyEmail: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Phone</Label>
                        <div className="flex gap-2">
                          <Select
                            value={formData.emergencyPhoneCountry}
                            onValueChange={(value) =>
                              setFormData({ ...formData, emergencyPhoneCountry: value })
                            }
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+1">+1</SelectItem>
                              <SelectItem value="+63">+63</SelectItem>
                              <SelectItem value="+44">+44</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            id="emergencyPhone"
                            value={formData.emergencyPhone}
                            onChange={(e) =>
                              setFormData({ ...formData, emergencyPhone: e.target.value })
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyDateOfBirth">Date of Birth</Label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="emergencyDateOfBirth"
                            type="date"
                            value={formData.emergencyDateOfBirth}
                            onChange={(e) =>
                              setFormData({ ...formData, emergencyDateOfBirth: e.target.value })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyBloodGroup">Blood Group</Label>
                        <Select
                          value={formData.emergencyBloodGroup}
                          onValueChange={(value) =>
                            setFormData({ ...formData, emergencyBloodGroup: value })
                          }
                        >
                          <SelectTrigger id="emergencyBloodGroup">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a+">A+</SelectItem>
                            <SelectItem value="a-">A-</SelectItem>
                            <SelectItem value="b+">B+</SelectItem>
                            <SelectItem value="b-">B-</SelectItem>
                            <SelectItem value="ab+">AB+</SelectItem>
                            <SelectItem value="ab-">AB-</SelectItem>
                            <SelectItem value="o+">O+</SelectItem>
                            <SelectItem value="o-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="showEmergencyData"
                          checked={formData.showEmergencyData}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, showEmergencyData: !!checked })
                          }
                        />
                        <Label htmlFor="showEmergencyData" className="cursor-pointer">
                          Show Data
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Academic Info Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Academic Info</h3>
                      <Button type="button" variant="outline" size="sm" onClick={addAcademicRecord}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Record
                      </Button>
                    </div>
                    {formData.academicRecords.length > 0 && (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Institute</TableHead>
                              <TableHead>Degree</TableHead>
                              <TableHead>Passing Year</TableHead>
                              <TableHead>Major</TableHead>
                              <TableHead>Grade/Score</TableHead>
                              <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {formData.academicRecords.map((record) => (
                              <TableRow key={record.id}>
                                <TableCell>
                                  <Input
                                    value={record.institute}
                                    onChange={(e) =>
                                      updateAcademicRecord(record.id, "institute", e.target.value)
                                    }
                                    placeholder="Institute"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={record.degree}
                                    onChange={(e) =>
                                      updateAcademicRecord(record.id, "degree", e.target.value)
                                    }
                                    placeholder="Degree"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={record.passingYear}
                                    onChange={(e) =>
                                      updateAcademicRecord(record.id, "passingYear", e.target.value)
                                    }
                                    placeholder="Year"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={record.major}
                                    onChange={(e) =>
                                      updateAcademicRecord(record.id, "major", e.target.value)
                                    }
                                    placeholder="Major"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={record.grade}
                                    onChange={(e) =>
                                      updateAcademicRecord(record.id, "grade", e.target.value)
                                    }
                                    placeholder="Grade/Score"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeAcademicRecord(record.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>

                  {/* Work Experiences Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Work Experiences</h3>
                      <Button type="button" variant="outline" size="sm" onClick={addWorkExperience}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Record
                      </Button>
                    </div>
                    {formData.workExperiences.length > 0 && (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Office</TableHead>
                              <TableHead>Department</TableHead>
                              <TableHead>Designation</TableHead>
                              <TableHead>From Date</TableHead>
                              <TableHead>To Date</TableHead>
                              <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {formData.workExperiences.map((exp) => (
                              <TableRow key={exp.id}>
                                <TableCell>
                                  <Input
                                    value={exp.office}
                                    onChange={(e) =>
                                      updateWorkExperience(exp.id, "office", e.target.value)
                                    }
                                    placeholder="Office"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={exp.department}
                                    onChange={(e) =>
                                      updateWorkExperience(exp.id, "department", e.target.value)
                                    }
                                    placeholder="Department"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={exp.designation}
                                    onChange={(e) =>
                                      updateWorkExperience(exp.id, "designation", e.target.value)
                                    }
                                    placeholder="Designation"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="date"
                                    value={exp.fromDate}
                                    onChange={(e) =>
                                      updateWorkExperience(exp.id, "fromDate", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="date"
                                    value={exp.toDate}
                                    onChange={(e) =>
                                      updateWorkExperience(exp.id, "toDate", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeWorkExperience(exp.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>

                  {/* Previous Work Experiences Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Previous Work Experiences</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addPreviousWorkExperience}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Record
                      </Button>
                    </div>
                    {formData.previousWorkExperiences.length > 0 && (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Company</TableHead>
                              <TableHead>Designation</TableHead>
                              <TableHead>Employment Type</TableHead>
                              <TableHead>Date of Joining</TableHead>
                              <TableHead>Date of Leaving</TableHead>
                              <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {formData.previousWorkExperiences.map((exp) => (
                              <TableRow key={exp.id}>
                                <TableCell>
                                  <Input
                                    value={exp.company}
                                    onChange={(e) =>
                                      updatePreviousWorkExperience(exp.id, "company", e.target.value)
                                    }
                                    placeholder="Company"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={exp.designation}
                                    onChange={(e) =>
                                      updatePreviousWorkExperience(
                                        exp.id,
                                        "designation",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Designation"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={exp.employmentType}
                                    onChange={(e) =>
                                      updatePreviousWorkExperience(
                                        exp.id,
                                        "employmentType",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Employment Type"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="date"
                                    value={exp.dateOfJoining}
                                    onChange={(e) =>
                                      updatePreviousWorkExperience(
                                        exp.id,
                                        "dateOfJoining",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="date"
                                    value={exp.dateOfLeaving}
                                    onChange={(e) =>
                                      updatePreviousWorkExperience(
                                        exp.id,
                                        "dateOfLeaving",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removePreviousWorkExperience(exp.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>

                  {/* Attachments Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-semibold">Attachments</h3>
                    <div
                      className="rounded-md border border-dashed p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag &apos;n&apos; Drop some files here, or click to select files
                      </p>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </div>
                    {formData.attachments.length > 0 && (
                      <div className="space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-muted rounded"
                          >
                            <span className="text-sm">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" type="button" onClick={() => setIsCreating(false)}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit">Save</Button>
                  </div>
                </form>
              </CardContent>
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{moduleData.name}</CardTitle>
                  <CardDescription>{moduleData.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                  <Button variant="outline" size="sm">
                    Update in Bulk
                  </Button>
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex items-center gap-4 flex-wrap">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedDesignation} onValueChange={setSelectedDesignation}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Designation" />
                    </SelectTrigger>
                    <SelectContent>
                      {designations.map((des) => (
                        <SelectItem key={des.value} value={des.value}>
                          {des.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="terminated"
                      checked={showTerminated}
                      onCheckedChange={setShowTerminated}
                    />
                    <Label htmlFor="terminated" className="text-sm">
                      Terminated Employees
                    </Label>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <DataTable
                  data={employees}
                  search={searchQuery}
                  onSearchChange={setSearchQuery}
                  departmentFilter={selectedDepartment}
                  onDepartmentFilterChange={setSelectedDepartment}
                  designationFilter={selectedDesignation}
                  onDesignationFilterChange={setSelectedDesignation}
                  statusFilter={selectedStatus}
                  onStatusFilterChange={setSelectedStatus}
                  showTerminated={showTerminated}
                  onShowTerminatedChange={setShowTerminated}
                  onView={(employee) => {
                    // TODO: Implement view
                    console.log("View", employee)
                  }}
                  onEdit={(employee) => {
                    // TODO: Implement edit
                    console.log("Edit", employee)
                  }}
                  onDelete={(employee) => {
                    // TODO: Implement delete
                    console.log("Delete", employee)
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
