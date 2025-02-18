import { Injectable } from '@nestjs/common';
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
}
