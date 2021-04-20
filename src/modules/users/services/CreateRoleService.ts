import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { RolesRepository } from '../typeorm/repositories/RolesRepository';
import { Roles } from '../typeorm/entities/Roles';

interface IRequest {
  name: string;
  description: string;
}

export default class CreateRoleService {
  public async execute({ name, description }: IRequest): Promise<Roles> {
    const repository: RolesRepository = getCustomRepository(RolesRepository);

    // verifica se o role já existe
    const roleAlreadyExists = await repository.findByName(name);

    if (roleAlreadyExists) throw new ApplicationError('Role already exists');

    // cria a role
    const role = repository.create({
      name,
      description,
    });

    await repository.save(role);

    return role;
  }
}
