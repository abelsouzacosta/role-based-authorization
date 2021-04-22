import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { Roles } from '../typeorm/entities/Roles';
import { RolesRepository } from '../typeorm/repositories/RolesRepository';

interface IRequest {
  id: string;
  name: string;
  description: string;
}

export default class UpdateRoleService {
  public async execute({ id, name, description }: IRequest): Promise<Roles> {
    const repository: RolesRepository = getCustomRepository(RolesRepository);

    // busca o role pelo nome
    const role = await repository.findById(id);

    if (!role) throw new ApplicationError('Role not found');

    // busca o role pelo nome
    const roleByName = await repository.findByName(name);

    if (roleByName && roleByName.id !== role.id)
      throw new ApplicationError('This role already exists');

    role.name = name;
    role.description = description;

    await repository.save(role);

    return role;
  }
}
