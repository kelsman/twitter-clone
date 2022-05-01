import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthUser } from '@project/core';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../store';
import { userSelectors } from '../../../store/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  showProfileOptions = false;
  sidebarIconsList = [
    {
      name: 'hero-home',
      text: 'Home',
    },
    // {
    //   name: 'hero-hashtag',
    //   text: 'explore',
    // },
    {
      name: 'hero-bell',
      text: 'notifications',
    },
    {
      name: 'hero-inbox',
      text: 'Messages',
    },
    // {
    //   name: 'hero-bookmark',
    //   text: 'Bookmarks',
    // },
    {
      name: 'hero-user',
      text: 'Profile',
    },
    // {
    //   name: 'hero-clipboard-list',
    //   text: 'Lists',
    // },
    // {
    //   name: 'hero-dots-circle-horizontal',
    //   text: 'More',
    // },
    // {
    //   name: 'hero-dots-horizontal',
    //   text: 'More',
    // },
  ];

  currentUser: AuthUser;
  destroy$ = new Subject<void>();

  get profileImage() {
    return this.currentUser?.profilePicture
      ? this.currentUser.profilePicture
      : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
  }

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store
      .pipe(select(userSelectors.currentUser))
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => (this.currentUser = d));
  }

  toggleProfileOptions() {
    this.showProfileOptions = !this.showProfileOptions;
  }

  handleLogOut() {
    this.authService.logOut();
  }
}
