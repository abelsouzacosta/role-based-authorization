import { Request, Response } from 'express';
import AddPermissionToRoleService from '../services/AddPermissionToRoleService';
import CreateRoleService from '../services/CreateRoleService';

export default class RolesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const create = new CreateRoleService();

    const role = await create.execute({ name, description });

    return res.status(200).json(role);
  }

  public async addPermissions(req: Request, res: Response): Promise<Response> {
    const { role_id, permissions } = req.body;

    const add = new AddPermissionToRoleService();

    const role = await add.execute({ role_id, permissions });

    return res.status(200).json(role);
  }
}
