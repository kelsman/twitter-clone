import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      (await import('./modules/main/main.module')).MainModule,
  },
  {
    path: '',
    loadChildren: async () =>
      (await import('./modules/auth/auth.module')).AuthModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
