import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { Users } from '../typeorm/entities/Users';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  token: string;
  user: Users;
}

export default class CreateSessionService {
  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const repository: UsersRepository = getCustomRepository(UsersRepository);

    // verifica se o usuário existe
    const user = await repository.findByUsername(username);

    if (!user) throw new ApplicationError('User not found');

    // verifica se o password foi digitado corretamente
    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) throw new ApplicationError('Incorrect Password');

    // gera o token do usuário
    const token = sign({}, String(auth.jwt.secret), {
      subject: user.id,
      expiresIn: 86400,
    });

    return {
      token,
      user,
    };
  }
}
