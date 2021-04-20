import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/Users';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = this.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findByUsername(username: string): Promise<Users | undefined> {
    const user = this.findOne({
      where: {
        username,
      },
    });

    return user;
  }
}
