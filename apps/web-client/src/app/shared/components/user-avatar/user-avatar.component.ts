import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthUser } from '@project/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../../store';
import { userSelectors } from '../../../store/user';

@Component({
  selector: 'project-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit {
  @Input() size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  currentUser: AuthUser;
  destroy$ = new Subject<void>();

  get profileImage() {
    return this.currentUser?.profilePicture
      ? this.currentUser.profilePicture
      : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
  }

  constructor(private store: Store<AppState>) {}
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
}
