import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'apps/web-client/src/environments/environment';

@Component({
  selector: 'twitter-clone-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AuthComponent implements OnInit {
  googleAuthUrl = environment.AUTH_API_URI + '/auth/google';
  constructor() {}

  ngOnInit(): void {}
}
