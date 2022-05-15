import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { postReducer } from '../../store/post';
import { POST_FEATURE_KEY } from '../../store/post/';
import { userReducer, USER_FEATURE_KEY } from '../../store/user';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer),
    StoreModule.forFeature(POST_FEATURE_KEY, postReducer),
  ],
  declarations: [HomeComponent],
})
export class MainModule {
  constructor() {}
}
