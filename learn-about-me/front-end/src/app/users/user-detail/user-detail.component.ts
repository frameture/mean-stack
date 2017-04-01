import { BackEndService } from '../../shared/back-end.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit {

  user: any;

  constructor(
    private route: ActivatedRoute,
    private be: BackEndService
  ) { }

  ngOnInit() {
    this.setUser();
  }

  private setUser(): void {
    this.route.params
      .switchMap(params => this.be.getUser(params[ 'username' ]))
      .subscribe((user) => this.user = JSON.parse(user._body));
  }

}
