import { UserService } from '../../user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: [ './user-edit.component.css' ]
})
export class UserEditComponent implements OnInit {
  @Input() user: any;
  show = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (!this.userService.isAuthorized(this.user)) {
      this.show = false;
      window.alert('Not authorized');
    } else {
      this.show = true;
    }
  }

}
