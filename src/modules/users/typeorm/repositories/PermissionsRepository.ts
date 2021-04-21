import { EntityRepository, In, Repository } from 'typeorm';
import { Permissions } from '../entities/Permissions';

interface ISearch {
  id: string;
}

@EntityRepository(Permissions)
export class PermissionsRepository extends Repository<Permissions> {
  public async findByName(name: string): Promise<Permissions | undefined> {
    const permission = this.findOne({
      where: {
        name,
      },
    });

    return permission;
  }

  // método utilizado paraa verificar a existencia de permissions
  public async findAllByIds(permissions: ISearch[]): Promise<Permissions[]> {
    // captura todos os ids passados
    const permissionsIds = permissions.map(permission => permission.id);

    // verifica as permissions que existem dentro do banco de dados
    const existentPermissions = this.find({
      where: {
        id: In(permissionsIds),
      },
    });

    // retorna as permissions existentes
    return existentPermissions;
  }
}
