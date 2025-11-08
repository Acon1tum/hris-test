import { Router, type IRouter } from 'express';
import { OvertimePolicyController } from './overtime-policy.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { requirePermission } from '../../middleware/permission.middleware';

const router: IRouter = Router();
const controller = new OvertimePolicyController();

router.use(authenticate);

router.post('/', requirePermission('system_administration:create'), controller.create);
router.get('/', requirePermission('system_administration:read'), controller.getAll);
router.get('/:id', requirePermission('system_administration:read'), controller.getById);
router.put('/:id', requirePermission('system_administration:update'), controller.update);
router.delete('/:id', requirePermission('system_administration:delete'), controller.delete);

export default router;


