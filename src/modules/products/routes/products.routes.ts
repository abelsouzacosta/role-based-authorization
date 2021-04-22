import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productRouter = Router();
const controller = new ProductsController();

productRouter.get('/', controller.index);
productRouter.post('/create', controller.create);
productRouter.put('/update', controller.update);

export default productRouter;
