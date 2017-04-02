import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [ './login-form.component.css' ]
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  errorInfo: string;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onLogout(): void {
    this.userService.logout();
  }

  onReset(): void {
    this.errorInfo = '';
    this.loginForm.reset({
      username: '',
      login: ''
    });
  }

  onSubmit(): void {
    const controls = this.getControls();
    this.userService
      .login(controls)
      .subscribe(res => this.handleResponse(res), console.error);
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    });
  }

  private getControls(): any {
    return {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
    };
  }

  private handleResponse(res) {
    if (res.success) {
      this.errorInfo = '';
      this.userService.setUser(res.user);
      return;
    }
    this.errorInfo = res.message;
  }

}
