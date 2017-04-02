import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackEndService } from 'app/back-end.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: [ './register-form.component.css' ]
})
export class RegisterFormComponent implements OnInit {

  body: string;
  error: string;
  processing: boolean;
  response: string;
  registerForm: FormGroup;

  constructor(
    private be: BackEndService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onReset() {
    this.registerForm.reset({
      username: '',
      password: ''
    });
    this.error = '';
  }

  onSubmit() {
    this.processing = true;
    setTimeout(() => {
      this.be.register(this.getControls()).subscribe(
        res => this.handleResponse(res),
        err => this.handleError(err));
    }, 500);
  }

  private createForm(): void {
    this.registerForm = this.fb.group({
      username: '',
      password: ''
    });
  }

  private getControls(): any {
    return {
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value
    };
  }

  private handleError(error: any): void {
    if (error.status === 409) {
      this.error = 'Username taken - retry.';
    } else {
      console.error('ERROR', error);
    }
    this.processing = false;
  }

  private handleResponse(response: any): void {
    this.error = '';
    this.processing = false;
    this.router.navigate([ '/users' ]);
  }

}
