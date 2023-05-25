import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../password-validator';
import { emailValidator } from '../email-validator';

type Credentials = {
  email: string
  password: string
}

type Address = {
  street: string,
  zipCode: string,
  city: string
}

type User = {
  username: string
  credentials: Credentials,
  address: Address
}

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent {

  user?: User

  userForm = this.fb.group({

    username: ['', [Validators.required, Validators.minLength(4)]],
    credentials: this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, passwordValidator]]
    }),
    address: this.fb.group({
      street: [''],
      city: [''],
      zipCode: ['']
    })

  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    this.user = this.userForm.value as User
  }
}
