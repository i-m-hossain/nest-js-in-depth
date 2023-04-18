import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/Dto/CreateUserDto';
import { SerializedUser, User } from 'src/users/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }
  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
  createUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }
}
