import { Router } from 'express';
import PermissionsController from '../controllers/PermissionsController';
import { Joi, celebrate, Segments } from 'celebrate';
import { is } from '@shared/http/middlewares/permissions';
const permissionRouter = Router();
const controller = new PermissionsController();

permissionRouter.get('/', is(['_IS_ADMIN_']), controller.index);

permissionRouter.post(
  '/create',
  is(['_IS_ADMIN_']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
    },
  }),
  controller.create,
);

permissionRouter.put(
  '/update/:id',
  is(['_IS_ADMIN_']),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),

    [Segments.BODY]: {
      name: Joi.string(),
      description: Joi.string(),
    },
  }),
  controller.update,
);

permissionRouter.delete(
  '/delete/:id',
  is(['_IS_ADMIN_']),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  controller.delete,
);

export default permissionRouter;
