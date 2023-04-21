import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { IGenericTable, IGenericTableRow } from '../models/generic-crud-table.model';
import data from '../../app/config/user.config.json'
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IResponse } from '../models/api.model';

@Injectable()
export class UserService {

  users: IGenericTable;

  constructor(private http: HttpClient) {
    // Load data from the json file
    this.users = data;
  }

  getUsers(): IGenericTable {
    const URL: string = "assets/user/getUsers.json";
    const users: IGenericTableRow[] = [];

    this.http.get<IUser>(URL).subscribe((data: IUser) => {
      data.users.forEach((user) => {
        const rowUser: IGenericTableRow = {
          values: [user.firstname, user.lastname, user.email, user.role],
          id: user.id
        }
        users.push(rowUser);
      })
    });
    this.users.rows = users;
    return this.users;
  }
  
  createUser(newUser: IGenericTableRow): Observable<IResponse> {
    const URL: string = "assets/user/createUser.json";
    const body = JSON.stringify({ 
      firstname: newUser.values[0],
      lastname: newUser.values[1],
      email: newUser.values[2],
      role: newUser.values[3]
    });
    
    return this.http.get<IResponse>(URL);
  }

  updateUser(id: number, updatedUser: IGenericTableRow): Observable<IResponse> {
    const URL: string = "assets/user/updateUser.json";
    const body = JSON.stringify({ 
      firstname: updatedUser.values[0],
      lastname: updatedUser.values[1],
      email: updatedUser.values[2],
      role: updatedUser.values[3],
      id: id,
    });
  
    return this.http.get<IResponse>(URL);
  }

  deleteUser(id: number): Observable<IResponse> {
    const URL: string = "assets/user/deleteUser.json";
    const body = JSON.stringify({ 
      id: id,
    });

    return this.http.get<IResponse>(URL);
  }
}
