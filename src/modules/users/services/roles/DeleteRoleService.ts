import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { RolesRepository } from '../../typeorm/repositories/RolesRepository';

interface IRequest {
  id: string;
}

export default class DeleteRoleService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository: RolesRepository = getCustomRepository(RolesRepository);

    const role = await repository.findById(id);

    if (!role) throw new ApplicationError('Role not found');

    await repository.remove(role);
  }
}
