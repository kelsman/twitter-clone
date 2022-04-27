import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'apps/web-client/src/app/store';
import { modalSelectors } from 'apps/web-client/src/app/store/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-google-auth-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss'],
})
export class GoogleAuthComponent implements OnInit {
  isVisible: Observable<boolean>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isVisible = this.store.select(
      modalSelectors.isModalOpen('google-auth')
    );
  }
}
