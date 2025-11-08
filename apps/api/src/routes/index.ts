import { Router, type IRouter } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import rbacRoutes from '../modules/rbac/rbac.routes';
import organizationRoutes from '../modules/organization/organization.routes';
import officeRoutes from '../modules/office/office.routes';
import departmentRoutes from '../modules/department/department.routes';
import designationRoutes from '../modules/designation/designation.routes';
import employmentTypeRoutes from '../modules/employment-type/employment-type.routes';
import gradeRoutes from '../modules/grade/grade.routes';
import leaveTypeRoutes from '../modules/leave-type/leave-type.routes';
import leavePolicyRoutes from '../modules/leave-policy/leave-policy.routes';
import overtimePolicyRoutes from '../modules/overtime-policy/overtime-policy.routes';
import payrollConfigRoutes from '../modules/payroll-config/payroll-config.routes';
import shiftRoutes from '../modules/shift/shift.routes';
import graceTimeRoutes from '../modules/grace-time/grace-time.routes';
import expenseAccountRoutes from '../modules/expense-account/expense-account.routes';
import holidayRoutes from '../modules/holiday/holiday.routes';
import employerTaxableComponentRoutes from '../modules/employer-taxable-component/employer-taxable-component.routes';

const router: IRouter = Router();

// Auth routes (no authentication required)
router.use('/auth', authRoutes);

// RBAC routes (authentication required)
router.use('/rbac', rbacRoutes);

// Organization routes (authentication required)
router.use('/organizations', organizationRoutes);

// Office routes (authentication required)
router.use('/offices', officeRoutes);

// Department routes (authentication required)
router.use('/departments', departmentRoutes);

// Designation routes (authentication required)
router.use('/designations', designationRoutes);

// Employment Type routes (authentication required)
router.use('/employment-types', employmentTypeRoutes);

// Grade routes (authentication required)
router.use('/grades', gradeRoutes);

// Leave Type routes (authentication required)
router.use('/leave-types', leaveTypeRoutes);

// Leave Policy routes (authentication required)
router.use('/leave-policies', leavePolicyRoutes);

// Overtime Policy routes (authentication required)
router.use('/overtime-policies', overtimePolicyRoutes);

// Payroll Config routes (authentication required)
router.use('/payroll-configs', payrollConfigRoutes);

// Shift routes (authentication required)
router.use('/shifts', shiftRoutes);

// Grace Time routes (authentication required)
router.use('/grace-times', graceTimeRoutes);

// Expense Account routes (authentication required)
router.use('/expense-accounts', expenseAccountRoutes);

// Holiday routes (authentication required)
router.use('/holidays', holidayRoutes);

// Employer Taxable Component routes (authentication required)
router.use('/employer-taxable-components', employerTaxableComponentRoutes);

export default router;

