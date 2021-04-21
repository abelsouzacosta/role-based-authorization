import { Router } from 'express';
import RolesController from '../controllers/RolesController';
import { celebrate, Joi, Segments } from 'celebrate';

const roleRouter = Router();
const controller = new RolesController();

roleRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
    },
  }),
  controller.create,
);

roleRouter.post(
  '/add_permission',
  celebrate({
    [Segments.BODY]: {
      role_id: Joi.string().required(),
      permissions: Joi.required(),
    },
  }),
  controller.addPermissions,
);

export default roleRouter;
