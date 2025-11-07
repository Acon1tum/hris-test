export const API_ROUTES = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  // RBAC
  RBAC: {
    ROLES: '/rbac/roles',
    PERMISSIONS: '/rbac/permissions',
    ASSIGN_PERMISSIONS: '/rbac/roles/:roleId/permissions',
    ASSIGN_MODULES: '/rbac/roles/:roleId/modules',
    USER_ROLES: '/rbac/users/:userId/roles',
  },
  // Modules
  MODULES: {
    LIST: '/modules',
    TOGGLE: '/modules/:id/toggle',
  },
  // Employees
  EMPLOYEES: {
    LIST: '/employees',
    CREATE: '/employees',
    GET: '/employees/:id',
    UPDATE: '/employees/:id',
    DELETE: '/employees/:id',
  },
  // Payroll
  PAYROLL: {
    LIST: '/payroll',
    CREATE: '/payroll',
    GET: '/payroll/:id',
    PROCESS: '/payroll/process',
  },
  // Leave
  LEAVE: {
    LIST: '/leave',
    CREATE: '/leave',
    GET: '/leave/:id',
    APPROVE: '/leave/:id/approve',
    REJECT: '/leave/:id/reject',
  },
  // Attendance
  ATTENDANCE: {
    LIST: '/attendance',
    CLOCK_IN: '/attendance/clock-in',
    CLOCK_OUT: '/attendance/clock-out',
  },
} as const;

