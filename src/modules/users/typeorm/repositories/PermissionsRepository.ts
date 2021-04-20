import { EntityRepository, Repository } from 'typeorm';
import { Permissions } from '../entities/Permissions';

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
}
