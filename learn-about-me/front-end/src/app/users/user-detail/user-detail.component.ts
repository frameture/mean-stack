import { UserService } from '../../user.service';
import { BackEndService } from 'app/back-end.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit {

  user: any;
  show: boolean;

  constructor(
    private route: ActivatedRoute,
    private be: BackEndService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.setUser();
  }

  onEdit(user): void {
    if (!this.userService.isAuthorized(this.user)) {
      this.show = false;
      window.alert('Not authorized');
    } else {
      this.show = true;
    }
  }

  private setUser(): void {
    this.route.params
      .switchMap(params => this.be.getUser(params[ 'username' ]))
      .subscribe((res) => {
        this.user = JSON.parse(res._body);
        console.log(this.user);
      });
  }

}
