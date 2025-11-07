import { Router, type IRouter } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import rbacRoutes from '../modules/rbac/rbac.routes';
import organizationRoutes from '../modules/organization/organization.routes';
import officeRoutes from '../modules/office/office.routes';

const router: IRouter = Router();

// Auth routes (no authentication required)
router.use('/auth', authRoutes);

// RBAC routes (authentication required)
router.use('/rbac', rbacRoutes);

// Organization routes (authentication required)
router.use('/organizations', organizationRoutes);

// Office routes (authentication required)
router.use('/offices', officeRoutes);

export default router;

