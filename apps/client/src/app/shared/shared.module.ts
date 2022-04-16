import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import {
  HeroBell,
  HeroBookmark,
  HeroClipboardList,
  HeroDotsCircleHorizontal,
  HeroDotsHorizontal,
  HeroHashtag,
  HeroHome,
  HeroInbox,
  HeroUser,
} from '@ng-icons/heroicons/outline';
import { FeedComponent } from './components/feed/feed.component';
import { ModalComponent } from './components/modal/modal.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      HeroHashtag,
      HeroHome,
      HeroBell,
      HeroInbox,
      HeroBookmark,
      HeroClipboardList,
      HeroUser,
      HeroDotsCircleHorizontal,
      HeroDotsHorizontal,
    }),
  ],
  declarations: [SidebarComponent, FeedComponent, ModalComponent],
  exports: [SidebarComponent, FeedComponent, ModalComponent],
})
export class SharedModule {}
