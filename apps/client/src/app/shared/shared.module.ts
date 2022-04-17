import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NgIconsModule } from '@ng-icons/core';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FeedComponent } from './components/feed/feed.component';
import { ModalComponent } from './components/modal/modal.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { HeroIconsImportList } from './models';
import { PostBoxComponent } from './components/post-box/post-box.component';
@NgModule({
  imports: [
    CommonModule,
    NgIconsModule.withIcons(HeroIconsImportList),
    ReactiveFormsModule,
    PickerModule,
  ],
  declarations: [
    SidebarComponent,
    FeedComponent,
    ModalComponent,
    WidgetsComponent,
    CreatePostComponent,
    PostBoxComponent,
  ],
  exports: [
    SidebarComponent,
    FeedComponent,
    ModalComponent,
    WidgetsComponent,
    CreatePostComponent,
  ],
})
export class SharedModule {}
