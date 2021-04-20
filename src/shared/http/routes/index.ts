import userRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).send({ message: 'Olá mundo' });
});

router.use('/users', userRouter);

export default router;
