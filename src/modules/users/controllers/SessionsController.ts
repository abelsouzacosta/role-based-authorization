import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const session = new CreateSessionService();

    const user_token = await session.execute({ username, password });

    return res.status(200).json(classToClass(user_token));
  }
}
