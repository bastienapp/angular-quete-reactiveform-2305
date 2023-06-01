import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../password-validator';
import { emailValidator } from '../email-validator';
import { HttpClient } from '@angular/common/http';
import { checkEqualityValidator } from '../check-equality-validator';
import { usernameAsyncValidator } from '../username-async-validator';

type Credentials = {
  email: string
  password: string
  conformPassword: string
}

type Address = {
  street: string,
  zipCode: string,
  city: string
}

type User = {
  username: any
  credentials: Credentials,
  address: Address
}

type UserResponse = {

  username: any,
  email: string,
  address: {
    street: string,
    city: string,
    zipcode: string,
  },
}

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  user?: User

  userForm = this.formBuilder.group({
    username: ['', {
      validators: [Validators.required, Validators.minLength(4)],
      asyncValidators: [usernameAsyncValidator(this.httpClient)]
    }],
    credentials: this.formBuilder.group(
      {
        email: ['', [Validators.required, emailValidator]],
        password: ['', [Validators.required, passwordValidator]],
        confirmPassword: ['', [Validators.required, passwordValidator]]
      },
      {
        validators: checkEqualityValidator(
          'password',
          'confirmPassword',
          'The password confirmation must match your password.'
        )
      }),
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      zipCode: ['']
    })
  });

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient
      .get<UserResponse>('https://jsonplaceholder.typicode.com/users/1')
      .subscribe((response) => {
        this.userForm.patchValue({
          username: response.username,
          credentials: {
            email: response.email
          },
          address: {
            street: response.address.street,
            city: response.address.city,
            zipCode: response.address.zipcode,
          }
        })
      })
  }

  onSubmit() {
    this.user = this.userForm.value as User
  }

  onChange(form: FormGroup) {
    // reset the form value to the newly emitted form group value.
    this.userForm = form;
  }
}
