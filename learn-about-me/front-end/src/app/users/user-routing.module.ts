import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserDetailComponent } from "app/users/user-detail/user-detail.component";
import { UserListComponent } from "app/users/user-list/user-list.component";

const routes = [
  {
    path: '', children: [
      { path: 'user/:username', component: UserDetailComponent },
      { path: '', component: UserListComponent }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }
