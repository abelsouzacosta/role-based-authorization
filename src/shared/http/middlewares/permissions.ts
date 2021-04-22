import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import { Users } from '@modules/users/typeorm/entities/Users';
import { decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

async function decoder(req: Request): Promise<Users> {
  const repository: UsersRepository = getCustomRepository(UsersRepository);

  // capturando o header de autorização
  const authHeader = req.headers.authorization;

  // verifica se o header existe
  if (!authHeader) throw new ApplicationError('Token not provided');

  // separa o token
  const parts = authHeader.split(' ');

  // verifica se não tem apenas duas partes
  if (parts.length !== 2) throw new ApplicationError('Token mismatch');

  // captura as duas partes do token
  const [bearer, token] = parts;

  // verifica se o padrão é compatível
  if (!/^Bearer$/i.test(bearer))
    throw new ApplicationError('Token malformatted');

  // decode do payload do token
  const payload = decode(token);

  // busca pelo usuário no banco de dados
  const user = await repository.findOne(payload?.sub, {
    relations: ['roles'],
  });

  if (!user) throw new ApplicationError('Unauthorized');

  return user;
}

function is(role: string[]) {
  const roleAuthorized = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const user = await decoder(req);

    const userRoles = user.roles.map(role => role.name);

    const existsRole = userRoles.some(userRole => role.includes(userRole));

    if (!existsRole) throw new ApplicationError('Unauthorized');

    next();
  };

  return roleAuthorized;
}

export { is };
