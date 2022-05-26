import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_PATHS } from '../../config';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { PostStatusPageComponent } from './pages/post-status-page/post-status-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: ROUTES_PATHS.Home_Page,
        pathMatch: 'full',
      },
      {
        path: ROUTES_PATHS.Home_Page,
        component: HomeComponent,
        pathMatch: 'full',
      },
      {
        path: ':username/status/:id',
        component: PostStatusPageComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
