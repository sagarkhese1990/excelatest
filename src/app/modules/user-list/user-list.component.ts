import { Component, OnInit } from '@angular/core';

import { UsersService } from './userService';
import { Users } from './user';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Users[] = [];
  user: any = {};

  isEdit: boolean = false;

  userDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    // fetching user data on initialize the component
    this.usersService.getUsers().then((data) => {
      this.users = data;
    });
  }

  addNewUser() {
    this.isEdit = false;
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }
  saveUser() {
    this.submitted = true;
    if (this.user.firstName.trim()) {
      if (this.user.id) {
        this.users[this.findById(this.user.id)] = this.user;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User is updated', life: 4000 });
      }
      else {
        this.user.id = this.createId();
        // adding element to the start
        this.users.unshift(this.user);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User is created', life: 4000 });
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
    }
  }
  findById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  createId(): string {
    let id = '';
    var charsString = 'qwertyuiopasdfghjksla';
    for (var i = 0; i < 5; i++) {
      id += charsString.charAt(Math.floor(Math.random() * charsString.length));
    }
    return id;
  }

  updateUser(user: any) {
    this.isEdit = true;
    this.user = { ...user };
    this.userDialog = true;
  }

  removeUser(user: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.firstName + ' ' + user.lastName + '?',
      header: 'Are you sure?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter(val => val.id !== user.id);
        this.user = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: user.firstName + ' ' + user.lastName + ' user is deleted successfully', life: 4000 });
      }
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }




}
