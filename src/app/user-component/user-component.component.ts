import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

    username: [''],
    credentials: this.fb.group({
      email: [''],
      password: ['']
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
