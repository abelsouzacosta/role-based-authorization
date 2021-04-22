import { Router } from 'express';
import RolesController from '../controllers/RolesController';
import { celebrate, Joi, Segments } from 'celebrate';
import { is } from '@shared/http/middlewares/permissions';

const roleRouter = Router();
const controller = new RolesController();

roleRouter.get('/', is(['_IS_ADMIN_']), controller.index);

roleRouter.post(
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

roleRouter.put(
  '/update',
  is(['_IS_ADMIN_']),
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string(),
      description: Joi.string(),
    },
  }),
  controller.update,
);

roleRouter.delete(
  '/delete/:id',
  is(['_IS_ADMIN_']),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  controller.delete,
);

roleRouter.post(
  '/add_permission/:role_id',
  is(['_IS_ADMIN_']),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      role_id: Joi.string().required(),
    }),

    [Segments.BODY]: {
      permissions: Joi.required(),
    },
  }),
  controller.addPermissions,
);

export default roleRouter;
