import { BackEndService } from '../../back-end.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: [ './user-edit.component.css' ]
})
export class UserEditComponent implements OnInit {

  @Input() user: any;
  form: FormGroup;

  constructor(
    private be: BackEndService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(): void {
    const controls = this.getControls();
    this.be.update(controls).subscribe(res => this.handleResponse(res));
  }

  onReset(): void {
    this.resetForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      bio: this.user.bio || '',
      displayName: this.user.displayName || ''
    });
  }

  private getControls(): any {
    return {
      username: this.user.username,
      bio: this.form.get('bio').value,
      displayName: this.form.get('displayName').value
    };
  }

  private handleResponse(res): void {
    const user = res.json();
    this.user = user;
    this.userService.setUser(user);
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset({
      bio: this.user.bio || '',
      displayName: this.user.displayName || ''
    });
  }
}
