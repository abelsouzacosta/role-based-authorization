import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateUserService from '../services/CreateUserService';
import AddRoleToUserService from '../services/users/AddRoleToUserService';
import ListUserService from '../services/users/ListUserService';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const list = new ListUserService();

    const users = await list.execute();

    return res.status(200).json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, username, email, password } = req.body;

    const create = new CreateUserService();

    const user = await create.execute({ name, username, email, password });

    return res.status(200).json(classToClass(user));
  }

  public async addRoles(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { roles } = req.body;

    const add = new AddRoleToUserService();

    const user = await add.execute({ user_id, roles });

    return res.status(200).json(user);
  }
}
