import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { userReducer, USER_FEATURE_KEY } from '../../store/user';
import { userEffectService } from '../../store/user/user.effects';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { GoogleAuthComponent } from './pages/google-auth/google-auth.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer),
    EffectsModule.forFeature([userEffectService]),
    ReactiveFormsModule,
  ],
  declarations: [AuthComponent, GoogleAuthComponent],
  exports: [],
})
export class AuthModule {}
