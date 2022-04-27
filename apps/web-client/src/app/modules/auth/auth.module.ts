import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { GoogleAuthComponent } from './pages/google-auth/google-auth.component';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  declarations: [AuthComponent, GoogleAuthComponent],
  exports: [],
})
export class AuthModule {}
