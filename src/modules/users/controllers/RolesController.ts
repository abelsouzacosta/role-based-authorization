import { Request, Response } from 'express';
import AddPermissionToRoleService from '../services/AddPermissionToRoleService';
import CreateRoleService from '../services/CreateRoleService';
import DeleteRoleService from '../services/DeleteRoleService';
import ListRoleService from '../services/ListRoleService';
import UpdateRoleService from '../services/UpdateRoleService';

export default class RolesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const list = new ListRoleService();

    const roles = await list.execute();

    return res.status(200).json(roles);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const create = new CreateRoleService();

    const role = await create.execute({ name, description });

    return res.status(200).json(role);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, description } = req.body;

    const update = new UpdateRoleService();

    const role = await update.execute({ id, name, description });

    return res.status(200).json(role);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const remove = new DeleteRoleService();

    await remove.execute({ id });

    return res.status(200).json({
      ok: 'Role removed',
    });
  }

  public async addPermissions(req: Request, res: Response): Promise<Response> {
    const { role_id } = req.params;
    const { permissions } = req.body;

    const add = new AddPermissionToRoleService();

    const role = await add.execute({ role_id, permissions });

    return res.status(200).json(role);
  }
}
