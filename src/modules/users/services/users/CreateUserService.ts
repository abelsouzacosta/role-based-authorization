import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { Users } from '../../typeorm/entities/Users';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({
    name,
    username,
    email,
    password,
  }: IRequest): Promise<Users> {
    const repository: UsersRepository = getCustomRepository(UsersRepository);

    // verifica se o email já foi utilizado
    const findUserByEmail = await repository.findByEmail(email);

    if (findUserByEmail)
      throw new ApplicationError('This email are already been used');

    // verifica se o username já foi utilizado
    const findUserByUsername = await repository.findByUsername(username);

    if (findUserByUsername)
      throw new ApplicationError('This username are already been used');

    // faz o hash do password
    const hashedPassword = await hash(password, 10);

    // cria o usuário
    const user = await repository.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await repository.save(user);

    return user;
  }
}
