import { Request, Response } from 'express';
import CreatePermissionService from '../services/CreatePermissionService';

export default class PermissionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const create = new CreatePermissionService();

    const permission = await create.execute({ name, description });

    return res.status(200).json(permission);
  }
}
