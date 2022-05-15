import { Pipe, PipeTransform } from '@angular/core';
import { AuthUser } from '@project/core';

@Pipe({
  name: 'authUser',
})
export class AuthUserPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): AuthUser {
    return value as AuthUser;
  }
}
