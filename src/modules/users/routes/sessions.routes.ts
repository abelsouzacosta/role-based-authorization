import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { Joi, celebrate, Segments } from 'celebrate';

const sessionRouter = Router();
const sessionController = new SessionsController();

sessionRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionRouter;
