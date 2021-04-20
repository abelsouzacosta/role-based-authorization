import { Request, Response } from 'express';
import CreateRoleService from '../services/CreateRoleService';

export default class RolesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const create = new CreateRoleService();

    const role = await create.execute({ name, description });

    return res.status(200).json(role);
  }
}
