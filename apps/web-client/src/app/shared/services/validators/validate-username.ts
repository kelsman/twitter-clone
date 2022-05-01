import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsernameValidator {
  constructor(private authService: AuthService) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> =>
      this.authService
        .validateUsername(control.value)
        .pipe(
          map((res) => (res.status !== 200 ? { usernameExists: true } : null))
        );
  }
}
