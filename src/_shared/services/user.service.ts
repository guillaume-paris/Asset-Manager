import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  users: User[] = [];

  constructor() {}

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    return this.users.find(user => user.id === id)!;
  }
  
  addUser(newUser: User): boolean {
    if (this.users.find(user => user.email === newUser.email)) {
      return false;
    }
    const newId = this.users.length + 1;
    this.users.push({ ...newUser, id: newId });
    return true;
  }

  editUserDataById(id: number, updatedUser: User): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    return true;
  }

  removeUserDataById(id: number): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.users.splice(userIndex, 1);
    for (let i = userIndex; i < this.users.length; i++) {
      this.users[i].id = i + 1;
    }
    return true;
  }
}
