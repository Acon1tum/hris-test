import { Router, type IRouter } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import rbacRoutes from '../modules/rbac/rbac.routes';

const router: IRouter = Router();

// Auth routes (no authentication required)
router.use('/auth', authRoutes);

// RBAC routes (authentication required)
router.use('/rbac', rbacRoutes);

export default router;

