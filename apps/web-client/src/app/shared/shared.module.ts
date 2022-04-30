import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NgIconsModule } from '@ng-icons/core';
import { BlueSpinnerComponent } from './components/blue-spinner/blue-spinner.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FeedComponent } from './components/feed/feed.component';
import { InputComponent } from './components/input/input.component';
import { ModalComponent } from './components/modal/modal.component';
import { PostBoxComponent } from './components/post-box/post-box.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { HeroIconsImportList } from './models';

@NgModule({
  imports: [
    CommonModule,
    NgIconsModule.withIcons(HeroIconsImportList),
    ReactiveFormsModule,
    PickerModule,
    HttpClientModule,
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
  ],
  exports: [
    SidebarComponent,
    FeedComponent,
    ModalComponent,
    WidgetsComponent,
    CreatePostComponent,
    BlueSpinnerComponent,
    InputComponent,
  ],
})
export class SharedModule {}
