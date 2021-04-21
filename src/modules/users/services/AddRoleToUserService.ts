import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { RolesRepository } from '../typeorm/repositories/RolesRepository';
import { Users } from '../typeorm/entities/Users';
import { sameMembers } from '../utils/Arrays';

interface IRole {
  id: string;
}

interface IRequest {
  user_id: string;
  roles: IRole[];
}

export default class AddRoleToUserService {
  public async execute({ user_id, roles }: IRequest): Promise<Users> {
    const userRepository: UsersRepository = getCustomRepository(
      UsersRepository,
    );

    const rolesRepository: RolesRepository = getCustomRepository(
      RolesRepository,
    );

    // verifica se o usuário existe
    const user = await userRepository.findById(user_id);

    if (!user) throw new ApplicationError('User not found');

    // verifica se todas as roles passadas existem
    const existentRoles = await rolesRepository.findAllByIds(roles);

    if (!existentRoles.length)
      throw new ApplicationError('No roles were found');

    // captura os ids das existentRoles
    const existentRolesIds = existentRoles.map(role => role.id);

    // captura os ids das roles passadas por parâmetro
    const rolesParametersIds = roles.map(role => role.id);

    if (!sameMembers(existentRolesIds, rolesParametersIds))
      throw new ApplicationError('Some role was not found');

    // aplica as roles ao usuário
    user.roles = existentRoles;

    await userRepository.save(user);

    return user;
  }
}
