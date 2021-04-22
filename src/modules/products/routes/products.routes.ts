import { is } from '@shared/http/middlewares/permissions';
import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { Joi, Segments, celebrate } from 'celebrate';

const productRouter = Router();
const controller = new ProductsController();

productRouter.get('/', is(['_IS_USER_']), controller.index);

productRouter.post(
  '/create',
  is(['_IS_ADMIN_']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  controller.create,
);

productRouter.put(
  '/:id/update',
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

productRouter.delete(
  '/:id/delete/',
  is(['_IS_ADMIN_']),
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  controller.delete,
);

export default productRouter;
