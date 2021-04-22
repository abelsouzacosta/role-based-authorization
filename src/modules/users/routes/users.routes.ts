import { is } from '@shared/http/middlewares/permissions';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const userRouter = Router();
const controller = new UsersController();

userRouter.get('/', is(['_IS_ADMIN_']), controller.index);

userRouter.post(
  '/create',
  is(['_IS_USER_']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      password_confirm: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  controller.create,
);

userRouter.post(
  '/:user_id/add_roles',
  is(['_IS_ADMIN_']),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      user_id: Joi.string().required(),
    }),

    [Segments.BODY]: {
      roles: Joi.required(),
    },
  }),
  controller.addRoles,
);

export default userRouter;
