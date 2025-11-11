import { config } from 'dotenv';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Load .env from root directory
config({ path: resolve(__dirname, '../../../.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Seed Modules
  console.log('📦 Seeding modules...');
  const modules = [
    {
      name: 'E-Payroll',
      slug: 'e-payroll',
      description: 'Payroll processing and salary management',
      icon: 'DollarSign',
      order: 1,
      isActive: true,
    },
    {
      name: 'Employee Self Service',
      slug: 'employee-self-service',
      description: 'Employee portal for self-management',
      icon: 'User',
      order: 2,
      isActive: true,
    },
    {
      name: 'Health & Wellness',
      slug: 'health-wellness',
      description: 'Health benefits and wellness programs',
      icon: 'Heart',
      order: 3,
      isActive: true,
    },
    {
      name: 'Job Management',
      slug: 'job-management',
      description: 'Job postings and internal positions',
      icon: 'Briefcase',
      order: 4,
      isActive: true,
    },
    {
      name: 'Leave Management',
      slug: 'leave-management',
      description: 'Leave requests and approvals',
      icon: 'Calendar',
      order: 5,
      isActive: true,
    },
    {
      name: 'Job Application Portal',
      slug: 'online-job-application-portal',
      description: 'External candidate applications',
      icon: 'FileText',
      order: 6,
      isActive: true,
    },
    {
      name: 'Payroll Management',
      slug: 'payroll-management',
      description: 'Advanced payroll configuration',
      icon: 'Settings',
      order: 7,
      isActive: true,
    },
    {
      name: 'Performance Management',
      slug: 'performance-management',
      description: 'Employee evaluations and goals',
      icon: 'TrendingUp',
      order: 8,
      isActive: true,
    },
    {
      name: 'Personnel Information',
      slug: 'personnel-information-management',
      description: 'Employee data management',
      icon: 'Users',
      order: 9,
      isActive: true,
    },
    {
      name: 'Report Generation',
      slug: 'report-generation',
      description: 'Analytics and reporting',
      icon: 'BarChart',
      order: 10,
      isActive: true,
    },
    {
      name: 'System Administration',
      slug: 'system-administration',
      description: 'System settings, roles, and permissions',
      icon: 'Shield',
      order: 11,
      isActive: true,
    },
    {
      name: 'Timekeeping & Attendance',
      slug: 'timekeeping-attendance',
      description: 'Time tracking and attendance',
      icon: 'Clock',
      order: 12,
      isActive: true,
    },
  ];

  for (const moduleData of modules) {
    await prisma.module.upsert({
      where: { slug: moduleData.slug },
      update: moduleData,
      create: moduleData,
    });
  }

  // Seed Permissions
  console.log('🔐 Seeding permissions...');
  const createdModules = await prisma.module.findMany();

  const permissionTemplates = [
    { action: 'create', name: 'Create' },
    { action: 'read', name: 'View' },
    { action: 'update', name: 'Update' },
    { action: 'delete', name: 'Delete' },
    { action: 'approve', name: 'Approve' },
    { action: 'export', name: 'Export' },
  ];

  for (const module of createdModules) {
    const resource = module.slug.replace(/-/g, '_');

    for (const template of permissionTemplates) {
      await prisma.permission.upsert({
        where: { slug: `${resource}:${template.action}` },
        update: {},
        create: {
          name: `${template.name} ${module.name}`,
          slug: `${resource}:${template.action}`,
          description: `${template.name} access to ${module.name}`,
          moduleId: module.id,
          resource,
          action: template.action,
        },
      });
    }
  }

  // Seed Roles
  console.log('👥 Seeding roles...');
  const adminRole = await prisma.role.upsert({
    where: { name: 'Super Admin' },
    update: {},
    create: {
      name: 'Super Admin',
      description: 'Full system access',
      isSystem: true,
      priority: 100,
    },
  });

  const hrManagerRole = await prisma.role.upsert({
    where: { name: 'HR Manager' },
    update: {},
    create: {
      name: 'HR Manager',
      description: 'HR management access',
      isSystem: true,
      priority: 90,
    },
  });

  const employeeRole = await prisma.role.upsert({
    where: { name: 'Employee' },
    update: {},
    create: {
      name: 'Employee',
      description: 'Basic employee access',
      isSystem: true,
      priority: 10,
    },
  });

  // Assign all permissions to Super Admin
  const allPermissions = await prisma.permission.findMany();
  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }

  // Assign all modules to Super Admin
  for (const module of createdModules) {
    await prisma.roleModule.upsert({
      where: {
        roleId_moduleId: {
          roleId: adminRole.id,
          moduleId: module.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        moduleId: module.id,
        canAccess: true,
      },
    });
  }

  // Assign HR-related permissions to HR Manager
  const hrPermissions = allPermissions.filter((p) =>
    [
      'personnel_information_management',
      'leave_management',
      'performance_management',
      'e_payroll',
      'payroll_management',
    ].includes(p.resource)
  );

  for (const permission of hrPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: hrManagerRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: hrManagerRole.id,
        permissionId: permission.id,
      },
    });
  }

  // Assign employee self-service permissions
  const essPermissions = allPermissions.filter((p) =>
    ['employee_self_service', 'leave_management'].includes(p.resource) &&
    ['read', 'create'].includes(p.action)
  );

  for (const permission of essPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: employeeRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: employeeRole.id,
        permissionId: permission.id,
      },
    });
  }

  // Seed Test Users
  console.log('👤 Seeding users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@hris.com' },
    update: {},
    create: {
      email: 'admin@hris.com',
      password: hashedPassword,
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      middleName: 'Santos',
      suffix: 'Jr.',
      mobileNumber: '+639171234567',
      landline: '+632-1234-5678',
      isActive: true,
    },
  });

  const hrUser = await prisma.user.upsert({
    where: { email: 'hr@hris.com' },
    update: {},
    create: {
      email: 'hr@hris.com',
      password: hashedPassword,
      firstName: 'Maria',
      lastName: 'Santos',
      middleName: 'Reyes',
      mobileNumber: '+639171234568',
      landline: '+632-1234-5679',
      isActive: true,
    },
  });

  const employeeUser = await prisma.user.upsert({
    where: { email: 'employee@hris.com' },
    update: {},
    create: {
      email: 'employee@hris.com',
      password: hashedPassword,
      firstName: 'Jose',
      lastName: 'Garcia',
      middleName: 'Lopez',
      mobileNumber: '+639171234569',
      landline: '+632-1234-5680',
      isActive: true,
    },
  });

  // Assign roles to users
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: hrUser.id,
        roleId: hrManagerRole.id,
      },
    },
    update: {},
    create: {
      userId: hrUser.id,
      roleId: hrManagerRole.id,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: employeeUser.id,
        roleId: employeeRole.id,
      },
    },
    update: {},
    create: {
      userId: employeeUser.id,
      roleId: employeeRole.id,
    },
  });

  // Seed Organizations
  console.log('🏛️ Seeding organizations...');
  const mainOrganization = await prisma.organization.upsert({
    where: { name: 'HRIS System' },
    update: {},
    create: {
      name: 'HRIS System',
      slug: 'hris-system',
      currencyCode: 'PHP',
      dayFormat: 'F d, Y',
      timeFormat: 'h:i:s A',
      timeZone: 'Asia/Manila',
      domain: 'hris.local',
      employeeIdLabel: 'Employee ID',
      isActive: true,
    },
  });

  // Seed Offices
  console.log('🏢 Seeding offices...');
  // Check if offices already exist
  let mainOffice = await prisma.office.findFirst({
    where: { name: 'Main Office' },
  });

  if (!mainOffice) {
    mainOffice = await prisma.office.create({
      data: {
        name: 'Main Office',
        branchName: 'Headquarters',
        description: 'Main office location in Metro Manila',
        addressLine1: '123 Rizal Avenue',
        addressLine2: 'Barangay San Antonio',
        barangay: 'San Antonio',
        city: 'Pasig City',
        province: 'Metro Manila',
        region: 'National Capital Region (NCR)',
        zipCode: '1600',
        country: 'Philippines',
        isActive: true,
        phoneNumbers: {
          create: [
            {
              countryCode: '+63',
              number: '2-1234-5678',
              type: 'Main',
              isPrimary: true,
            },
            {
              countryCode: '+63',
              number: '917-123-4567',
              type: 'Mobile',
              isPrimary: false,
            },
          ],
        },
        emailAddresses: {
          create: [
            {
              email: 'info@hris.local',
              type: 'Main',
              isPrimary: true,
            },
            {
              email: 'support@hris.local',
              type: 'Support',
              isPrimary: false,
            },
          ],
        },
      },
    });
  } else {
    // Update existing office
    mainOffice = await prisma.office.update({
      where: { id: mainOffice.id },
      data: {
        branchName: 'Headquarters',
        description: 'Main office location in Metro Manila',
        addressLine1: '123 Rizal Avenue',
        addressLine2: 'Barangay San Antonio',
        barangay: 'San Antonio',
        city: 'Pasig City',
        province: 'Metro Manila',
        region: 'National Capital Region (NCR)',
        zipCode: '1600',
        country: 'Philippines',
        isActive: true,
      },
    });
  }

  let branchOffice = await prisma.office.findFirst({
    where: { name: 'Quezon City Branch' },
  });

  if (!branchOffice) {
    branchOffice = await prisma.office.create({
      data: {
        name: 'Quezon City Branch',
        branchName: 'QC Branch',
        description: 'Quezon City branch office',
        addressLine1: '456 EDSA',
        addressLine2: 'Barangay Kamuning',
        barangay: 'Kamuning',
        city: 'Quezon City',
        province: 'Metro Manila',
        region: 'National Capital Region (NCR)',
        zipCode: '1103',
        country: 'Philippines',
        isActive: true,
        phoneNumbers: {
          create: [
            {
              countryCode: '+63',
              number: '2-2345-6789',
              type: 'Main',
              isPrimary: true,
            },
          ],
        },
        emailAddresses: {
          create: [
            {
              email: 'qc@hris.local',
              type: 'Main',
              isPrimary: true,
            },
          ],
        },
      },
    });
  } else {
    // Update existing office
    branchOffice = await prisma.office.update({
      where: { id: branchOffice.id },
      data: {
        branchName: 'QC Branch',
        description: 'Quezon City branch office',
        addressLine1: '456 EDSA',
        addressLine2: 'Barangay Kamuning',
        barangay: 'Kamuning',
        city: 'Quezon City',
        province: 'Metro Manila',
        region: 'National Capital Region (NCR)',
        zipCode: '1103',
        country: 'Philippines',
        isActive: true,
      },
    });
  }

  // Seed Departments
  console.log('🏢 Seeding departments...');
  const itDept = await prisma.department.upsert({
    where: { code: 'IT' },
    update: {},
    create: {
      name: 'Information Technology',
      code: 'IT',
      description: 'IT Department',
      officeId: mainOffice.id,
      isActive: true,
    },
  });

  const hrDept = await prisma.department.upsert({
    where: { code: 'HR' },
    update: {},
    create: {
      name: 'Human Resources',
      code: 'HR',
      description: 'HR Department',
      officeId: mainOffice.id,
      isActive: true,
    },
  });

  // Create sub-departments
  const itSupportDept = await prisma.department.upsert({
    where: { code: 'IT-SUPPORT' },
    update: {},
    create: {
      name: 'IT Support',
      code: 'IT-SUPPORT',
      description: 'IT Support sub-department',
      parentDepartmentId: itDept.id,
      officeId: mainOffice.id,
      isActive: true,
    },
  });

  const hrRecruitmentDept = await prisma.department.upsert({
    where: { code: 'HR-RECRUIT' },
    update: {},
    create: {
      name: 'HR Recruitment',
      code: 'HR-RECRUIT',
      description: 'HR Recruitment sub-department',
      parentDepartmentId: hrDept.id,
      officeId: branchOffice.id,
      isActive: true,
    },
  });

  // Seed Designations
  console.log('📋 Seeding designations...');
  const managerDesignation = await prisma.designation.upsert({
    where: { code: 'MGR' },
    update: {},
    create: {
      title: 'Manager',
      code: 'MGR',
      description: 'Management position',
      level: 3,
      isActive: true,
    },
  });

  const developerDesignation = await prisma.designation.upsert({
    where: { code: 'DEV' },
    update: {},
    create: {
      title: 'Software Developer',
      code: 'DEV',
      description: 'Developer position',
      level: 2,
      isActive: true,
    },
  });

  // Assign permissions to designations
  console.log('🔐 Assigning permissions to designations...');
  
  // Manager gets all permissions (full access)
  const allPermissionsForManager = await prisma.permission.findMany();
  for (const permission of allPermissionsForManager) {
    await prisma.designationPermission.upsert({
      where: {
        designationId_permissionId: {
          designationId: managerDesignation.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        designationId: managerDesignation.id,
        permissionId: permission.id,
      },
    });
  }

  // Developer gets read and create permissions for most modules, but limited for system administration
  const developerPermissions = allPermissionsForManager.filter((p) => {
    // Full access to IT-related modules
    if (['e_payroll', 'personnel_information_management', 'timekeeping_attendance'].includes(p.resource)) {
      return ['read', 'create', 'update'].includes(p.action);
    }
    // Read-only for other modules except system administration
    if (p.resource !== 'system_administration') {
      return p.action === 'read' || p.action === 'create';
    }
    // No access to system administration
    return false;
  });

  for (const permission of developerPermissions) {
    await prisma.designationPermission.upsert({
      where: {
        designationId_permissionId: {
          designationId: developerDesignation.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        designationId: developerDesignation.id,
        permissionId: permission.id,
      },
    });
  }

  // Seed Leave Types (Philippine Government Standard)
  console.log('🏖️ Seeding leave types...');
  await prisma.leaveType.upsert({
    where: { code: 'VL' },
    update: {},
    create: {
      name: 'Vacation Leave',
      code: 'VL',
      description: 'Vacation leave (15 days per year for government employees)',
      daysPerYear: 15,
      isCarryForward: true,
      maxCarryForward: 10,
      requiresApproval: true,
      isActive: true,
    },
  });

  await prisma.leaveType.upsert({
    where: { code: 'SL' },
    update: {},
    create: {
      name: 'Sick Leave',
      code: 'SL',
      description: 'Sick leave (15 days per year for government employees)',
      daysPerYear: 15,
      isCarryForward: true,
      maxCarryForward: 15,
      requiresApproval: true,
      isActive: true,
    },
  });

  await prisma.leaveType.upsert({
    where: { code: 'EL' },
    update: {},
    create: {
      name: 'Emergency Leave',
      code: 'EL',
      description: 'Emergency leave (5 days per year)',
      daysPerYear: 5,
      isCarryForward: false,
      maxCarryForward: 0,
      requiresApproval: true,
      isActive: true,
    },
  });

  await prisma.leaveType.upsert({
    where: { code: 'ML' },
    update: {},
    create: {
      name: 'Maternity Leave',
      code: 'ML',
      description: 'Maternity leave (105 days for female employees)',
      daysPerYear: 105,
      isCarryForward: false,
      maxCarryForward: 0,
      requiresApproval: true,
      isActive: true,
    },
  });

  await prisma.leaveType.upsert({
    where: { code: 'PL' },
    update: {},
    create: {
      name: 'Paternity Leave',
      code: 'PL',
      description: 'Paternity leave (7 days for male employees)',
      daysPerYear: 7,
      isCarryForward: false,
      maxCarryForward: 0,
      requiresApproval: true,
      isActive: true,
    },
  });

  await prisma.leaveType.upsert({
    where: { code: 'SOL' },
    update: {},
    create: {
      name: 'Solo Parent Leave',
      code: 'SOL',
      description: 'Solo parent leave (7 days per year)',
      daysPerYear: 7,
      isCarryForward: false,
      maxCarryForward: 0,
      requiresApproval: true,
      isActive: true,
    },
  });

  // Seed Employees with Philippine Government Data
  console.log('👷 Seeding employees...');
  const adminEmployee = await prisma.employee.upsert({
    where: { employeeNumber: 'EMP-2024-001' },
    update: {},
    create: {
      employeeNumber: 'EMP-2024-001',
      userId: adminUser.id,
      departmentId: itDept.id,
      designationId: managerDesignation.id,
      officeId: mainOffice.id,
      
      // Philippine Government ID Numbers
      tin: '123-456-789-000',
      sssNumber: '34-1234567-0',
      philhealthNumber: '12-345678901-2',
      pagibigNumber: '1212-3456-7890',
      gsisNumber: 'GSIS-123456789',
      cscIdNumber: 'CSC-2024-001234',
      
      // Personal Information
      dateOfBirth: new Date('1985-05-15'),
      placeOfBirth: 'Manila, Metro Manila',
      gender: 'MALE',
      maritalStatus: 'MARRIED',
      nationality: 'Filipino',
      citizenship: 'Filipino',
      bloodType: 'O+',
      height: 170.5,
      weight: 75.0,
      religion: 'Roman Catholic',
      
      // Philippine Address - Permanent
      permanentAddressLine1: '123 Rizal Street',
      permanentAddressLine2: 'Barangay San Antonio',
      permanentBarangay: 'San Antonio',
      permanentCity: 'Pasig City',
      permanentProvince: 'Metro Manila',
      permanentRegion: 'National Capital Region (NCR)',
      permanentZipCode: '1600',
      
      // Present Address (same as permanent)
      presentAddressLine1: '123 Rizal Street',
      presentAddressLine2: 'Barangay San Antonio',
      presentBarangay: 'San Antonio',
      presentCity: 'Pasig City',
      presentProvince: 'Metro Manila',
      presentRegion: 'National Capital Region (NCR)',
      presentZipCode: '1600',
      
      // Legacy address fields
      address: '123 Rizal Street, Barangay San Antonio',
      city: 'Pasig City',
      state: 'Metro Manila',
      zipCode: '1600',
      country: 'Philippines',
      
      // Emergency Contact
      emergencyContactName: 'Maria Dela Cruz',
      emergencyContactRelationship: 'Spouse',
      emergencyContactNumber: '+639171234570',
      emergencyContactAddress: '123 Rizal Street, Pasig City',
      
      // Family Information
      spouseName: 'Maria Dela Cruz',
      spouseOccupation: 'Teacher',
      spouseEmployer: 'DepEd',
      spouseContactNumber: '+639171234570',
      numberOfDependents: 2,
      
      // Civil Service Eligibility
      civilServiceEligibility: 'Career Service Professional',
      eligibilityRating: '87.50',
      eligibilityDate: new Date('2010-03-15'),
      eligibilityPlace: 'Manila',
      
      // Employment Information
      hireDate: new Date('2020-01-15'),
      employmentType: 'FULL_TIME',
      employmentStatus: 'ACTIVE',
      
      // Compensation (Philippine Peso)
      baseSalary: 50000.00,
      currency: 'PHP',
      salaryGrade: 18,
      stepIncrement: 3,
    },
  });

  const hrEmployee = await prisma.employee.upsert({
    where: { employeeNumber: 'EMP-2024-002' },
    update: {},
    create: {
      employeeNumber: 'EMP-2024-002',
      userId: hrUser.id,
      departmentId: hrDept.id,
      designationId: managerDesignation.id,
      officeId: mainOffice.id,
      
      // Philippine Government ID Numbers
      tin: '234-567-890-000',
      sssNumber: '34-2345678-0',
      philhealthNumber: '23-456789012-3',
      pagibigNumber: '1212-3456-7891',
      gsisNumber: 'GSIS-234567890',
      cscIdNumber: 'CSC-2024-002345',
      
      // Personal Information
      dateOfBirth: new Date('1988-08-20'),
      placeOfBirth: 'Quezon City, Metro Manila',
      gender: 'FEMALE',
      maritalStatus: 'MARRIED',
      nationality: 'Filipino',
      citizenship: 'Filipino',
      bloodType: 'A+',
      height: 160.0,
      weight: 60.0,
      religion: 'Roman Catholic',
      
      // Philippine Address
      permanentAddressLine1: '456 EDSA',
      permanentAddressLine2: 'Barangay Kamuning',
      permanentBarangay: 'Kamuning',
      permanentCity: 'Quezon City',
      permanentProvince: 'Metro Manila',
      permanentRegion: 'National Capital Region (NCR)',
      permanentZipCode: '1103',
      
      presentAddressLine1: '456 EDSA',
      presentAddressLine2: 'Barangay Kamuning',
      presentBarangay: 'Kamuning',
      presentCity: 'Quezon City',
      presentProvince: 'Metro Manila',
      presentRegion: 'National Capital Region (NCR)',
      presentZipCode: '1103',
      
      address: '456 EDSA, Barangay Kamuning',
      city: 'Quezon City',
      state: 'Metro Manila',
      zipCode: '1103',
      country: 'Philippines',
      
      // Emergency Contact
      emergencyContactName: 'Juan Santos',
      emergencyContactRelationship: 'Spouse',
      emergencyContactNumber: '+639171234571',
      emergencyContactAddress: '456 EDSA, Quezon City',
      
      // Family Information
      spouseName: 'Juan Santos',
      spouseOccupation: 'Engineer',
      spouseEmployer: 'DPWH',
      spouseContactNumber: '+639171234571',
      numberOfDependents: 1,
      
      // Civil Service Eligibility
      civilServiceEligibility: 'Career Service Professional',
      eligibilityRating: '89.25',
      eligibilityDate: new Date('2012-06-20'),
      eligibilityPlace: 'Quezon City',
      
      // Employment Information
      hireDate: new Date('2021-03-01'),
      employmentType: 'FULL_TIME',
      employmentStatus: 'ACTIVE',
      
      // Compensation
      baseSalary: 45000.00,
      currency: 'PHP',
      salaryGrade: 16,
      stepIncrement: 2,
    },
  });

  const regularEmployee = await prisma.employee.upsert({
    where: { employeeNumber: 'EMP-2024-003' },
    update: {},
    create: {
      employeeNumber: 'EMP-2024-003',
      userId: employeeUser.id,
      departmentId: itDept.id,
      designationId: developerDesignation.id,
      managerId: adminEmployee.id, // Admin is the manager
      officeId: mainOffice.id,
      
      // Philippine Government ID Numbers
      tin: '345-678-901-000',
      sssNumber: '34-3456789-0',
      philhealthNumber: '34-567890123-4',
      pagibigNumber: '1212-3456-7892',
      
      // Personal Information
      dateOfBirth: new Date('1995-12-10'),
      placeOfBirth: 'Makati City, Metro Manila',
      gender: 'MALE',
      maritalStatus: 'SINGLE',
      nationality: 'Filipino',
      citizenship: 'Filipino',
      bloodType: 'B+',
      height: 175.0,
      weight: 70.0,
      religion: 'Roman Catholic',
      
      // Philippine Address
      permanentAddressLine1: '789 Ayala Avenue',
      permanentAddressLine2: 'Barangay Bel-Air',
      permanentBarangay: 'Bel-Air',
      permanentCity: 'Makati City',
      permanentProvince: 'Metro Manila',
      permanentRegion: 'National Capital Region (NCR)',
      permanentZipCode: '1209',
      
      presentAddressLine1: '789 Ayala Avenue',
      presentAddressLine2: 'Barangay Bel-Air',
      presentBarangay: 'Bel-Air',
      presentCity: 'Makati City',
      presentProvince: 'Metro Manila',
      presentRegion: 'National Capital Region (NCR)',
      presentZipCode: '1209',
      
      address: '789 Ayala Avenue, Barangay Bel-Air',
      city: 'Makati City',
      state: 'Metro Manila',
      zipCode: '1209',
      country: 'Philippines',
      
      // Emergency Contact
      emergencyContactName: 'Ana Garcia',
      emergencyContactRelationship: 'Parent',
      emergencyContactNumber: '+639171234572',
      emergencyContactAddress: '789 Ayala Avenue, Makati City',
      
      // Family Information
      numberOfDependents: 0,
      
      // Civil Service Eligibility
      civilServiceEligibility: 'Career Service Professional',
      eligibilityRating: '85.75',
      eligibilityDate: new Date('2018-09-10'),
      eligibilityPlace: 'Makati City',
      
      // Employment Information
      hireDate: new Date('2023-06-01'),
      employmentType: 'FULL_TIME',
      employmentStatus: 'ACTIVE',
      
      // Compensation
      baseSalary: 35000.00,
      currency: 'PHP',
      salaryGrade: 12,
      stepIncrement: 1,
    },
  });

  // Update departments to assign department heads
  await prisma.department.update({
    where: { id: itDept.id },
    data: {
      departmentHeadId: adminEmployee.id,
    },
  });

  await prisma.department.update({
    where: { id: hrDept.id },
    data: {
      departmentHeadId: hrEmployee.id,
    },
  });

  // Seed Dependents for Admin Employee
  console.log('👨‍👩‍👧 Seeding dependents...');
  await prisma.dependent.createMany({
    data: [
      {
        employeeId: adminEmployee.id,
        firstName: 'Juan',
        lastName: 'Dela Cruz',
        middleName: 'Jr.',
        relationship: 'Child',
        dateOfBirth: new Date('2015-03-20'),
        isStudent: true,
        schoolName: 'Pasig Elementary School',
      },
      {
        employeeId: adminEmployee.id,
        firstName: 'Maria',
        lastName: 'Dela Cruz',
        middleName: 'Jr.',
        relationship: 'Child',
        dateOfBirth: new Date('2018-07-15'),
        isStudent: true,
        schoolName: 'Pasig Elementary School',
      },
    ],
    skipDuplicates: true,
  });

  // Seed Educational Background
  console.log('🎓 Seeding educational background...');
  await prisma.educationalBackground.createMany({
    data: [
      {
        employeeId: adminEmployee.id,
        level: "Elementary",
        schoolName: 'Pasig Elementary School',
        yearGraduated: 1997,
      },
      {
        employeeId: adminEmployee.id,
        level: "Secondary",
        schoolName: 'Pasig City Science High School',
        yearGraduated: 2001,
        honorsAwards: 'With Honors',
      },
      {
        employeeId: adminEmployee.id,
        level: "Bachelor's",
        schoolName: 'University of the Philippines',
        course: 'Bachelor of Science in Computer Science',
        yearGraduated: 2005,
        honorsAwards: 'Cum Laude',
      },
      {
        employeeId: hrEmployee.id,
        level: "Elementary",
        schoolName: 'Quezon City Elementary School',
        yearGraduated: 2000,
      },
      {
        employeeId: hrEmployee.id,
        level: "Secondary",
        schoolName: 'Quezon City Science High School',
        yearGraduated: 2004,
        honorsAwards: 'With High Honors',
      },
      {
        employeeId: hrEmployee.id,
        level: "Bachelor's",
        schoolName: 'Ateneo de Manila University',
        course: 'Bachelor of Science in Psychology',
        yearGraduated: 2008,
        honorsAwards: 'Magna Cum Laude',
      },
      {
        employeeId: regularEmployee.id,
        level: "Elementary",
        schoolName: 'Makati Elementary School',
        yearGraduated: 2008,
      },
      {
        employeeId: regularEmployee.id,
        level: "Secondary",
        schoolName: 'Makati Science High School',
        yearGraduated: 2012,
        honorsAwards: 'With Honors',
      },
      {
        employeeId: regularEmployee.id,
        level: "Bachelor's",
        schoolName: 'De La Salle University',
        course: 'Bachelor of Science in Information Technology',
        yearGraduated: 2016,
      },
    ],
    skipDuplicates: true,
  });

  // Seed Previous Employment
  console.log('💼 Seeding previous employment...');
  await prisma.previousEmployment.createMany({
    data: [
      {
        employeeId: adminEmployee.id,
        employerName: 'Department of Information and Communications Technology',
        position: 'Senior Software Developer',
        dateStarted: new Date('2010-06-01'),
        dateEnded: new Date('2019-12-31'),
        isPresentJob: false,
        reasonForLeaving: 'Career advancement',
        salary: 45000.00,
      },
      {
        employeeId: hrEmployee.id,
        employerName: 'Civil Service Commission',
        position: 'HR Assistant',
        dateStarted: new Date('2013-01-15'),
        dateEnded: new Date('2021-02-28'),
        isPresentJob: false,
        reasonForLeaving: 'Better opportunity',
        salary: 35000.00,
      },
    ],
    skipDuplicates: true,
  });

  // Seed Character References
  console.log('📝 Seeding character references...');
  await prisma.characterReference.createMany({
    data: [
      {
        employeeId: adminEmployee.id,
        name: 'Dr. Roberto Santos',
        position: 'Professor',
        company: 'University of the Philippines',
        contactNumber: '+639171234573',
        email: 'roberto.santos@up.edu.ph',
        relationship: 'Former Professor',
      },
      {
        employeeId: adminEmployee.id,
        name: 'Engr. Maria Lopez',
        position: 'Department Head',
        company: 'Department of Information and Communications Technology',
        contactNumber: '+639171234574',
        email: 'maria.lopez@dict.gov.ph',
        relationship: 'Former Supervisor',
      },
      {
        employeeId: hrEmployee.id,
        name: 'Atty. Jose Reyes',
        position: 'Director',
        company: 'Civil Service Commission',
        contactNumber: '+639171234575',
        email: 'jose.reyes@csc.gov.ph',
        relationship: 'Former Supervisor',
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

