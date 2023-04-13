import { Component, OnInit } from '@angular/core';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';
import { UserService } from 'src/_shared/services/user.service';
import { User } from 'src/_shared/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  addUserModal: boolean = false;
  editUserModal: boolean = false;
  removeUserModal: boolean = false;

  users: User[] = [];
  user!: User;
  userId: number = 0;

  searchBarText: string = "";
  filter!: {
    id: boolean,
    firstName: boolean,
    lastName: boolean,
    email: boolean,
    role: boolean
  };

  constructor(private toastService: GenericToastService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.addUserBaseTemplate();
    this.users = this.userService.getUsers();
    this.filter = {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true
    }
  }

  addUserBaseTemplate(): void {
    const user1: User = {
      firstName: "John",
      lastName: "Doe",
      email: "johnnoe@gmail.com",
      role: "admin",
      id: 0
    }
    const user2: User = {
      firstName: "Neymar",
      lastName: "Junior",
      email: "neymartheworstfootballer@gmail.com",
      role: "footballer",
      id: 1
    }
    const user3: User = {
      firstName: "Kylian",
      lastName: "Mbappe",
      email: "kikithebestfootballer@gmail.com",
      role: "footballer",
      id: 2
    }
    this.userService.addUser(user1);
    this.userService.addUser(user2);
    this.userService.addUser(user3);
  }

  filterSearchBar(users: User[]): User[] {
    let usersFiltered: User[];
    usersFiltered = users.filter(user => user.firstName.toLowerCase().includes(this.searchBarText.toLowerCase())
    || user.lastName.toLowerCase().includes(this.searchBarText.toLowerCase())
    || user.email.toLowerCase().includes(this.searchBarText.toLowerCase())
    || user.role.toLowerCase().includes(this.searchBarText.toLowerCase()));
    return (usersFiltered);
  }

  showAddUserModal() {
    this.addUserModal = true;
  }

  showEditUserModal(user: User) {
    this.editUserModal = true;
    this.user = user;
  }

  showRemoveUserModal(user: User) {
    this.removeUserModal = true;
    this.user = user;
  }

  hideAddUserModal() {
    this.users = this.userService.getUsers();
    this.addUserModal = false;
  }

  hideEditUserModal() {
    this.users = this.userService.getUsers();
    this.editUserModal = false;
  }

  hideRemoveUserModal() {
    this.users = this.userService.getUsers();
    this.removeUserModal = false;
  }
}
