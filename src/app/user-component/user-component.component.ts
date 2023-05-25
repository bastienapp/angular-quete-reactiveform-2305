import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

type Address = {
  street: string,
  postalCode: string,
  city: string
}

type User = {
  username: string
  email: string
  password: string
  address: Address
}

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent {

  user?: User

  username = new FormControl('')
  email = new FormControl('')
  password = new FormControl('')
  street = new FormControl('')
  postalCode = new FormControl('')
  city = new FormControl('')

  register() {
    this.user = {
      username: this.username.value as string,
      email: this.email.value as string,
      password: this.password.value as string,
      address: {
        street: this.street.value as string,
        postalCode: this.postalCode.value as string,
        city: this.city.value as string,
      },
    }
    console.log(this.user)
  }
}
