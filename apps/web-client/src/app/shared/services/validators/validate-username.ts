import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsernameValidator {
  constructor(private authService: AuthService) {}

  validate = (control: AbstractControl): ValidationErrors | null => {
    return this.authService
      .validateUsername(control.value)
      .pipe(
        map((res) => (res.status !== 200 ? { usernameExists: true } : null))
      );
  };
}
