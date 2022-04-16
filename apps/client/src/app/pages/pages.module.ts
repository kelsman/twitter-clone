import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
})
export class PagesModule {}