import { Router } from 'express';
import PermissionsController from '../controllers/PermissionsController';
import { Joi, celebrate, Segments } from 'celebrate';
const permissionRouter = Router();
const controller = new PermissionsController();

permissionRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
    },
  }),
  controller.create,
);

export default permissionRouter;
