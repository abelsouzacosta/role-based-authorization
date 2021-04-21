import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { Roles } from '../typeorm/entities/Roles';
import { PermissionsRepository } from '../typeorm/repositories/PermissionsRepository';
import { RolesRepository } from '../typeorm/repositories/RolesRepository';
import { sameMembers } from '../utils/Arrays';

// interface do array permissions
interface IPermissions {
  id: string;
}

interface IRequest {
  role_id: string;
  permissions: IPermissions[];
}

export default class AddPermissionToRoleService {
  public async execute({ role_id, permissions }: IRequest): Promise<Roles> {
    const roleRepository: RolesRepository = getCustomRepository(
      RolesRepository,
    );

    const permissionRepository: PermissionsRepository = getCustomRepository(
      PermissionsRepository,
    );

    // verifica se o role realmente existe
    const role = await roleRepository.findById(role_id);

    if (!role) throw new ApplicationError('Role not found');

    // retorna todas as permissions existentes
    const existentPermissions = await permissionRepository.findAllByIds(
      permissions,
    );

    // verificação das permissions

    // verifica se nenhuma permission existe no banco de dados
    if (!existentPermissions.length)
      throw new ApplicationError('No permission are found with the given ids');

    // pegando somente o id das permissions existentes
    const existentPermissionsIds = existentPermissions.map(
      permission => permission.id,
    );

    // pega o id das permissions passdas por parâmetro
    const permissionsParameterIds = permissions.map(
      permission => permission.id,
    );

    // verifica se todas as permissions estão dentro
    // das permissions encontradas no banco de dados
    // caso não estejam retorna um erro
    if (!sameMembers(existentPermissionsIds, permissionsParameterIds))
      throw new ApplicationError('Some permission was not found');

    // se todas as permissions foram encontradas
    role.permissions = existentPermissions;

    // salvando as alterações
    await roleRepository.save(role);

    return role;
  }
}
