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
      firstName: 'Admin',
      lastName: 'User',
      isActive: true,
    },
  });

  const hrUser = await prisma.user.upsert({
    where: { email: 'hr@hris.com' },
    update: {},
    create: {
      email: 'hr@hris.com',
      password: hashedPassword,
      firstName: 'HR',
      lastName: 'Manager',
      isActive: true,
    },
  });

  const employeeUser = await prisma.user.upsert({
    where: { email: 'employee@hris.com' },
    update: {},
    create: {
      email: 'employee@hris.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
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

  // Seed Departments
  console.log('🏢 Seeding departments...');
  const itDept = await prisma.department.upsert({
    where: { code: 'IT' },
    update: {},
    create: {
      name: 'Information Technology',
      code: 'IT',
      description: 'IT Department',
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

  // Seed Leave Types
  console.log('🏖️ Seeding leave types...');
  await prisma.leaveType.upsert({
    where: { code: 'AL' },
    update: {},
    create: {
      name: 'Annual Leave',
      code: 'AL',
      description: 'Annual vacation leave',
      daysPerYear: 15,
      carryForward: true,
      maxCarryForward: 5,
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
      description: 'Medical leave',
      daysPerYear: 10,
      carryForward: false,
      maxCarryForward: 0,
      requiresApproval: true,
      isActive: true,
    },
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

