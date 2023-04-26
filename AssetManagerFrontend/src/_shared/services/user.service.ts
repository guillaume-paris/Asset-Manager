import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { IGenericTable, IGenericTableRow } from '../models/generic-crud-table.model';
import data from '../../app/config/user.config.json'
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const URL: string = "http://localhost:61150/api/Users";
    const users: IGenericTableRow[] = [];

    this.http.get<Array<IUser>>(URL).subscribe((data: Array<IUser>) => {
      data.forEach((user) => {
        const rowUser: IGenericTableRow = {
          values: [user.firstName, user.lastName, user.email, user.role],
          id: user.id
        }
        users.push(rowUser);
      })
    });
    this.users.rows = users;
    return this.users;
  }
  
  createUser(newUser: IGenericTableRow): Observable<IResponse> {
    const URL: string = "http://localhost:61150/api/Users";
    const body = JSON.stringify({
      id: 0,
      firstName: newUser.values[0],
      lastName: newUser.values[1],
      email: newUser.values[2],
      role: newUser.values[3]
    });
    
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IResponse>(URL, body, { headers: headers });
  }

  updateUser(id: number, updatedUser: IGenericTableRow): Observable<IResponse> {
    const URL: string = "http://localhost:61150/api/Users/" + id.toString();
    const body = JSON.stringify({ 
      firstName: updatedUser.values[0],
      lastName: updatedUser.values[1],
      email: updatedUser.values[2],
      role: updatedUser.values[3],
      id: id,
    });
  
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IResponse>(URL, body, { headers: headers });
  }

  deleteUser(id: number): Observable<IResponse> {
    const URL: string = "http://localhost:61150/api/Users/" + id.toString();

    return this.http.delete<IResponse>(URL);
  }
}
