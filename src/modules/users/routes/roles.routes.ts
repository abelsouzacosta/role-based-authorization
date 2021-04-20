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

export default roleRouter;
