import { prisma } from '@hris/database';
import { UserRepository } from './user.repository';
import { RoleRepository } from './role.repository';
import { PermissionRepository } from './permission.repository';
import { ModuleRepository } from './module.repository';
import { OrganizationRepository } from './organization.repository';
import { OfficeRepository } from './office.repository';
import { DepartmentRepository } from './department.repository';
import { DesignationRepository } from './designation.repository';
import { EmploymentTypeRepository } from './employment-type.repository';
import { GradeRepository } from './grade.repository';
import { LeaveTypeRepository } from './leave-type.repository';
import { LeavePolicyRepository } from './leave-policy.repository';
import { OvertimePolicyRepository } from './overtime-policy.repository';
import { PayrollConfigRepository } from './payroll-config.repository';
import { ShiftRepository } from './shift.repository';
import { GraceTimeRepository } from './grace-time.repository';
import { ExpenseAccountRepository } from './expense-account.repository';
import { HolidayRepository } from './holiday.repository';
import { EmployerTaxableComponentRepository } from './employer-taxable-component.repository';

// Create singleton instances
export const userRepository = new UserRepository(prisma);
export const roleRepository = new RoleRepository(prisma);
export const permissionRepository = new PermissionRepository(prisma);
export const moduleRepository = new ModuleRepository(prisma);
export const organizationRepository = new OrganizationRepository(prisma);
export const officeRepository = new OfficeRepository(prisma);
export const departmentRepository = new DepartmentRepository(prisma);
export const designationRepository = new DesignationRepository(prisma);
export const employmentTypeRepository = new EmploymentTypeRepository(prisma);
export const gradeRepository = new GradeRepository(prisma);
export const leaveTypeRepository = new LeaveTypeRepository(prisma);
export const leavePolicyRepository = new LeavePolicyRepository(prisma);
export const overtimePolicyRepository = new OvertimePolicyRepository(prisma);
export const payrollConfigRepository = new PayrollConfigRepository(prisma);
export const shiftRepository = new ShiftRepository(prisma);
export const graceTimeRepository = new GraceTimeRepository(prisma);
export const expenseAccountRepository = new ExpenseAccountRepository(prisma);
export const holidayRepository = new HolidayRepository(prisma);
export const employerTaxableComponentRepository = new EmployerTaxableComponentRepository(prisma);

// Export repositories for dependency injection if needed
export { 
  UserRepository, 
  RoleRepository, 
  PermissionRepository, 
  ModuleRepository, 
  OrganizationRepository, 
  OfficeRepository, 
  DepartmentRepository,
  DesignationRepository,
  EmploymentTypeRepository,
  GradeRepository,
  LeaveTypeRepository,
  LeavePolicyRepository,
  OvertimePolicyRepository,
  PayrollConfigRepository,
  ShiftRepository,
  GraceTimeRepository,
  ExpenseAccountRepository,
  HolidayRepository,
  EmployerTaxableComponentRepository,
};

