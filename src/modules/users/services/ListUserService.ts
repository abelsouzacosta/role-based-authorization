import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { Users } from '../typeorm/entities/Users';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

export default class ListUserService {
  public async execute(): Promise<Users[]> {
    const repository: UsersRepository = getCustomRepository(UsersRepository);

    const users = await repository.find({
      relations: ['roles'],
    });

    if (!users) throw new ApplicationError('No users were found');

    return users;
  }
}
