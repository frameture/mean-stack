import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AuthService } from "app/shared/auth.service";
import { BackEndService } from "app/shared/back-end.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthService,
    BackEndService,
  ]
})
export class SharedModule { }
