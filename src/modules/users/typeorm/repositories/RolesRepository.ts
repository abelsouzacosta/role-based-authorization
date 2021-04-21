import { EntityRepository, In, Repository } from 'typeorm';
import { Roles } from '../entities/Roles';

interface IRole {
  id: string;
}

@EntityRepository(Roles)
export class RolesRepository extends Repository<Roles> {
  public async findByName(name: string): Promise<Roles | undefined> {
    const role = this.findOne({
      where: {
        name,
      },
    });

    return role;
  }

  public async findById(id: string): Promise<Roles | undefined> {
    const role = this.findOne({
      where: {
        id,
      },
    });

    return role;
  }

  public async findAllByIds(roles: IRole[]): Promise<Roles[]> {
    const rolesIds = roles.map(role => role.id);

    const existentRoles = this.find({
      where: {
        id: In(rolesIds),
      },
    });

    return existentRoles;
  }
}
