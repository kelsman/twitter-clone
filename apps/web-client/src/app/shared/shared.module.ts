import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NgIconsModule } from '@ng-icons/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { userReducer, USER_FEATURE_KEY } from '../store/user';
import { userEffectService } from '../store/user/user.effects';
import { BlueSpinnerComponent } from './components/blue-spinner/blue-spinner.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FeedComponent } from './components/feed/feed.component';
import { InputComponent } from './components/input/input.component';
import { ModalComponent } from './components/modal/modal.component';
import { PostBoxComponent } from './components/post-box/post-box.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { HeroIconsImportList } from './models';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { AuthUserPipe } from './pipes/auth-user.pipe';
import { DateAgoPipe } from './pipes/date-ago.pipe';

@NgModule({
  imports: [
    CommonModule,
    NgIconsModule.withIcons(HeroIconsImportList),
    ReactiveFormsModule,
    PickerModule,
    HttpClientModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer),
    EffectsModule.forFeature([userEffectService]),
  ],
  declarations: [
    SidebarComponent,
    FeedComponent,
    ModalComponent,
    WidgetsComponent,
    CreatePostComponent,
    PostBoxComponent,
    BlueSpinnerComponent,
    InputComponent,
    SafeUrlPipe,
    UserAvatarComponent,
    AuthUserPipe,
    DateAgoPipe,
  ],
  exports: [
    SidebarComponent,
    FeedComponent,
    ModalComponent,
    WidgetsComponent,
    CreatePostComponent,
    BlueSpinnerComponent,
    InputComponent,
    SafeUrlPipe,
    UserAvatarComponent,
    AuthUserPipe,
    DateAgoPipe,
  ],
})
export class SharedModule {}
