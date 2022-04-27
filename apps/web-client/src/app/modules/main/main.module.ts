import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  imports: [CommonModule, MainRoutingModule, SharedModule],
  declarations: [HomeComponent],
})
export class MainModule {}
