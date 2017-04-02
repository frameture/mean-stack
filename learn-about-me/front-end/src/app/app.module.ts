import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersModule } from './users/users.module';
import { RegisterModule } from './register/register.module';
import { SharedModule } from './shared/shared.module';
import { BackEndService } from './back-end.service';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  providers: [
    UserService,
    BackEndService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
