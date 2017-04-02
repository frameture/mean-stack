import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserDetailComponent } from "app/users/user-detail/user-detail.component";
import { UserListComponent } from "app/users/user-list/user-list.component";
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    UserDetailComponent,
    UserListComponent,
    UserEditComponent
  ]
})
export class UsersModule { }
