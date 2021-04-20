import permissionRouter from '@modules/users/routes/permissions.routes';
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

export default router;
