import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { StoreModule } from '@ngrx/store';
import { HeroIconsImportList } from '../../shared/models';
import { SharedModule } from '../../shared/shared.module';
import { postReducer } from '../../store/post';
import { POST_FEATURE_KEY } from '../../store/post/';
import { userReducer, USER_FEATURE_KEY } from '../../store/user';
import { LayoutComponent } from './layout/layout.component';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { PostStatusPageComponent } from './pages/post-status-page/post-status-page.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(HeroIconsImportList),
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer),
    StoreModule.forFeature(POST_FEATURE_KEY, postReducer),
  ],
  declarations: [HomeComponent, LayoutComponent, PostStatusPageComponent],
})
export class MainModule {
  constructor() {}
}
