export interface PermissionCheck {
  hasPermission: boolean;
  missing?: string[];
}

export interface UserPermissions {
  moduleAccess: Record<string, boolean>;
  permissions: string[];
  roles: string[];
}

export type PermissionAction = 
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'approve'
  | 'reject'
  | 'export'
  | 'import';

export type PermissionResource = 
  | 'employee'
  | 'payroll'
  | 'leave'
  | 'attendance'
  | 'performance'
  | 'job'
  | 'application'
  | 'report'
  | 'role'
  | 'permission'
  | 'user'
  | 'module';

