import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { PermissionsRepository } from '../../typeorm/repositories/PermissionsRepository';
import { Permissions } from '../../typeorm/entities/Permissions';

interface IRequest {
  name: string;
  description: string;
}

export default class CreatePermissionService {
  public async execute({ name, description }: IRequest): Promise<Permissions> {
    const repository: PermissionsRepository = getCustomRepository(
      PermissionsRepository,
    );

    // verifica se já existe uma permission
    const permissionAlreadyExists = await repository.findByName(name);

    if (permissionAlreadyExists)
      throw new ApplicationError('Permission already exists');

    // cria a permission
    const permission = repository.create({
      name,
      description,
    });

    // salva a permission
    await repository.save(permission);

    return permission;
  }
}
