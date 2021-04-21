import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const userRouter = Router();
const controller = new UsersController();

userRouter.post(
  '/create',
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
  '/add_roles',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      roles: Joi.required(),
    },
  }),
  controller.addRoles,
);

export default userRouter;
