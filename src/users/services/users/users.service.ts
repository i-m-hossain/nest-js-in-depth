import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: User[] = [{ username: 'imran', password: 'imran' }];

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }
  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
