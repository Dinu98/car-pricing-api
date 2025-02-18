import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  create(email: string, password: string) {
    //We use create method because we might have some validation logic on the entity
    //So we would want to make sure that we validate the entity before saving it
    const user = this.usersRepository.create({ email, password });

    return this.usersRepository.save(user);
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  find(email: string) {
    return this.usersRepository.find({ where: { email } });
  }

  //Partial is built in typescript and let's you specify
  //An object with at least one or none of the User entity attributes
  async updateOne(id: number, attributes: Partial<User>) {
    //In order to use hooks, we'll take the findOne -> make the update -> save approach
    //This is not efficient because it requires to trips to the DB

    const user = await this.findOne(id);

    if (!user) {
      //Not good to throw exceptions here because the controller the called this
      //Might not implement http protocol, and other protocols don't know about not found exception
      //Solution would be to implement an exception filter or to throw this exceptions inside the controller
      throw new NotFoundException(`User with id ${id} not found`);
    }

    Object.assign(user, attributes);

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    //In order to use hooks, we'll take the findOne -> remove approach
    //This is not efficient because it requires to trips to the DB
    const user = await this.findOne(id);

    if (!user) {
      //Not good to throw exceptions here because the controller the called this
      //Might not implement http protocol, and other protocols don't know about not found exception
      //Solution would be to implement an exception filter or to throw this exceptions inside the controller
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.usersRepository.remove(user);
  }
}
