import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { PermissionsRepository } from '../typeorm/repositories/PermissionsRepository';

interface IRequest {
  id: string;
}

export default class DeletePermissionService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository: PermissionsRepository = getCustomRepository(
      PermissionsRepository,
    );

    // busca a permission pelo id
    const permission = await repository.findById(id);

    if (!permission) throw new ApplicationError('Permission not found');

    await repository.remove(permission);
  }
}
