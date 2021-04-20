import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, username, email, password } = req.body;

    const create = new CreateUserService();

    const user = await create.execute({ name, username, email, password });

    return res.status(200).json(classToClass(user));
  }
}
