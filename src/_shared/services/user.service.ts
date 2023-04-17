import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { IGenericTable, IGenericTableRow } from '../models/generic-crud-table.model';
import data from '../../app/config/user.config.json'

@Injectable()
export class UserService {

  users: IGenericTable;

  constructor() {
    // Load data from the json file
    this.users = data;
  }

  getUsers(): IGenericTable {
    return this.users;
  }

  getUser(id: number): IGenericTableRow {
    return this.users.rows.find(user => user.id === id)!;
  }
  
  createUser(newUser: IGenericTableRow): boolean {
    if (this.users.rows.find(user => user.values[2] === newUser.values[2])) {
      return false;
    }
    const newId = this.users.rows.length + 1;
    this.users.rows.push({ ...newUser, id: newId });
    return true;
  }

  updateUser(id: number, updatedUser: IGenericTableRow): boolean {
    const userIndex = this.users.rows.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.users.rows[userIndex] = {
      ...this.users.rows[userIndex],
      ...updatedUser
    };
    return true;
  }

  deleteUser(id: number): boolean {
    const userIndex = this.users.rows.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.users.rows.splice(userIndex, 1);
    return true;
  }
}
