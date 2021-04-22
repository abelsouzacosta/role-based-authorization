import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { PermissionsRepository } from '../../typeorm/repositories/PermissionsRepository';
import { Permissions } from '../../typeorm/entities/Permissions';

export default class ListPermissionService {
  public async execute(): Promise<Permissions[]> {
    const repository: PermissionsRepository = getCustomRepository(
      PermissionsRepository,
    );

    const permissions = repository.find();

    if (!permissions) throw new ApplicationError('No permission were found');

    return permissions;
  }
}
