import { Router, type IRouter } from 'express';
import { RbacController } from './rbac.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { requirePermission } from '../../middleware/permission.middleware';

const router: IRouter = Router();
const controller = new RbacController();

// All routes require authentication
router.use(authenticate);

// Roles
router.post('/roles', requirePermission('system-administration:create'), controller.createRole);
router.get('/roles', requirePermission('system-administration:read'), controller.getRoles);
router.get('/roles/:id', requirePermission('system-administration:read'), controller.getRoleById);
router.delete('/roles/:id', requirePermission('system-administration:delete'), controller.deleteRole);

// Permissions
router.post('/permissions', requirePermission('system-administration:create'), controller.createPermission);
router.get('/permissions', requirePermission('system-administration:read'), controller.getPermissions);

// Assign permissions to role
router.post('/roles/:roleId/permissions', requirePermission('system-administration:update'), controller.assignPermissionsToRole);
router.post('/roles/:roleId/modules', requirePermission('system-administration:update'), controller.assignModulesToRole);

// User role assignment
router.post('/users/:userId/roles', requirePermission('system-administration:update'), controller.assignRolesToUser);
router.get('/users/:userId/permissions', requirePermission('system-administration:read'), controller.getUserPermissions);

export default router;

