import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
     const user = await this.repository.findOne({where:{id:user_id}, relations:['games']});
     
     if(!user) {
       throw new Error("user not found")
     }

     return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`SELECT * from users order by first_name ASC`); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`SELECT * from users where LOWER(first_name) = $1 and LOWER(last_name) = $2 LIMIT 1`,[first_name.toLowerCase(), last_name.toLocaleLowerCase()]); // Complete usando raw query
  }
}
