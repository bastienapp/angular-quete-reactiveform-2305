// username-async-validator.ts
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type UserResponse = {
  username: string,
}

export function usernameAsyncValidator(httpClient: HttpClient): AsyncValidatorFn {

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username: string = control.value;

    return httpClient
      .get<UserResponse[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((userList: UserResponse[]) => {
          // vérifie si un utilisateur pour déjà ce nom
          // cependant, ça devrait être au backend de
          // faire cette action et de renvoyer un booléen
          if (userList.find((user) => user.username === username)) {
            return {
              usernameExists: true
            }
          } else {
            return null
          }
        })
      )
  }
}
