import { EntityRepository, Repository } from 'typeorm';
import { Roles } from '../entities/Roles';

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
}
