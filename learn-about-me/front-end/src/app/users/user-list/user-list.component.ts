import { Router } from '@angular/router';
import { BackEndService } from 'app/back-end.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [ './user-list.component.css' ]
})
export class UserListComponent implements OnInit {
  users: any;

  constructor(
    private be: BackEndService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  onGoto(username: string): void {
    this.router.navigate([ '/users/user/', username ]);
  }

  private getUsers(): void {
    this.be.getUsers()
      .subscribe(response => this.extractUsers(response), console.error);
  }

  private extractUsers(response): void {
    this.users = JSON.parse(response._body);
  }
}
