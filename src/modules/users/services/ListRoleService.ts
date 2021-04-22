import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { Roles } from '../typeorm/entities/Roles';
import { RolesRepository } from '../typeorm/repositories/RolesRepository';

export default class ListRoleService {
  public async execute(): Promise<Roles[]> {
    const repository: RolesRepository = getCustomRepository(RolesRepository);

    const roles = await repository.find();

    if (!roles) throw new ApplicationError('No roles were found');

    return roles;
  }
}
