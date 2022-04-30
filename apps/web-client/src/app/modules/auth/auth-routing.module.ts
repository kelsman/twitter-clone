import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_PATHS } from '../../config';
import { AuthComponent } from './auth.component';
import { GoogleAuthComponent } from './pages/google-auth/google-auth.component';

const routes: Routes = [
  {
    path: ROUTES_PATHS.Login_Page,
    component: AuthComponent,
    children: [
      {
        path: ROUTES_PATHS.Google_Login_Page,
        component: GoogleAuthComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
