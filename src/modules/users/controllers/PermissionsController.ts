import { Request, Response } from 'express';
import CreatePermissionService from '../services/permissions/CreatePermissionService';
import DeletePermissionService from '../services/permissions/DeletePermissionService';
import ListPermissionService from '../services/permissions/ListPermissionService';
import UpdatePermissionService from '../services/permissions/UpdatePermissionService';

export default class PermissionsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const list = new ListPermissionService();

    const permissions = await list.execute();

    return res.status(200).json(permissions);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const create = new CreatePermissionService();

    const permission = await create.execute({ name, description });

    return res.status(200).json(permission);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description } = req.body;

    const update = new UpdatePermissionService();

    const permission = await update.execute({ id, name, description });

    return res.status(200).json(permission);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const remove = new DeletePermissionService();

    await remove.execute({ id });

    return res.status(200).json({
      ok: 'Permission removed',
    });
  }
}
