import { Injectable } from '@angular/core';
import { IUser, IUserResult } from '../models/user.model';
import { IGenericTable, IGenericTableRow } from '../models/generic-crud-table.model';
import data from '../../app/config/user.config.json'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IResponse } from '../models/api.model';

@Injectable()
export class UserService {

  users: IGenericTable;
  numberOfUsers: number = 0;

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
          values: [user.firstName, user.lastName, user.email, user.role, user.createdAt.substring(0, 19).replace('T', ' '), user.createdBy = "null"],
          id: user.id
        }
        users.push(rowUser);
      })
    });
    this.users.rows = users;
    return this.users;
  }

  getUsersTest(): Observable<IGenericTable> {
    const URL: string = "http://localhost:61150/api/Users";
    return this.http.get<IGenericTable>(URL);
  }

  getUserCount(): Observable<number> {
    const URL: string = "http://localhost:61150/api/Users/count";

    return this.http.get<number>(URL);
  }

  getUsersPagination(pageIndex: number, pageSize: number): Observable<{totalUsers: number, users: IGenericTable}> {
    const URL: string = "http://localhost:61150/api/Users/pagination?pageIndex=" + pageIndex.toString() + "&pageSize=" + pageSize.toString();
    const users: IGenericTable = this.users;
    const listUser: IGenericTableRow[] = [];
    
    return this.http.get<IUserResult>(URL).pipe(map((data: IUserResult) => {
      const totalUsers: number = data.totalUsers;
      data.usersPaged.forEach((user) => {
        const rowUser: IGenericTableRow = {
          values: [user.firstName, user.lastName, user.email, user.role, user.createdAt.substring(0, 19).replace('T', ' '), user.createdBy = "null"],
          id: user.id
        }
        listUser.push(rowUser);
      })
      users.rows = listUser;
      return {totalUsers, users};
    }));
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
