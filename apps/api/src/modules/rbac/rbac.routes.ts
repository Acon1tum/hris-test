import { Router, type IRouter } from 'express';
import { RbacController } from './rbac.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { requirePermission } from '../../middleware/permission.middleware';

const router: IRouter = Router();
const controller = new RbacController();

// All routes require authentication
router.use(authenticate);

// Roles
router.post('/roles', requirePermission('system_administration:create'), controller.createRole);
router.get('/roles', requirePermission('system_administration:read'), controller.getRoles);
router.get('/roles/:id', requirePermission('system_administration:read'), controller.getRoleById);
router.delete('/roles/:id', requirePermission('system_administration:delete'), controller.deleteRole);

// Permissions
router.post('/permissions', requirePermission('system_administration:create'), controller.createPermission);
router.get('/permissions', requirePermission('system_administration:read'), controller.getPermissions);

// Assign permissions to role
router.post('/roles/:roleId/permissions', requirePermission('system_administration:update'), controller.assignPermissionsToRole);
router.post('/roles/:roleId/modules', requirePermission('system_administration:update'), controller.assignModulesToRole);

// User role assignment
router.post('/users/:userId/roles', requirePermission('system_administration:update'), controller.assignRolesToUser);
router.get('/users/:userId/permissions', requirePermission('system_administration:read'), controller.getUserPermissions);

export default router;

