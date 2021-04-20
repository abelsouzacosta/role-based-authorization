import permissionRouter from '@modules/users/routes/permissions.routes';
import roleRouter from '@modules/users/routes/roles.routes';
import sessionRouter from '@modules/users/routes/sessions.routes';
import userRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).send({ message: 'Olá mundo' });
});

router.use('/users', userRouter);
router.use('/session', sessionRouter);
router.use('/permission', permissionRouter);
router.use('/role', roleRouter);

export default router;
