import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { userReducer, USER_FEATURE_KEY } from '../../store/user';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer),
  ],
  declarations: [HomeComponent],
})
export class MainModule {
  constructor() {}
}
