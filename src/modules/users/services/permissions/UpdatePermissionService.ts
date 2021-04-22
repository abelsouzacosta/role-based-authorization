import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { Permissions } from '../../typeorm/entities/Permissions';
import { PermissionsRepository } from '../../typeorm/repositories/PermissionsRepository';

interface IRequest {
  id: string;
  name: string;
  description: string;
}

export default class UpdatePermissionService {
  public async execute({
    id,
    name,
    description,
  }: IRequest): Promise<Permissions> {
    const repository: PermissionsRepository = getCustomRepository(
      PermissionsRepository,
    );

    // buscando pela permission
    const permission = await repository.findById(id);

    if (!permission) throw new ApplicationError('Permission not found');

    // buscando pelo nome da permission
    const permissionByName = await repository.findByName(name);

    if (permissionByName && permissionByName.id !== permission.id)
      throw new ApplicationError('This permission already exists');

    permission.name = name;
    permission.description = description;

    await repository.save(permission);

    return permission;
  }
}
