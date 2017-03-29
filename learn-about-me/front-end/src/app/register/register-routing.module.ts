import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterFormComponent } from './register-form/register-form.component';

const routes = [
  {
    path: '', children: [
      { path: 'form', component: RegisterFormComponent },
      { path: '', redirectTo: '/register/form', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RegisterRoutingModule { }
