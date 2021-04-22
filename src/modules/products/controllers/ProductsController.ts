import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import ListProductService from '../services/ListProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductController {
  public async index(req: Request, res: Response): Promise<Response> {
    const list = new ListProductService();

    const products = await list.execute();

    return res.status(200).json(products);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const create = new CreateProductService();

    const product = await create.execute({ name, description });

    return res.status(200).json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, description } = req.body;

    const update = new UpdateProductService();

    const product = await update.execute({ id, name, description });

    return res.status(200).json(product);
  }
}
